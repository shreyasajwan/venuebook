-- ============================================
-- VenueBook Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- VENUES
create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text not null,
  price numeric not null default 0,
  guest_capacity integer not null default 0,
  description text,
  image_url text,
  amenities text[] default '{}',
  created_at timestamptz not null default now()
);

-- BOOKINGS
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  email text not null,
  phone text not null,
  wedding_date date not null,
  venue_id uuid references public.venues(id) on delete set null,
  venue_name text,
  event_type text not null,
  guest_count text not null,
  budget text not null,
  message text,
  status text not null default 'Pending' check (status in ('Pending','Confirmed','Cancelled')),
  created_at timestamptz not null default now()
);

-- GALLERY IMAGES
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  storage_path text not null,
  category text not null,
  created_at timestamptz not null default now()
);

-- ============================================
-- Row Level Security
-- ============================================
alter table public.venues enable row level security;
alter table public.bookings enable row level security;
alter table public.gallery_images enable row level security;

-- Public can read venues and gallery images
create policy "Public read venues" on public.venues
  for select using (true);

create policy "Public read gallery" on public.gallery_images
  for select using (true);

-- Anyone (anon) can insert a booking
create policy "Public insert bookings" on public.bookings
  for insert with check (true);

-- Only authenticated admins can read all bookings
create policy "Admins read bookings" on public.bookings
  for select using (auth.role() = 'authenticated');

-- Only authenticated admins can update booking status
create policy "Admins update bookings" on public.bookings
  for update using (auth.role() = 'authenticated');

-- Only authenticated admins can delete bookings
create policy "Admins delete bookings" on public.bookings
  for delete using (auth.role() = 'authenticated');

-- Only authenticated admins can manage gallery
create policy "Admins insert gallery" on public.gallery_images
  for insert with check (auth.role() = 'authenticated');

create policy "Admins update gallery" on public.gallery_images
  for update using (auth.role() = 'authenticated');

create policy "Admins delete gallery" on public.gallery_images
  for delete using (auth.role() = 'authenticated');

-- Only authenticated admins can manage venues
create policy "Admins insert venues" on public.venues
  for insert with check (auth.role() = 'authenticated');

create policy "Admins update venues" on public.venues
  for update using (auth.role() = 'authenticated');

create policy "Admins delete venues" on public.venues
  for delete using (auth.role() = 'authenticated');

-- ============================================
-- Storage bucket (run via dashboard or SQL)
-- ============================================
-- Create bucket 'venue-gallery' in Supabase Storage (public).
-- Storage policies: public read; authenticated insert/delete.
