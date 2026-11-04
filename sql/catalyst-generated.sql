-- ============================================================
-- Catalyst: sentences Claude made from the learner's KG Chart words (Edge Function catalyst-sentence).
-- Run once in the Supabase SQL editor, after catalyst-schema.sql. Safe to re-run.
-- Only the Edge Function inserts (service role). A learner reads their own rows and can flag (or delete) them.
-- Daily limit: optional row in kg_chart_settings, key 'catalyst_daily_limit' (default 30).
-- ============================================================

create table if not exists public.catalyst_generated (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  concept_id text not null references public.catalyst_concepts(id) on delete cascade,
  sentences jsonb not null,            -- { en, ja: { t, r, h[], words[] }, my: { t, h[], words[] }, zh: { t, r, h[], words[] }, mr: { t, h[] } }
  model text,
  flagged boolean not null default false,  -- learner marked it wrong: hidden, kept for review
  created_at timestamptz not null default now()
);
create index if not exists catalyst_generated_user_concept on public.catalyst_generated(user_id, concept_id, created_at desc);

alter table public.catalyst_generated enable row level security;

drop policy if exists catalyst_generated_read on public.catalyst_generated;
create policy catalyst_generated_read on public.catalyst_generated for select to authenticated
  using (user_id = auth.uid());
drop policy if exists catalyst_generated_flag on public.catalyst_generated;
create policy catalyst_generated_flag on public.catalyst_generated for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists catalyst_generated_delete on public.catalyst_generated;
create policy catalyst_generated_delete on public.catalyst_generated for delete to authenticated
  using (user_id = auth.uid());

-- The learner may change only the flag, not the sentences
revoke update on public.catalyst_generated from authenticated, anon;
grant update (flagged) on public.catalyst_generated to authenticated;
