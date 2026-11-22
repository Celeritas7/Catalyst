-- Synthetic source contract only. Never run this fixture on a hosted project.
create role anon;
create role authenticated;
create role service_role bypassrls;
create schema auth;
create function auth.uid() returns uuid language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid
$$;
grant usage on schema public,auth to anon,authenticated,service_role;
grant execute on function auth.uid() to anon,authenticated,service_role;
create function public.kg_chart_is_allowed() returns boolean language sql stable as $$ select auth.uid() is not null $$;
grant execute on function public.kg_chart_is_allowed() to authenticated;
create table public.kg_chart_settings(key text primary key,value jsonb not null);
create table public.kg_chart_topic_completions(user_id uuid,language_code text,topic_id text);
create table public.kg_chart_vocabulary(id uuid primary key,topic_id text,english_text text);
create table public.kg_chart_vocabulary_translations(vocabulary_id uuid references public.kg_chart_vocabulary(id),language_code text,native_text text);
create table public.kg_chart_quiz_sessions(id uuid primary key,user_id uuid,language_code text);
create table public.kg_chart_quiz_answers(id uuid primary key,session_id uuid references public.kg_chart_quiz_sessions(id),vocabulary_id uuid,is_correct boolean);
alter table public.kg_chart_settings enable row level security;
alter table public.kg_chart_topic_completions enable row level security;
alter table public.kg_chart_vocabulary enable row level security;
alter table public.kg_chart_vocabulary_translations enable row level security;
alter table public.kg_chart_quiz_sessions enable row level security;
alter table public.kg_chart_quiz_answers enable row level security;
grant select on public.kg_chart_settings to service_role;
grant select on public.kg_chart_topic_completions,public.kg_chart_vocabulary,
  public.kg_chart_vocabulary_translations,public.kg_chart_quiz_sessions,public.kg_chart_quiz_answers to authenticated;
