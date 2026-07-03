-- Early Access waitlist (Marketing v2)
-- Run in Supabase SQL Editor. "Success. No rows returned" is expected for DDL.

create table if not exists public.early_access (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text not null,
  last_name text not null,
  country text,
  profession text,
  music_experience text,
  discovery_source text,
  interested_plan text not null default 'free',
  role_type text,
  consent boolean not null default false,
  newsletter boolean not null default false,
  status text not null default 'pending',
  user_id uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists early_access_email_idx on public.early_access (email);
create index if not exists early_access_status_idx on public.early_access (status);

alter table public.early_access enable row level security;

drop policy if exists "Anyone can insert early access" on public.early_access;
drop policy if exists "Users read own early access" on public.early_access;

create policy "Anyone can insert early access"
  on public.early_access for insert
  to anon, authenticated
  with check (true);

create policy "Users read own early access"
  on public.early_access for select
  to authenticated
  using (auth.uid() = user_id or email = auth.jwt() ->> 'email');

grant usage on schema public to anon, authenticated;
grant insert on public.early_access to anon, authenticated;
grant select on public.early_access to authenticated;
