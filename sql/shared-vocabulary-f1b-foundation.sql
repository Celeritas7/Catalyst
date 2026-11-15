-- F1B PROPOSAL ONLY. Do not run on production until backup, review and staging tests.
-- Additive: creates new lex_* tables; no existing data or policies are changed.
-- Intended target: Technical Supabase project, after verifying deployment identity.
-- A failed statement should roll back the entire migration.
begin;

create table public.lex_languages (
  code text primary key,
  name text not null,
  native_name text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint lex_languages_code_nonempty check (length(btrim(code)) between 2 and 35)
);

create table public.lex_entries (
  id uuid primary key default gen_random_uuid(),
  language_code text not null references public.lex_languages(code),
  entry_kind text not null check (entry_kind in ('character','word','expression','affix')),
  lemma text not null,
  part_of_speech text,
  status text not null default 'active' check (status in ('active','pending','deprecated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lex_entries_lemma_nonempty check (length(btrim(lemma)) > 0)
);
create index lex_entries_language_kind_idx on public.lex_entries(language_code, entry_kind);

create table public.lex_forms (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.lex_entries(id) on delete restrict,
  form_text text not null,
  script_code text,
  reading text,
  transliteration text,
  variant_kind text not null default 'standard',
  created_at timestamptz not null default now(),
  constraint lex_forms_text_nonempty check (length(btrim(form_text)) > 0)
);
create index lex_forms_entry_idx on public.lex_forms(entry_id);
alter table public.lex_forms add constraint lex_forms_id_entry_unique unique (id, entry_id);

create table public.lex_senses (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.lex_entries(id) on delete restrict,
  sense_number integer not null check (sense_number > 0),
  domain text,
  usage_register text,
  notes text,
  review_status text not null default 'pending' check (review_status in ('pending','verified','disputed')),
  unique (entry_id, sense_number)
);
alter table public.lex_senses add constraint lex_senses_id_entry_unique unique (id, entry_id);

create table public.lex_glosses (
  id uuid primary key default gen_random_uuid(),
  sense_id uuid not null references public.lex_senses(id) on delete restrict,
  reference_language_code text not null references public.lex_languages(code),
  gloss_text text not null,
  qualifier text,
  provenance text,
  created_at timestamptz not null default now(),
  constraint lex_glosses_text_nonempty check (length(btrim(gloss_text)) > 0)
);
create index lex_glosses_sense_ref_idx on public.lex_glosses(sense_id, reference_language_code);

-- The original project, table and typed source identifier form an immutable key.
-- No canonical mapping is required when a source row is first inventoried.
create table public.lex_source_records (
  id uuid primary key default gen_random_uuid(),
  source_project text not null,
  source_app text not null,
  source_table text not null,
  source_pk text not null,
  source_pk_type text not null,
  language_code text references public.lex_languages(code),
  source_kind text not null check (source_kind in ('character','word','expression','affix','translation','other')),
  content_digest text,
  mapping_status text not null default 'unmapped'
    check (mapping_status in ('unmapped','candidate','approved','excluded','conflict')),
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (source_project, source_app, source_table, source_pk),
  constraint lex_source_keys_nonempty check (
    length(btrim(source_project)) > 0 and length(btrim(source_app)) > 0
    and length(btrim(source_table)) > 0 and length(btrim(source_pk)) > 0
  )
);
create index lex_source_status_idx on public.lex_source_records(mapping_status, source_app);

-- Many-to-many: one old row can describe multiple senses, or link to a form.
create table public.lex_source_assignments (
  id uuid primary key default gen_random_uuid(),
  source_record_id uuid not null references public.lex_source_records(id) on delete restrict,
  entry_id uuid not null references public.lex_entries(id) on delete restrict,
  form_id uuid,
  sense_id uuid,
  assignment_status text not null default 'pending' check (assignment_status in ('pending','approved','rejected')),
  evidence jsonb not null default '{}'::jsonb,
  decided_at timestamptz,
  foreign key (form_id, entry_id) references public.lex_forms(id, entry_id) on delete restrict,
  foreign key (sense_id, entry_id) references public.lex_senses(id, entry_id) on delete restrict,
  unique nulls not distinct (source_record_id, entry_id, form_id, sense_id)
);
create index lex_source_assignments_entry_idx on public.lex_source_assignments(entry_id);

create table public.lex_match_candidates (
  id uuid primary key default gen_random_uuid(),
  source_record_id uuid not null references public.lex_source_records(id) on delete restrict,
  candidate_entry_id uuid not null references public.lex_entries(id) on delete restrict,
  confidence numeric(5,4) check (confidence between 0 and 1),
  evidence jsonb not null default '{}'::jsonb,
  decision text not null default 'pending' check (decision in ('pending','approved','rejected')),
  reviewed_at timestamptz,
  unique (source_record_id, candidate_entry_id)
);

-- Lessons, topics, example sentences, audio and pictures remain source-owned.
create table public.lex_source_links (
  id uuid primary key default gen_random_uuid(),
  source_record_id uuid not null references public.lex_source_records(id) on delete restrict,
  relation_type text not null,
  related_source_project text not null,
  related_source_table text not null,
  related_source_pk text not null,
  related_source_pk_type text not null,
  metadata jsonb not null default '{}'::jsonb,
  unique (source_record_id, relation_type, related_source_project, related_source_table, related_source_pk)
);

-- Raw user events never inherit ownership from legacy random user IDs.
-- Imported unknown-owner records stay in legacy source tables pending verified claims.
create table public.lex_user_evidence (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  entry_id uuid references public.lex_entries(id) on delete restrict,
  sense_id uuid,
  source_record_id uuid references public.lex_source_records(id) on delete restrict,
  skill text not null check (skill in ('recognition','listening','speaking','writing','usage')),
  source_app text not null,
  source_event_key text not null,
  raw_rating text,
  raw_label text,
  raw_payload jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null,
  imported_at timestamptz not null default now(),
  unique (user_id, source_app, source_event_key),
  constraint lex_evidence_has_target check (entry_id is not null or source_record_id is not null),
  constraint lex_evidence_sense_requires_entry check (sense_id is null or entry_id is not null),
  foreign key (sense_id, entry_id) references public.lex_senses(id, entry_id) on delete restrict
);
create index lex_evidence_owner_item_idx on public.lex_user_evidence(user_id, entry_id, skill, occurred_at desc);

create table public.lex_user_projections (
  user_id uuid not null references auth.users(id) on delete restrict,
  entry_id uuid not null references public.lex_entries(id) on delete restrict,
  skill text not null check (skill in ('recognition','listening','speaking','writing','usage')),
  scheme_version text not null,
  projected_state jsonb not null,
  recomputed_at timestamptz not null default now(),
  primary key (user_id, entry_id, skill, scheme_version)
);

-- Proof, reviewer provenance and account claims are internal-only.
create table public.lex_legacy_claims (
  id uuid primary key default gen_random_uuid(),
  legacy_project text not null,
  legacy_table text not null,
  legacy_pk text not null,
  claim_status text not null default 'unclaimed'
    check (claim_status in ('unclaimed','pending','verified','rejected')),
  owner_user_id uuid references auth.users(id) on delete restrict,
  proof_method text,
  verified_at timestamptz,
  unique (legacy_project, legacy_table, legacy_pk),
  constraint lex_claim_owner_only_when_verified check (
    (claim_status = 'verified' and owner_user_id is not null and proof_method is not null and verified_at is not null)
    or (claim_status <> 'verified' and owner_user_id is null)
  )
);

-- Explicitly prevent all frontend Data API access to new dictionary and
-- migration tables during F1B. Adapters/public content policies come later.
revoke all on public.lex_languages, public.lex_entries, public.lex_forms,
  public.lex_senses, public.lex_glosses, public.lex_source_records,
  public.lex_source_assignments, public.lex_match_candidates,
  public.lex_source_links, public.lex_user_evidence,
  public.lex_user_projections, public.lex_legacy_claims from public, anon, authenticated;

alter table public.lex_languages enable row level security;
alter table public.lex_entries enable row level security;
alter table public.lex_forms enable row level security;
alter table public.lex_senses enable row level security;
alter table public.lex_glosses enable row level security;
alter table public.lex_source_records enable row level security;
alter table public.lex_source_assignments enable row level security;
alter table public.lex_match_candidates enable row level security;
alter table public.lex_source_links enable row level security;
alter table public.lex_user_evidence enable row level security;
alter table public.lex_user_projections enable row level security;
alter table public.lex_legacy_claims enable row level security;

-- Privileged/staging import only in F1B. No policies or grants yet, including
-- progress access: this prevents premature exposure or writes by old clients.
commit;
