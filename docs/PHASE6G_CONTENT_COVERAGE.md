# Phase 6G — content coverage and review inventory

Checkpoint: 2026-11-27 (Japan), based on merged PR #28 (`649fc3e`).
This is the next independent content step in Phase 6. Physical 6F acceptance
remains pending; this step does not close that gate.

## Learner-facing result

Explore → **Content coverage** shows the selected target's lessons with examples,
example count, available meanings in the chosen meaning language, and guided
activity count. Expand **Translation gaps and review status** to open lessons
with missing meanings. Changing target/meaning preferences updates the counts.
The counts follow the content currently loaded, including a later online result;
online lessons and the bundled offline copy are explicitly distinguished.

These are availability counts, not mastery or linguistic approval. A legacy
`checked` boolean is displayed only as a source mark, with missing reviewer
evidence disclosed. Guided activities and fixed sentence patterns remain drafts.
No progress, notebook, draft, review schedule or account key changes are needed.

## Measured bundled coverage

The checked-in [machine-readable inventory](content-coverage.json) is reproducible
from repository content and includes SHA-256 source fingerprints.

| Target | Lessons | Examples | Marathi meanings | English meanings | Guided activities | Fixed patterns |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Japanese | 24 | 48 | 48 | 48 | 1 | 0 |
| Burmese | 24 | 50 | 50 | 50 | 1 | 3 |
| Chinese | 24 | 48 | 48 | 48 | 0 | 0 |
| Marathi | 24 | 48 | 25 | 48 | 0 | 0 |
| English | 24 | 24 | 20 | 24 | 0 | 0 |

All 120 language entries currently have `checked: false`. The 218 example rows
are counted in their lesson context, not as unique sentences. One Marathi text,
`तू कुठे जातोस?`, appears in question-word and politeness lessons with different
English glosses. Both remain; a repeated sentence can teach different senses or
register. The report retains each location, exact gloss and reading.

There are 27 Marathi-meaning gaps: 23 for Marathi targets and 4 for English
targets. Existing meaning practice already skips unavailable translations;
this phase exposes those gaps, without inventing translations or changing quiz
eligibility. Counts use the exact source gloss, with native-text fallback only
for English, matching the existing lesson/quiz convention.

No script warning occurs in the current pack. Script hints only flag a missing
expected script or kana in Chinese-labelled examples. Han characters shared by
Japanese and Chinese cannot establish the language. Passing a script check does
not certify language, grammar, pronunciation, register or translation quality.

## Contributor workflow and review boundaries

Run `npm run inventory:content` after changing bundled content, inspect
`docs/content-coverage.json`, then regenerate the static release. CI runs
`npm run check:content` and fails on a stale inventory, missing/duplicate concept
IDs, unknown language codes, missing/placeholder example text, exact duplicate
examples within one language entry, or drift in the compared YAML/bundle fields
(concept ID/order, title/group/summary, form/note/checked/none, text/gloss/reading/highlight).
The existing data builder retains its pair-level, highlight and converter checks.

Cross-lesson repeats and suspicious scripts are review candidates rather than
automatic deletions. Exact matching preserves case, punctuation, spacing, gloss,
reading, highlights and stored pronunciation aids; different senses are not
collapsed. The inventory contains no learner writing or live account data.

The existing repository pack is the recorded source. Individual original
references, structured register labels and reviewer records are incomplete.
The inventory explicitly records these limits instead of treating filenames,
translations, source flags or script tests as verification. Pilot provenance is
in [Phase 3](PHASE3_CONTENT.md); pattern limits are in
[Phase 5G](PHASE5G_PATTERN_PRACTICE.md). No private source archive was imported,
no new linguistic material was approved, and no SQL or production changes were
applied. The paused paid API remains separate from this work.

## Validation

- 145 tests pass with serial execution, including nine new tests for target and
  meaning isolation, exact sense matching, missing-example positions, source
  drift, duplicate/placeholder checks, script hints and inventory reproducibility.
- Compiled-UI tests cover language changes, gap links, preserved notebook bytes,
  late online content and a legacy `checked: true` value without approval claims.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `c7f1ab89a683ff90a70d`: 252 files, 11,591,499 bytes.
- Managed preview started with a synthetic account/backend and external requests
  blocked. The cloud browser timed out at navigation and frame inspection, so
  visual checks at phone/tablet widths and enlarged text are **unverified** in
  this run. No screenshot or physical-device acceptance is claimed.

After deployment, open Explore with Burmese + Marathi: expect 24 lessons,
50 examples, 50/50 meanings and 1 guided activity. English + Marathi should show
20/24 meanings and four gap links; selecting English meanings should show 24/24.
Check the panel at enlarged text sizes on iPad without clearing website data.

Next content work: a bounded lesson-expansion/review batch with explicit sources,
language, register and sense, keeping new drafts labelled until review evidence
exists. Physical 6F Files, Home Screen and Airplane-mode checks remain independent.
