# Catalyst

Grammar across languages. Sister app of KG Chart. Named after a catalyst: it adds nothing new to the reaction, but its presence makes the rest make sense.

You learn one grammar point by seeing how Japanese, Burmese and Chinese handle it side by side, next to an anchor column in Marathi (or English: switch in ⚙︎ Settings). Every example has a Devanagari line, as in KG Chart.

- **Nodes are grammar concepts, not languages.** 24 concepts to start: word order, particles, questions and endings, tense and aspect, mood, politeness and negation, counters.
- **One entry per language:** the form, 2–3 examples, audio, a note on how it differs.
- **Closeness for every language pair:** ≈ close, ~ partial, ✕ no equivalent, with a note on the tricky pairs (は vs Chinese topic, ကို covering を and に, 了 is not た…). "No equivalent" entries are shown with a dashed border and still have examples showing what is used instead.
- **Example n is the same sentence in every language**, so *By sentence* view lines them up.

## ✨ Practice with my words

Phase 5G adds Burmese pattern practice without an AI key or generation charge.
Choose **Burmese → Verb at the end → Your words**. A compatible noun from a
completed Burmese KG Chart topic or two correct quiz answers is enough; word
ratings remain separate. The app supplies the pronoun, verb and ending explicitly
as lesson words, and shows the sentence, an approximate Devanagari reading and
the selected Marathi/English meaning. Masculine and feminine speaker forms are
available. Patterns and readings await native-speaker review.

The initial bank covers four food nouns and four drinks. The “I go to [place]”
frame is included, but needs a compatible learned place noun: none of its four
standalone place words existed in the KG dictionary checked on 2026-11-24.
It shows an unavailable state rather than substituting an unrelated word.

**Save pattern to notebook** keeps a separately labelled pattern example in
My Learning. Repeated saves avoid duplicates. Existing original writing,
correction notes, notebook export/import and account/language separation remain
intact. The bank is bundled locally; reading KG progress still needs a connection.
Reliable offline app startup and downloaded progress belong to Phase 6.
See [Phase 5G](docs/PHASE5G_PATTERN_PRACTICE.md).

**Show earlier AI sentences** retains read/flag access to older multilingual and
selected-language examples. New AI-generation controls have been removed from
the page, and the deployed daily generation limit remains **zero**. The installed
backend and saved rows are retained. Historical generation/deployment details are
in [Phase 5D](docs/PHASE5D_GENERATION.md) and
[Phase 5F](docs/PHASE5F_PAUSED_DEPLOYMENT.md); paid activation is deferred.

Tests: `npm ci`, `npm test`, `npm run check:app` (Node 22.18+). No production
credentials or paid model calls are needed for these checks.

The [Phase 5E](docs/PHASE5E_BACKEND_READINESS.md) first-install package is for empty
installations only. Use `npm run check:backend` to check it and `npm run test:postgres`
for the disposable PostgreSQL concurrency rehearsal.

## Stack (same as KG Chart)
- `index.html`: React + Tailwind + Babel in the page. No build step for the page. Babel is pinned to `@7` (see note below).
- Supabase project `ulgrfumbwjovbjzjiems`, tables `catalyst_concepts`, `catalyst_entries`, `catalyst_examples`. Read-only from the browser.
- Devanagari: Burmese and Chinese from `celeritas7.github.io/language-utils` (same converters as KG Chart); Japanese from the kana reading in `js/catalyst-scripts.js`.
- Audio: `js/catalyst-audio.js` (copy of KG Chart's player). Clips in `vocabulary-assets/audio-grammar/<lang>/`. Until clips exist, the phone's own voice is used if it has one.
- The page also carries a built-in copy of the content (`js/catalyst-data.js`), so lessons can load before the tables exist. Reliable offline reopening still requires Phase 6 app/dependency caching.

## Folders
```
index.html            the app
js/catalyst-scripts.js      Devanagari (kana → Devanagari; loads language-utils converters)
js/catalyst-audio.js        audio player
js/catalyst-data.js         generated content (do not edit)
js/catalyst-patterns.js     Burmese frames, compatible nouns and read-only KG progress
data/grammar.yaml     THE CONTENT: edit this
tools/build_data.mjs  YAML → js/catalyst-data.js + sql/catalyst-seed.sql, with checks
tools/gen_catalyst_audio.py Azure clips → Supabase Storage (same keys as gen_kg_audio.py)
sql/catalyst-schema.sql     tables + RLS (run once)
sql/catalyst-seed.sql       generated content for Supabase (safe to run twice)
sql/catalyst-generated.sql  table for Claude's sentences (run once)
sql/catalyst-generation-v2.sql  selected-language metadata and atomic request quota
sql/catalyst-preflight.sql  read-only backend prerequisite inspection
sql/catalyst-initial-install.sql  guarded atomic first install; generation paused
supabase/functions/catalyst-sentence/   Edge Function: core.ts (logic), index.ts (wiring)
tests/sentence.test.ts     tests for core.ts
```

## Setup
1. New GitHub repo (e.g. `Celeritas7/catalyst`), push this folder, turn on GitHub Pages.
2. Review [Phase 5E](docs/PHASE5E_BACKEND_READINESS.md), the read-only preflight and
   first-install bundle before an approved backend installation. The first-install
   bundle refuses existing Catalyst objects; never use it for upgrades. Once the
   content tables are installed, ⚙︎ Settings shows "Content: Supabase".
3. Audio: `python tools/gen_catalyst_audio.py --lang ja --dry-run`, then without `--dry-run`; repeat for `my`, `zh`, `mr`. About 2,600 characters in total.

## Changing content
1. Edit `data/grammar.yaml`.
2. `npm install` (once), then `node tools/build_data.mjs`. It refuses to build if a pair has no level, a highlight isn't in its sentence, a Japanese reading has kanji, or an entry has fewer than 2 examples.
3. Run `npm run prepare:backend` and commit the generated data/SQL. Before an
   approved database content update, review `sql/catalyst-seed.sql`: it deletes
   removed concepts and can cascade to saved sentences. Prepare a preservation
   plan for any removals. Rerun the audio script only for approved changed content.

Japanese readings are written as pronounced: topic は → わ, へ → え, を → お. Mark an entry `checked: true` once a native speaker has checked it.

## Next steps
- Native-speaker check of the Burmese and Marathi entries (all entries are `checked: false`).
- Quiz: "which language has no equivalent?", "pick the matching particle", and quizzes on your ✨ sentences.
- Link a concept to KG Chart sentences that use it.
