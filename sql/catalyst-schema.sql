-- ============================================================
-- Catalyst: tables. Same Supabase project as KG Chart (ulgrfumbwjovbjzjiems), prefix catalyst_.
-- Run once in the Supabase SQL editor, then run catalyst-seed.sql. Safe to re-run.
-- Content is readable without logging in (it is grammar notes; the same text is in the public repo).
-- Nobody can write from the browser: there are no insert/update/delete policies. Content changes go
-- through data/grammar.yaml → tools/build_data.mjs → catalyst-seed.sql.
-- ============================================================

create table if not exists public.catalyst_concepts (
  id text primary key,                          -- e.g. 'topic_wa'
  sort_order int not null default 0,
  group_name text not null,                     -- 'Particles', 'Tense and aspect', …
  title text not null,
  summary text not null default '',
  levels jsonb not null default '{}'::jsonb,    -- { "ja-my": "close" | "partial" | "none", … } for every language pair
  pair_notes jsonb not null default '{}'::jsonb,-- { "ja-zh": "why", … } for the tricky pairs
  updated_at timestamptz not null default now()
);

create table if not exists public.catalyst_entries (
  id text primary key,                          -- '<concept_id>:<language_code>'
  concept_id text not null references public.catalyst_concepts(id) on delete cascade,
  language_code text not null,                  -- ja, my, zh, mr, en
  form text not null,
  note text not null default '',
  has_equivalent boolean not null default true, -- false = "no equivalent" entry (the note says what is used instead)
  checked boolean not null default false,       -- true once a native speaker has checked it
  updated_at timestamptz not null default now(),
  unique (concept_id, language_code)
);

create table if not exists public.catalyst_examples (
  id text primary key,                          -- '<entry_id>:<n>'
  entry_id text not null references public.catalyst_entries(id) on delete cascade,
  sort_order int not null default 0,            -- example n in every language says the same thing
  native_text text not null,
  reading text,                                 -- kana (Japanese, as pronounced), pinyin (Chinese)
  english_text text not null default '',
  highlight text[] not null default '{}',       -- parts of native_text to highlight
  devanagari text,                              -- saved Devanagari line (the app recomputes it when the converter loads)
  updated_at timestamptz not null default now()
);
create index if not exists catalyst_examples_entry on public.catalyst_examples(entry_id, sort_order);

alter table public.catalyst_concepts enable row level security;
alter table public.catalyst_entries  enable row level security;
alter table public.catalyst_examples enable row level security;

drop policy if exists catalyst_concepts_read on public.catalyst_concepts;
create policy catalyst_concepts_read on public.catalyst_concepts for select to anon, authenticated using (true);
drop policy if exists catalyst_entries_read on public.catalyst_entries;
create policy catalyst_entries_read on public.catalyst_entries for select to anon, authenticated using (true);
drop policy if exists catalyst_examples_read on public.catalyst_examples;
create policy catalyst_examples_read on public.catalyst_examples for select to anon, authenticated using (true);
