# Catalyst

Grammar across languages. Sister app of KG Chart. Named after a catalyst: it adds nothing new to the reaction, but its presence makes the rest make sense.

You learn one grammar point by seeing how Japanese, Burmese and Chinese handle it side by side, next to an anchor column in Marathi (or English: switch in ⚙︎ Settings). Every example has a Devanagari line, as in KG Chart.

- **Nodes are grammar concepts, not languages.** 24 concepts to start: word order, particles, questions and endings, tense and aspect, mood, politeness and negation, counters.
- **One entry per language:** the form, 2–3 examples, audio, a note on how it differs.
- **Closeness for every language pair:** ≈ close, ~ partial, ✕ no equivalent, with a note on the tricky pairs (は vs Chinese topic, ကို covering を and に, 了 is not た…). "No equivalent" entries are shown with a dashed border and still have examples showing what is used instead.
- **Example n is the same sentence in every language**, so *By sentence* view lines them up.

## ✨ Sentences from your words (Claude)
On each concept page, **New sentence from my words** asks Claude for a fresh sentence that uses this grammar point, in Japanese, Burmese, Chinese and Marathi, built only from words you have learned in KG Chart.
- **Learned words** = every word in a KG Chart topic you completed, plus any word you answered correctly at least twice. Read with your own login, so only your progress.
- **Checks before saving:** each listed word must be in your learned list and appear in the sentence, the grammar form must appear, readings must be kana / pinyin. One retry with the problems listed; otherwise you get a "try again".
- **Saved** in `catalyst_generated`, so a sentence is made once. 🚩 Wrong hides it (kept for review). Daily limit 30 (change with a `kg_chart_settings` row, key `catalyst_daily_limit`, value e.g. `50`).
- Needs at least 8 learned words in each of Japanese, Burmese and Chinese.
- Audio: generated sentences use the phone's voice (no recorded clips).

Setup (once):
1. Run `sql/catalyst-generated.sql` in the Supabase SQL editor (after `catalyst-schema.sql` and `catalyst-seed.sql`).
2. Supabase → Edge Functions → Secrets: add `ANTHROPIC_API_KEY` (from console.anthropic.com). Optional `CATALYST_MODEL` (default `claude-sonnet-5-5`).
3. Deploy: `supabase functions deploy catalyst-sentence --no-verify-jwt` (same as kg-pronounce; the function checks the login itself).
4. Check: open `https://ulgrfumbwjovbjzjiems.supabase.co/functions/v1/catalyst-sentence?check=1` → `{"ok":true,"configured":true}`.
5. Sign-in with Google from Catalyst: add Catalyst's Pages URL to Supabase → Authentication → URL Configuration → Redirect URLs. On `celeritas7.github.io` you are usually already signed in, because KG Chart and Catalyst share the saved login.

Tests for the function logic (fake Claude and database): `node tests/sentence.test.ts`.

## Stack (same as KG Chart)
- `index.html`: React + Tailwind + Babel in the page. No build step for the page. Babel is pinned to `@7` (see note below).
- Supabase project `ulgrfumbwjovbjzjiems`, tables `catalyst_concepts`, `catalyst_entries`, `catalyst_examples`. Read-only from the browser.
- Devanagari: Burmese and Chinese from `celeritas7.github.io/language-utils` (same converters as KG Chart); Japanese from the kana reading in `js/catalyst-scripts.js`.
- Audio: `js/catalyst-audio.js` (copy of KG Chart's player). Clips in `vocabulary-assets/audio-grammar/<lang>/`. Until clips exist, the phone's own voice is used if it has one.
- The page also carries a built-in copy of the content (`js/catalyst-data.js`), so it works before the tables exist and offline.

## Folders
```
index.html            the app
js/catalyst-scripts.js      Devanagari (kana → Devanagari; loads language-utils converters)
js/catalyst-audio.js        audio player
js/catalyst-data.js         generated content (do not edit)
data/grammar.yaml     THE CONTENT: edit this
tools/build_data.mjs  YAML → js/catalyst-data.js + sql/catalyst-seed.sql, with checks
tools/gen_catalyst_audio.py Azure clips → Supabase Storage (same keys as gen_kg_audio.py)
sql/catalyst-schema.sql     tables + RLS (run once)
sql/catalyst-seed.sql       generated content for Supabase (safe to run twice)
sql/catalyst-generated.sql  table for Claude's sentences (run once)
supabase/functions/catalyst-sentence/   Edge Function: core.ts (logic), index.ts (wiring)
tests/sentence.test.ts     tests for core.ts
```

## Setup
1. New GitHub repo (e.g. `Celeritas7/catalyst`), push this folder, turn on GitHub Pages.
2. Supabase SQL editor: run `sql/catalyst-schema.sql`, then `sql/catalyst-seed.sql`. ⚙︎ Settings then shows "Content: Supabase".
3. Audio: `python tools/gen_catalyst_audio.py --lang ja --dry-run`, then without `--dry-run`; repeat for `my`, `zh`, `mr`. About 2,600 characters in total.

## Changing content
1. Edit `data/grammar.yaml`.
2. `npm install` (once), then `node tools/build_data.mjs`. It refuses to build if a pair has no level, a highlight isn't in its sentence, a Japanese reading has kanji, or an entry has fewer than 2 examples.
3. Commit `js/catalyst-data.js`, run `sql/catalyst-seed.sql` in Supabase, rerun the audio script for changed sentences.

Japanese readings are written as pronounced: topic は → わ, へ → え, を → お. Mark an entry `checked: true` once a native speaker has checked it.

## Next steps
- Native-speaker check of the Burmese and Marathi entries (all entries are `checked: false`).
- Quiz: "which language has no equivalent?", "pick the matching particle", and quizzes on your ✨ sentences.
- Link a concept to KG Chart sentences that use it.
