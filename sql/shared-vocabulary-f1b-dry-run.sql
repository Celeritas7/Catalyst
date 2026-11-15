-- F1B read-only inventory and mapping preview (Technical project).
-- This file NEVER inserts, updates, deletes, creates tables or claims owners.
-- It works before and after the additive migration. All numbers are aggregates.

-- Source tables are separate collections, not unique canonical vocabulary.
with source_counts as (
  select 'japanese_unified_words' source_table, 'ja' language, 'word' kind,
         count(*) total_rows, count(distinct (kanji,hiragana,meaning_en)) distinct_source_tuples
  from public.japanese_unified_words
  union all select 'burmese_app_words','my','word',count(*),count(distinct (burmese_word,english_meaning))
  from public.burmese_app_words
  union all select 'kg_chart_vocabulary_translations','multi','translation',count(*),count(distinct (language_code,native_text))
  from public.kg_chart_vocabulary_translations
  union all select 'chinese_study_app_words','zh','word',count(*),count(distinct id)
  from public.chinese_study_app_words
  union all select 'chinese_study_app_hanzi_database','zh','character_reference',count(*),count(distinct id)
  from public.chinese_study_app_hanzi_database
  union all select 'words','ms','word',count(*),count(distinct (ms,en))
  from public.words
)
select *, total_rows - distinct_source_tuples as repeated_tuples
from source_counts order by language, source_table;

-- Language-specific KG Chart inventory, including zh and ms.
select language_code, count(*) source_rows,
       count(distinct native_text) distinct_written_forms
from public.kg_chart_vocabulary_translations
group by language_code order by language_code;

-- Possible Japanese matches on written form only; never auto-approve.
with jp as (
  select distinct coalesce(nullif(kanji,''),hiragana) form
  from public.japanese_unified_words
), kg as (
  select distinct native_text form
  from public.kg_chart_vocabulary_translations where language_code='ja'
)
select count(*) possible_surface_matches_only from jp join kg using(form);

-- Legacy ownership safety: these distinct IDs are NOT verified account owners.
select 'burmese_app_user_state' source, count(*) total_rows,
       count(distinct user_id) distinct_legacy_uuids
from public.burmese_app_user_state
union all select 'burmese_app_progress_events', count(*), count(distinct user_id)
from public.burmese_app_progress_events;

-- After F1B is deployed to a STAGING clone, inspect the new tables and assert:
-- * zero source mappings before the first import
-- * zero user evidence and zero claims
-- * every new table has RLS enabled
-- * anon/authenticated have no grants on F1B lex_* tables
-- Full SQL assertions are in shared-vocabulary-f1b-verify.sql.
