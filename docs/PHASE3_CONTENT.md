# Phase 3: guided activity pilots

Two language-scoped pilots follow Situation → Notice → Build → Choose → Use. Find them on Today and Explore; the Burmese pilot also appears in the verb-final lesson. No automatic target-language switch occurs. Other target languages show an honest unavailable state.

## Content and provenance

- `my-word-order`: uses existing `verb_final` Burmese examples from `data/grammar.yaml`. Original entry has `checked: false`. Chunk boundaries are authored units, never inferred by splitting Burmese script. Guidance and Marathi translations are new drafts. S–O–V is the neutral pattern being practised, not a claim that all other contextual orders are ungrammatical.
- `ja-topic-transitions`: new authored examples and Marathi/English teaching text, informed by [Bunpro's ところで explanation](https://bunpro.jp/grammar_points/ところで), accessed 2026-11-15. Explains related detail versus topic shift and distinguishes standalone ところで from verb-past + ところで. Examples are original additions, not copied from the reference. Context-choice prompts state the speaker's intention; these are not absolute claims that two isolated utterances have only one possible conversational relationship.
- Both pilots explicitly await native-speaker review. Marathi reference cues explain function rather than promising exact equivalents. Private source files have not been published or represented as fully reviewed.

## Interaction and storage

Chunk buttons work by keyboard or touch; remove, clear, hint and reveal are available. Japanese building accepts two middle-chunk orders. Choice feedback explains the stated intention; retry and reveal do not increment the existing quiz score or learned count. Free production is self-reviewed, never automatically declared grammatically correct.

`catalyst_settings.activities` stores records by target-language plus stable pilot ID, with step, draft, completed and updatedAt. It preserves all pre-existing settings, history and learned IDs. Completing an activity is separate from mastery. Draft saving reports storage failures. Drafts remain on this device and are not uploaded to Supabase or AI services. Phase 4 owns skill assessment, review scheduling and account-scoped progress.

## Validation

Existing study regression suite plus activity tests for every chunk permutation, multiple valid answers, choice grading, bilingual coverage, target isolation and missing translations. Browser checks cover complete pilot flows, draft persistence and independent language selection. Only supplied pilot languages have the new activities; this is not expansion to all lessons or a translation of the entire interface.
