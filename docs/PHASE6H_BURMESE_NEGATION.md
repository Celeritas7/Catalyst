# Phase 6H — guided Burmese negation

Checkpoint: 2026-11-27 (Japan), based on merged PR #29
(`262c47cc18d1f0c98fabeea980bf2e65b5700eb3`).

## Learner-facing result

With Burmese selected, Today and Explore now offer **Say what you will not do**
(`काय करणार नाही ते सांगा` with Marathi meanings). It also appears inside the
existing negation lesson. The five steps cover a situation, noticing the form,
building a sentence, choosing by intention, and writing a personal attempt.

The main scenario is a reply about tomorrow's outing: `မသွားဘူး။` is taught with
the contextual meaning “I won't go”. A contrasting direct request uses
`မသွားနဲ့။`. A third choice reuses the existing eating-habit example
`အသား မစားဘူး။`. The prompts distinguish these intentions instead of grading an
isolated fragment as having only one interpretation. The guidance explicitly
avoids treating `ဘူး` as a future-tense marker.

The activity includes Marathi/English guidance, hint/reveal, separate production
and contextual review checks, self-reviewed writing, and the existing explicit
save-to-notebook action. Saving does not grade or complete the activity.
Burmese now has two guided activities; Japanese retains one. The core lesson
pack still has 24 concepts, 120 language entries and 218 example rows. The 27
Marathi-meaning gaps identified in 6G are unchanged.

## Sources and review limits

References checked on 2026-11-27 (Japan):

- [Pinned repository source](https://github.com/Celeritas7/Catalyst/blob/262c47cc18d1f0c98fabeea980bf2e65b5700eb3/data/grammar.yaml):
  both negative statements reuse `negation/my` examples 2 and 1 respectively;
  the existing source entries are unchecked drafts.
- [NIU SEAsite, beginning lesson 5 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_5/syntax.htm):
  negative statements and their contrast with affirmative endings.
- [NIU SEAsite, beginning lesson 2 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_2/syntax.htm):
  negative requests and the politeness particle. The request with `သွား` is an
  authored application of that pattern, not a copied source example.
- [Matti Miestamo, WALS chapter 113, example 5](https://wals.info/chapter/113):
  the relationship between Burmese negative forms and affirmative time/aspect
  distinctions, supporting the explicit contextual treatment here.

The activity's structured metadata records the declared target, Myanmar script,
plain spoken register, intended senses, pinned example references and draft
status. Usage/context and provenance appear in its source disclosure in the
selected meaning language. These references support the teaching pattern; they
do not constitute native-speaker approval of the activity, Marathi guidance or
every new contextual example. No private source archive or external lesson text
was imported wholesale. No new pronunciation transcription or recording is added.

## Implementation and preservation

The new stable activity ID is `my-negation`, linked to existing concept
`negation`. It creates one production review task and three contextual tasks.
Existing activity/task IDs, notebook schema, drafts, legacy completion settings
and scheduling rules remain unchanged. Notebook entries retain `activityId` and
the original lesson link; corrections remain separate from originals.

The builder explicitly uses `joiner: ''` for the three authored grammar pieces
`မ`, `သွား`, `ဘူး။`. A shared assembler is used by activity answers, recorded
responses and adaptive reviews. Existing pilots retain the default space joiner.
Correct/revealed builds display the joined sentence, so the exercise's button
spacing is not presented as normal word spacing. The deeper-explanation heading
can be authored per activity; the Japanese pilot keeps its existing heading.

`npm run check:content` now also validates guided-activity bilingual coverage,
accepted permutations/choices, joining rules, source links, draft metadata and
the exact referenced bundled examples. The inventory includes all three guided
activities and their source links; older pilots have no retroactively invented
structured metadata. A bare change to `reviewStatus: approved` is rejected until
a documented review workflow is implemented.

This is bundled content and local interaction work. It needs no SQL migration,
database write, paid model call or new account permission. A live online content
override can still differ from the bundled examples; the pilot deliberately
retains its pinned draft examples rather than silently adopting an override.

## Validation

- 150 tests pass with serial execution. Existing pilot permutation checks now
  include the new activity; joining tests preserve both older pilots' outputs.
- New compiled-UI checks cover wrong-then-correct builds, statement/request
  choices, retained mistake/retry state, exact joined responses, notebook write
  failure/retry/deduplication, retained older originals/corrections, reload and
  source-lesson navigation, independent delayed recall, and assisted reveals.
- A prepared synthetic account reopens the compiled UI with content/auth reads
  failing and saves the activity to its own notebook. This is simulated offline
  integration, not a new service-worker cold-start or physical iPad result.
- Inventory tests reject changed source references, missing Marathi guidance,
  invalid choices/orders/joiners and unsupported approval claims.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `79640640b7d2a03d4bb3`: 252 files, 11,603,101 bytes.
- Managed preview ran with a synthetic account/backend and external requests
  blocked. The browser timed out while enabling the page, so visual verification
  is unconfirmed. Physical 6F Files, Home Screen, Airplane-mode, VoiceOver and
  real-device font/layout acceptance remains pending.

After deployment, choose Burmese, open Explore, and confirm two guided
activities. Open the new activity, build the three pieces, and check that the
accepted sentence is joined. Try both statement/request choices, then save an
attempt and open it in My Learning. Use the existing backup-first iPad checklist
before testing offline; do not clear website data.

Next bounded content work can address the 27 recorded meaning gaps, followed by
another sourced activity batch. Native-speaker review and physical 6F acceptance
remain separate gates, not implied by a merge or passing automated tests.
