-- Read-only verification after applying F1B to a staging clone.
-- The output is aggregate-only and contains no vocabulary or user data.
with expected(table_name) as (
  values ('lex_languages'),('lex_entries'),('lex_forms'),('lex_senses'),
         ('lex_glosses'),('lex_source_records'),('lex_source_assignments'),
         ('lex_match_candidates'),('lex_source_links'),('lex_user_evidence'),
         ('lex_user_projections'),('lex_legacy_claims')
)
select e.table_name,
       c.relname is not null as exists,
       coalesce(c.relrowsecurity,false) as rls_enabled,
       case when c.oid is null then null else
         has_table_privilege('anon', c.oid, 'SELECT,INSERT,UPDATE,DELETE') end as anon_any_privilege,
       case when c.oid is null then null else
         has_table_privilege('authenticated', c.oid, 'SELECT,INSERT,UPDATE,DELETE') end as authenticated_any_privilege
from expected e
left join pg_class c on c.relname=e.table_name and c.relnamespace='public'::regnamespace
order by e.table_name;

select 'lex_entries' table_name, count(*) rows from public.lex_entries
union all select 'lex_source_records',count(*) from public.lex_source_records
union all select 'lex_source_assignments',count(*) from public.lex_source_assignments
union all select 'lex_match_candidates',count(*) from public.lex_match_candidates
union all select 'lex_user_evidence',count(*) from public.lex_user_evidence
union all select 'lex_legacy_claims',count(*) from public.lex_legacy_claims;
