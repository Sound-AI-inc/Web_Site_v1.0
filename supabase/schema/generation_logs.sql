create table if not exists public.generation_logs (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  model_id text not null,
  component text not null check (component in ('SoundCraft', 'MidiCraft', 'VSTCraft', 'Infrastructure')),
  tier text not null check (tier in ('lite', 'pro')),
  latency_ms integer not null check (latency_ms >= 0),
  token_usage jsonb,
  error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.generation_logs enable row level security;

create index if not exists generation_logs_user_created_at_idx
  on public.generation_logs (user_id, created_at desc);

create index if not exists generation_logs_model_created_at_idx
  on public.generation_logs (model_id, created_at desc);

create policy "Users can read their own generation logs"
  on public.generation_logs
  for select
  to authenticated
  using (auth.uid()::text = user_id);

-- Inserts are intended to happen from server-side API routes with the service role key.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY to browser code or NEXT_PUBLIC_/VITE_ env vars.
