# Phase 5G — Burmese pattern practice

Implemented on **2026-11-24 (Japan)** as the alternative to paid sentence
generation. This phase is frontend-only. It does not deploy a service worker,
alter the database or Edge Function, or enable paid generation.

## Learner flow

1. Choose Burmese as the learning language and sign in with the KG Chart account.
2. Open **Verb at the end → Your words → Practice with my words**.
3. Choose a sentence pattern, speaker form and compatible learned noun.
4. Make the example, read its Burmese, approximate Devanagari and Marathi/English
   meaning, or cycle to the next compatible word.
5. Save it to **My Learning → My sentence notebook**. Its source is labelled
   **From pattern practice**, and notes remain separate from the saved sentence.

This builds a fixed example; it does not grade a learner's writing, complete a
lesson, schedule a review or increase KG progress. One compatible noun is enough.
The frame supplies the pronoun, verb and ending and identifies these as lesson
words rather than claiming that they are already learned.

## Content and compatibility

| Pattern | Current compatible dictionary nouns | Additional prepared nouns |
| --- | --- | --- |
| I eat [food] | Apple, cooked rice, bread, banana | None |
| I drink [drink] | Water, tea, coffee, soft drink | None |
| I go to [place] | None in the dictionary snapshot checked | School, home/house, market, park |

Each noun must match an explicit normalized Burmese spelling **and** English
gloss. Topic names and substrings do not establish grammatical compatibility.
For example, Japanese leek cannot become a place because its name contains a
country. Repeated dictionary entries for coffee produce one choice. Unrecognized,
unlearned or other-language words are excluded.

The four prepared place mappings do not invent learner progress or insert KG
vocabulary. The go pattern displays an unavailable state until a corresponding
standalone word exists and qualifies. Current eat/drink availability still depends
on the signed-in learner's progress. Live read-only inspection checked dictionary
entries, not an individual learner's quiz history.

Masculine and feminine speaker forms use ကျွန်တော် and ကျွန်မ. Marathi meanings
have explicit speaker agreement and place forms (शाळेत, घरी, बाजारात, उद्यानात).
The noun choices and frames are deliberately small; this is not a general
grammar engine or arbitrary translation service.

The Burmese frames were cross-checked against the existing lesson and NIU SEAsite
beginning/intermediate drills:
[lesson 1 drills](https://seasite.niu.edu/Burmese/Intermediate/lesson1/drill.htm),
[lesson 2 drills](https://seasite.niu.edu/Burmese/Beginning/Blesson_2/drill.htm).
Marathi meanings and approximate Devanagari readings are authored for this bank.
They are not copied from the KG translation reading field, which was empty for
the checked nouns. No external transliteration download is required for the bank.
All patterns, meanings and readings still await native-speaker review; script
presence tests do not establish pronunciation accuracy.

## Data boundaries and persistence

- `kg_chart_is_allowed` is checked before reading progress. Existing authenticated
  Supabase access and RLS remain authoritative.
- Completion and quiz-session reads filter by the current user and Burmese.
  Vocabulary from completed topics and words with at least two distinct correct
  answer records qualify. Word ratings do not affect this selection.
- Reads are ordered, paginated and split into bounded ID batches. Returned rows
  are checked against requested users, language, topics and sessions. Failures or
  incomplete reads produce an error and retry control, not a false empty result.
- Account, target, meaning or lesson changes remount the practice view. Late
  source responses are ignored. Save checks the current notebook account scope.
- Pattern IDs are versioned activity IDs in the existing version 1 notebook;
  no migration or new storage key is required. Saving the same sentence/meaning
  twice is idempotent. Failed writes preserve the displayed sentence.
- Export/import, existing original writing and append-only correction notes are
  unchanged. Readings are reconstructed only for exact known pattern text.
  Keep version 1 content immutable if later corrections need a new pattern version.
- New AI-generation buttons and capability calls are removed from the page for
  all targets. **Show earlier AI sentences** loads existing rows on request and
  retains flag/retry behavior. The backend implementation remains in the repo.

Production generation remains at **zero requests/day**. A read-only check at the
start of this phase found zero quota attempts and zero generated rows. This phase
made no production writes and no model requests. Browser QA used a clearly marked
synthetic learner in an isolated local preview, never the owner's live account.

The pattern bank runs locally once loaded, but retrieving KG progress currently
needs internet. Device-local notebook persistence is not a guarantee of offline
app startup or cross-device sync. Existing app dependencies still need Phase 6
caching and preservation work.

## Validation

- `npm test`: **63 tests passed**, including exact noun/slot matching,
  speaker/meaning forms, progress pagination, foreign-row/retry rejection,
  denied access, source failures and notebook merge/preservation.
- Mounted React tests exercise actual selections, next-word behavior, unavailable
  places, save/duplicate/reload, storage failure, late account responses, sign-out,
  older AI meanings/flags and zero generation-endpoint requests.
- `npm run check:app`, `npm run check:backend` and `git diff --check`.
- Desktop browser QA: generated a food sentence, saved it, repeated the save,
  reopened the notebook after a page reload, and verified the source label,
  reading, Marathi meaning and separate correction field.

Automated and synthetic browser results do not replace live-account or physical
iPad acceptance. The production SQL and Edge source are unchanged, so the earlier
PostgreSQL concurrency rehearsal is not repeated for this phase.

## After merge

1. Refresh Catalyst on the owner's desktop, choose Burmese and open the flow above.
2. Confirm expected learned food/drink words appear; try both speaker forms and
   the explicit unavailable place state if no compatible place word exists.
3. Save one example twice, open the notebook and reload. Confirm one new entry,
   its source/reading/meaning, and the older originals and notes.
4. Check Marathi/English meanings and sign-out/account separation. Physical iPad
   notebook export/import and native-speaker content review remain outstanding.

Next is **Phase 6A: offline architecture and preservation review**. Plan safe app
and dependency caching, selected content/audio packs, and account-scoped learned
word snapshots with progress/size/resume indicators. Follow with offline startup
and update tests, then physical iPad Airplane-mode acceptance. Do not clear site
data to perform an update. Paid AI activation is independent and remains deferred.
