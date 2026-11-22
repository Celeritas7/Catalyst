-- Phase 5D. Review/test before applying. Requires catalyst-schema.sql and
-- catalyst-generated.sql. No legacy sentence bodies or learner notebooks change.
begin;

alter table public.catalyst_generated add column if not exists target_language text;
alter table public.catalyst_generated add column if not exists meaning_language text;
do $$ begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.catalyst_generated'::regclass and conname = 'catalyst_generated_target_language_check') then
    alter table public.catalyst_generated add constraint catalyst_generated_target_language_check
      check (target_language is null or target_language in ('ja','my','zh','mr'));
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.catalyst_generated'::regclass and conname = 'catalyst_generated_meaning_language_check') then
    alter table public.catalyst_generated add constraint catalyst_generated_meaning_language_check
      check (meaning_language is null or meaning_language in ('en','mr'));
  end if;
end $$;

-- Explicit privileges, independent of project default grants. Existing own-user
-- SELECT/UPDATE/DELETE policies remain. No client can insert or rewrite sentences.
revoke all on public.catalyst_generated from public, anon, authenticated;
-- Table-level REVOKE does not remove pre-existing column grants.
revoke select (id,user_id,concept_id,sentences,model,flagged,created_at,target_language,meaning_language),
  insert (id,user_id,concept_id,sentences,model,flagged,created_at,target_language,meaning_language),
  update (id,user_id,concept_id,sentences,model,flagged,created_at,target_language,meaning_language),
  references (id,user_id,concept_id,sentences,model,flagged,created_at,target_language,meaning_language)
  on public.catalyst_generated from public, anon, authenticated;
grant select, delete on public.catalyst_generated to authenticated;
grant update (flagged) on public.catalyst_generated to authenticated;
grant all on public.catalyst_generated to service_role;
create index if not exists catalyst_generated_user_day on public.catalyst_generated(user_id, created_at);

create table if not exists public.catalyst_generation_daily (
  user_id uuid not null,
  usage_day date not null,
  attempts integer not null default 0 check (attempts >= 0),
  primary key (user_id, usage_day)
);
alter table public.catalyst_generation_daily enable row level security;
revoke all on public.catalyst_generation_daily from public, anon, authenticated;
grant all on public.catalyst_generation_daily to service_role;

-- Only the Edge Function's service role can reserve. The caller's verified user
-- ID is supplied by the handler, never taken from the browser request body.
-- No SECURITY DEFINER or client-controlled limit/date. Failed paid attempts still
-- count; deleting/flagging a generated sentence cannot recover a reserved slot.
create or replace function public.catalyst_reserve_generation(p_user_id uuid)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  v_day date := (statement_timestamp() at time zone 'UTC')::date;
  v_limit integer := 30;
  v_setting text;
  v_used integer;
begin
  if p_user_id is null then raise exception 'user required'; end if;
  select trim(both '"' from value::text) into v_setting
    from public.kg_chart_settings where key = 'catalyst_daily_limit';
  if v_setting is not null then
    if v_setting !~ '^[0-9]{1,4}$' then raise exception 'invalid generation limit'; end if;
    v_limit := v_setting::integer;
    if v_limit > 1000 then raise exception 'generation limit exceeds supported maximum'; end if;
  end if;

  -- Seed today's usage from old saved rows once. ON CONFLICT serializes first
  -- reservations; the conditional UPDATE atomically enforces the limit thereafter.
  insert into public.catalyst_generation_daily(user_id, usage_day, attempts)
    select p_user_id, v_day, count(*)::integer from public.catalyst_generated
      where user_id = p_user_id and created_at >= (v_day::timestamp at time zone 'UTC')
        and created_at < ((v_day + 1)::timestamp at time zone 'UTC')
    on conflict (user_id, usage_day) do nothing;
  update public.catalyst_generation_daily set attempts = attempts + 1
    where user_id = p_user_id and usage_day = v_day and attempts < v_limit
    returning attempts into v_used;
  if found then
    return jsonb_build_object('allowed', true, 'used', v_used, 'limit', v_limit);
  end if;
  select attempts into v_used from public.catalyst_generation_daily
    where user_id = p_user_id and usage_day = v_day;
  return jsonb_build_object('allowed', false, 'used', v_used, 'limit', v_limit);
end $$;
revoke all on function public.catalyst_reserve_generation(uuid) from public, anon, authenticated;
grant execute on function public.catalyst_reserve_generation(uuid) to service_role;
commit;
