-- Read-only catalog inspection. Does not read learner rows, alter schema, reserve
-- quota, or call the model. PASS is a prerequisite, not a full acceptance test.
with required_columns(table_name,column_name,types) as (values
  ('kg_chart_topic_completions','user_id',array['uuid']),
  ('kg_chart_topic_completions','language_code',array['text','varchar']),
  ('kg_chart_topic_completions','topic_id',array['text','varchar']),
  ('kg_chart_vocabulary','id',array['uuid']),
  ('kg_chart_vocabulary','topic_id',array['text','varchar']),
  ('kg_chart_vocabulary','english_text',array['text','varchar']),
  ('kg_chart_vocabulary_translations','vocabulary_id',array['uuid']),
  ('kg_chart_vocabulary_translations','language_code',array['text','varchar']),
  ('kg_chart_vocabulary_translations','native_text',array['text','varchar']),
  ('kg_chart_quiz_sessions','id',array['uuid']),
  ('kg_chart_quiz_sessions','user_id',array['uuid']),
  ('kg_chart_quiz_sessions','language_code',array['text','varchar']),
  ('kg_chart_quiz_answers','id',array['uuid']),
  ('kg_chart_quiz_answers','session_id',array['uuid']),
  ('kg_chart_quiz_answers','vocabulary_id',array['uuid']),
  ('kg_chart_quiz_answers','is_correct',array['bool']),
  ('kg_chart_settings','key',array['text','varchar']),
  ('kg_chart_settings','value',array['jsonb'])
), source_tables as (
  select distinct table_name from required_columns
), catalyst_tables(table_name) as (values
  ('catalyst_concepts'),('catalyst_entries'),('catalyst_examples'),
  ('catalyst_generated'),('catalyst_generation_daily')
), checks as (
  select 'source_columns' as check_name,
    case when count(*) filter (where a.attname is null or not (t.typname=any(r.types)))=0 then 'PASS' else 'BLOCKED' end as status,
    coalesce(string_agg(r.table_name||'.'||r.column_name, ', ' order by r.table_name,r.column_name)
      filter (where a.attname is null or not (t.typname=any(r.types))), 'All required source columns have compatible types') as detail
    from required_columns r
    left join pg_attribute a on a.attrelid=to_regclass('public.'||r.table_name) and a.attname=r.column_name and not a.attisdropped
    left join pg_type t on t.oid=a.atttypid
  union all
  select 'source_rls', case when count(*) filter (where coalesce(c.relrowsecurity,false)=false)=0 then 'PASS' else 'BLOCKED' end,
    coalesce(string_agg(s.table_name, ', ' order by s.table_name) filter (where coalesce(c.relrowsecurity,false)=false), 'RLS enabled on all six source tables; verify policies with two test accounts')
    from source_tables s left join pg_class c on c.oid=to_regclass('public.'||s.table_name)
  union all
  select 'source_read_grants', case when bool_and(case when to_regclass('public.'||table_name) is null then false
      else has_table_privilege(case when table_name='kg_chart_settings' then 'service_role' else 'authenticated' end,
      to_regclass('public.'||table_name),'SELECT') end) then 'PASS' else 'BLOCKED' end,
    'Learner SELECT on progress/vocabulary; server SELECT on settings'
    from source_tables
  union all
  select 'translation_relationship', case when exists (
    select 1 from pg_constraint k
      join pg_attribute a on a.attrelid=k.conrelid and a.attnum=k.conkey[1]
      join pg_attribute b on b.attrelid=k.confrelid and b.attnum=k.confkey[1]
      where k.contype='f' and k.conrelid=to_regclass('public.kg_chart_vocabulary_translations')
      and k.confrelid=to_regclass('public.kg_chart_vocabulary') and cardinality(k.conkey)=1
      and a.attname='vocabulary_id' and b.attname='id') then 'PASS' else 'BLOCKED' end,
    'PostgREST vocabulary embedding requires translations.vocabulary_id -> vocabulary.id'
  union all
  select 'allow_list_function', case when to_regprocedure('public.kg_chart_is_allowed()') is null then 'BLOCKED'
    when has_function_privilege('authenticated',to_regprocedure('public.kg_chart_is_allowed()'),'EXECUTE') then 'PASS' else 'BLOCKED' end,
    'Function exists and is callable by authenticated; live session/allow-list behavior still requires acceptance'
  union all
  select 'catalyst_tables', case when count(c.oid)=0 then 'NOT_INSTALLED'
    when count(c.oid)=5 then 'PRESENT' else 'PARTIAL' end,
    count(c.oid)::text||'/5 tables present; use first-install bundle only when all Catalyst objects are absent'
    from catalyst_tables t left join pg_class c on c.oid=to_regclass('public.'||t.table_name)
  union all
  select 'quota_rpc', case when to_regprocedure('public.catalyst_reserve_generation(uuid)') is null then 'NOT_INSTALLED'
    when has_function_privilege('service_role',to_regprocedure('public.catalyst_reserve_generation(uuid)'),'EXECUTE')
      and not has_function_privilege('anon',to_regprocedure('public.catalyst_reserve_generation(uuid)'),'EXECUTE')
      and not has_function_privilege('authenticated',to_regprocedure('public.catalyst_reserve_generation(uuid)'),'EXECUTE')
      then 'PASS' else 'BLOCKED' end,
    'Reservation RPC must be executable only by the server, not browser roles'
)
select check_name,status,detail from checks order by check_name;
