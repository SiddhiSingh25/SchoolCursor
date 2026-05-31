-- School Website Template (Admin) - Supabase schema
-- Run this in Supabase SQL Editor.

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ==========================================
-- Notices
-- ==========================================
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  publish_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists notices_publish_date_idx on public.notices (publish_date desc);
create index if not exists notices_created_at_idx on public.notices (created_at desc);

-- ==========================================
-- Events
-- ==========================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date,
  location text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_event_date_idx on public.events (event_date asc);
create index if not exists events_created_at_idx on public.events (created_at desc);

-- ==========================================
-- Gallery (metadata for images stored in Storage)
-- ==========================================
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  category text,
  image_path text not null,
  public_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_created_at_idx on public.gallery (created_at desc);
create index if not exists gallery_category_idx on public.gallery (category);

-- ==========================================
-- Inquiries
-- ==========================================
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  parent_name text,
  phone text,
  email text,
  class text,
  message text,
  contacted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
create index if not exists inquiries_contacted_idx on public.inquiries (contacted);

-- ==========================================
-- updated_at trigger helper
-- ==========================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at_notices on public.notices;
create trigger set_updated_at_notices
before update on public.notices
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_events on public.events;
create trigger set_updated_at_events
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_gallery on public.gallery;
create trigger set_updated_at_gallery
before update on public.gallery
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_inquiries on public.inquiries;
create trigger set_updated_at_inquiries
before update on public.inquiries
for each row execute function public.set_updated_at();

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================
-- Public site: anyone can READ notices, events, gallery.
-- Admin panel: authenticated users can INSERT/UPDATE/DELETE.
-- Inquiries: anyone can SUBMIT; only authenticated users can manage.

alter table public.notices enable row level security;
alter table public.events enable row level security;
alter table public.gallery enable row level security;
alter table public.inquiries enable row level security;

-- Notices
drop policy if exists "Public read notices" on public.notices;
create policy "Public read notices"
  on public.notices for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated manage notices" on public.notices;
create policy "Authenticated manage notices"
  on public.notices for all
  to authenticated
  using (true)
  with check (true);

-- Events
drop policy if exists "Public read events" on public.events;
create policy "Public read events"
  on public.events for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated manage events" on public.events;
create policy "Authenticated manage events"
  on public.events for all
  to authenticated
  using (true)
  with check (true);

-- Gallery
drop policy if exists "Public read gallery" on public.gallery;
create policy "Public read gallery"
  on public.gallery for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated manage gallery" on public.gallery;
create policy "Authenticated manage gallery"
  on public.gallery for all
  to authenticated
  using (true)
  with check (true);

-- Inquiries
drop policy if exists "Public submit inquiries" on public.inquiries;
create policy "Public submit inquiries"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated read inquiries" on public.inquiries;
create policy "Authenticated read inquiries"
  on public.inquiries for select
  to authenticated
  using (true);

drop policy if exists "Authenticated update inquiries" on public.inquiries;
create policy "Authenticated update inquiries"
  on public.inquiries for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete inquiries" on public.inquiries;
create policy "Authenticated delete inquiries"
  on public.inquiries for delete
  to authenticated
  using (true);

-- ==========================================
-- Storage bucket (manual setup)
-- ==========================================
-- 1. In Supabase Dashboard → Storage → New bucket → name: gallery → Public bucket: ON
-- 2. Run the policies in supabase/storage-policies.sql

