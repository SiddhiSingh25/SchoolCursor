-- Run after creating a public Storage bucket named "gallery"
-- Supabase Dashboard → Storage → New bucket → name: gallery → Public: ON

-- Public can view gallery images
drop policy if exists "Public read gallery storage" on storage.objects;
create policy "Public read gallery storage"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

-- Authenticated admins can upload
drop policy if exists "Authenticated upload gallery storage" on storage.objects;
create policy "Authenticated upload gallery storage"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

-- Authenticated admins can update
drop policy if exists "Authenticated update gallery storage" on storage.objects;
create policy "Authenticated update gallery storage"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery')
  with check (bucket_id = 'gallery');

-- Authenticated admins can delete
drop policy if exists "Authenticated delete gallery storage" on storage.objects;
create policy "Authenticated delete gallery storage"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');
