-- Supabase SQL Editor'da sırayla çalıştırın. Storage bucket'ı Dashboard > Storage'dan da oluşturabilirsiniz.

-- 1) Portföy tablosu
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null default 0,
  image_url text not null,
  title_tr text not null default '',
  title_en text not null default '',
  category_tr text not null default '',
  category_en text not null default '',
  year text not null default '',
  created_at timestamptz default now()
);

alter table public.portfolio_items enable row level security;

create policy "portfolio_select_public" on public.portfolio_items
  for select using (true);

create policy "portfolio_insert_auth" on public.portfolio_items
  for insert with check (auth.role() = 'authenticated');

create policy "portfolio_update_auth" on public.portfolio_items
  for update using (auth.role() = 'authenticated');

create policy "portfolio_delete_auth" on public.portfolio_items
  for delete using (auth.role() = 'authenticated');

-- 2) Hero metinleri (tek satır, id = 1)
create table if not exists public.hero_settings (
  id smallint primary key default 1 check (id = 1),
  name_tr text,
  name_en text,
  role_tr text,
  role_en text,
  locations_tr text,
  locations_en text,
  updated_at timestamptz default now()
);

insert into public.hero_settings (id) values (1)
  on conflict (id) do nothing;

alter table public.hero_settings enable row level security;

create policy "hero_select_public" on public.hero_settings
  for select using (true);

create policy "hero_update_auth" on public.hero_settings
  for update using (auth.role() = 'authenticated');

create policy "hero_insert_auth" on public.hero_settings
  for insert with check (auth.role() = 'authenticated');

-- 3) Storage: Dashboard > Storage > New bucket > id: portfolio, Public bucket: ON
-- Aşağıdaki politikalar bucket oluşturulduktan sonra çalışır:

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "portfolio_images_public_read" on storage.objects
  for select using (bucket_id = 'portfolio');

create policy "portfolio_images_auth_insert" on storage.objects
  for insert with check (bucket_id = 'portfolio' and auth.role() = 'authenticated');

create policy "portfolio_images_auth_update" on storage.objects
  for update using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

create policy "portfolio_images_auth_delete" on storage.objects
  for delete using (bucket_id = 'portfolio' and auth.role() = 'authenticated');

-- 4) Authentication > Users: admin kullanıcı oluşturun (e-posta + şifre)
