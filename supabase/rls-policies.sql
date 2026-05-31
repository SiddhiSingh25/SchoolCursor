-- Run this in Supabase SQL Editor if you already created tables
-- and get "violates row-level security policy" errors in the admin panel.

-- ==========================================
-- Row Level Security (RLS)
-- ==========================================

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
