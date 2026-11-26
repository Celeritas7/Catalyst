# Phase 6K — guided Burmese what/where questions

Checkpoint: 2026-11-27 (Japan), based on merged PR #32
(`ab4a915cd63d4cfdc6454e3577e2d9ad1b28e09e`).

## Learner-facing result

With Burmese selected, **Ask what and where**
(`काय आणि कुठे असे प्रश्न विचारा`) appears in Today, Explore and the existing
`wh_question` lesson. It follows Situation → Notice → Build → Choose → Use, with
Marathi/English guidance, hints/reveals, adaptive review and explicit notebook
saving. Burmese now has four guided activities; Japanese retains one.

| Exact bundled example | Intended situation in this activity | Source |
| --- | --- | --- |
| `ဘာ စားမလဲ။` | Ask what a friend will eat at the next meal. | `wh_question/my`, example 1 |
| `ဘယ်ကို သွားမလဲ။` | Ask the destination of a friend's planned outing. | `wh_question/my`, example 2 |
| `ကော်ဖီ သောက်မလား။` | Contrast an offer of coffee that permits a yes/no reply. | `yes_no_ka/my`, example 2 |

The build uses the two authored chunks `ဘာ` and `စားမလဲ။`, with the existing
space joiner. It checks this taught order, not all possible conversational orders
or general Burmese word boundaries. Three contextual choices distinguish the
food, destination and coffee-offer intentions. The wording identifies the friend
being addressed and the planned situation, instead of assigning a fixed pronoun
to sentences where the pronoun is omitted.

The source gloss “Where are you going?” is retained unchanged in the core lesson
pack. This new activity explicitly uses that example for a planned destination,
with guidance phrased as “where they will go”. It does not teach where someone
currently lives. The information-question ending and the yes/no ending are
contrasted only in the authored situations, without a universal claim about every
question construction.

## Sources and review limits

References checked on 2026-11-27 (Japan):

- [Pinned bundled source](https://github.com/Celeritas7/Catalyst/blob/ab4a915cd63d4cfdc6454e3577e2d9ad1b28e09e/data/grammar.yaml):
  all three target-language examples above, reused exactly. No new Burmese
  example is imported or generated in this phase.
- [NIU SEAsite, beginning lesson 6 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_6/syntax.htm):
  information questions, the “what” pattern, and future forms in questions.
- [NIU SEAsite, beginning lesson 10 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_10/syntax.htm):
  place-question constructions and the at/from/to markers. This reference
  supports the location/destination distinction, not independent approval of
  the activity.

These sources and the repository pack inform the delivered activity.
Scenarios, English explanations and Marathi guidance are authored
**drafts**, awaiting independent native-speaker review. No private archive,
external lesson text, new audio or pronunciation transcription was imported.

The metadata declares Burmese, Myanmar script, plain familiar register, intended
senses, draft status, the pinned revision and three exact example references.
The source disclosure shows context and provenance in the chosen meaning
language. The inventory checks the metadata and detects changes to the linked
examples. Formal address, wider question-word coverage, other time/aspect forms
and general question-word exceptions remain outside this activity.

## Integration and preservation

Stable activity ID: `my-wh-questions`, linked to `wh_question`. Review tasks use
their own activity IDs even when an option reuses the coffee question from the
preceding activity. One production task and three contextual tasks are added.
Hints/reveals remain assisted practice; immediate retries do not become delayed
independent recall. Writing is self-reviewed. Saving it to the notebook neither
grades nor completes the activity.

All four previous activity objects remain byte-equivalent after JSON
serialization. The 24 concepts, 120 language entries, 218 core examples and
existing Marathi meanings remain unchanged. No schema, review interval or
previous task ID changes. Originals and correction notes remain separate, and
saved attempts retain their source activity and lesson link.

The existing account/language protections continue for notebooks, reviews and
recovery drafts. Legacy activity completion/draft settings keep their existing
storage model; this is not a migration of those settings to new account scopes.
The activity is bundled and needs no paid API or production database change.
An online lesson override may differ from the deliberately pinned activity text.

## Validation

- Focused compiled-UI checks cover both guidance languages, assisted building,
  incorrect/correct context choices, separate review IDs, preservation of the
  preceding activity's settings, notebook deduplication, older originals and
  corrections, and navigation back to `wh_question`.
- A prepared synthetic account reopens with auth/content/network reads failing
  and reviews the planned-destination question. Revealing the answer keeps the
  mistake open and does not increase independent recall, while prior yes/no
  review history remains unchanged.
- Existing permutation and inventory checks cover the new activity. Coverage
  remains 218/218 draft Marathi meanings; Burmese guided activity count is four.
- All 160 tests pass with serial execution, including the existing recovery,
  account isolation, notebook, review, audio and offline-release checks.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `c758a30724c4aab3275b`: 252 files, 11,632,541 bytes.

Visual verification and physical Phase 6F iPad acceptance remain pending. The
most recent managed-browser attempt, during Phase 6J, timed out on attachment;
this phase does not claim a new browser result or reuse an older screenshot as
evidence. Compiled DOM/offline simulations do not establish Home Screen cold
reopen, Files saving, VoiceOver, font rendering or real-device layout behaviour.

After updating, select Burmese and open the new activity from Explore. Build the
food question, select the destination question for an outing, and compare the
coffee offer. Save a personal question and meaning, then revisit its lesson from
My Learning. Keep existing device data and follow the backup-first iPad checklist.

Next bounded content expansion: a sourced contrast between where an action
happens and where someone goes (`မှာ` / `ကို`), using the existing place and
direction lessons. Native-speaker review and physical device acceptance remain
separate gates.
