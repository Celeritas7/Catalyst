# Phase 6L — guided Burmese location and destination

Checkpoint: 2026-11-27 (Japan), based on merged PR #33
(`3ae8aef2705c012da681ff0bf084d9b54ccd10eb`).

## Learner-facing result

With Burmese selected, **At a place or going to it?**
(`क्रियेचे ठिकाण की जाण्याचे ठिकाण?`) appears in Today, Explore and the existing
`place_de_ni` lesson. It follows Situation → Notice → Build → Choose → Use, with
Marathi/English guidance, hints/reveals, adaptive review and explicit notebook
saving. Burmese now has five guided activities; Japanese retains one.

| Exact bundled example | Intended context | Source |
| --- | --- | --- |
| `စာကြည့်တိုက်မှာ စာ ကျက်တယ်။` | The speaker describes studying at the library. | `place_de_ni/my`, example 1 |
| `ရန်ကုန်ကို သွားမယ်။` | The speaker describes a planned trip to Yangon. | `direction_ni_e/my`, example 1 |
| `စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။` | Describe a cat's location in the library. | `place_de_ni/my`, example 2 |

The build uses the authored chunks `စာကြည့်တိုက်မှာ`, `စာ`, `ကျက်တယ်။` and
preserves the source spacing. It checks the taught order without claiming that
these are universal word boundaries. Two contextual marker questions use the
same `မှာ` / `ကို` options but have distinct answers and review IDs. A third
choice extends the location meaning to where something exists.

Guidance keeps the place's role separate from the verb's time/intention. The
studying and travel examples are not a minimal pair: their nouns, verbs and
endings differ. The context supplies the omitted speaker. Marathi guidance
includes both `करतो` and `करते`; the existing core gloss remains unchanged.
The activity mentions that `ကို` also has object/recipient uses, without
teaching those roles here or claiming that the markers are always obligatory.
The notebook's lesson link returns to the primary place lesson, including when
the learner writes about the destination example.

## Sources and review limits

References checked on 2026-11-27 (Japan):

- [Pinned bundled source](https://github.com/Celeritas7/Catalyst/blob/3ae8aef2705c012da681ff0bf084d9b54ccd10eb/data/grammar.yaml):
  all three Burmese examples above, reused exactly. Its object and direction
  entries also document the other uses of `ကို` mentioned in the guidance.
- [NIU SEAsite, beginning lesson 10 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_10/syntax.htm):
  the at/from/to marker table and place-plus-marker constructions, including
  where someone lives or eats. This supports the place distinction; it does
  not supply or independently approve the complete library/Yangon examples.

No external lesson text, private archive material, pronunciation transcription
or new audio is imported. Contexts, marker exercises and English/Marathi
guidance are authored **drafts**, awaiting independent native-speaker review.
The metadata records Burmese, Myanmar script, plain spoken register, intended
senses, draft status, a pinned revision and three exact source references.
The inventory checks reference integrity, not linguistic correctness.

## Integration and preservation

Stable activity ID: `my-location-destination`, primary concept `place_de_ni`.
One production task and three contextual tasks use the existing review engine.
Hints/reveals remain assisted practice. An immediate correction cannot resolve
a mistake as independent delayed recall. Writing remains self-reviewed;
notebook saving neither grades nor completes the activity.

All five previous activity objects are unchanged after JSON serialization.
The 24 core concepts, 120 language entries, 218 examples and existing meanings
are preserved. No task ID, review interval, storage schema or database change.
Original writing and correction notes remain separate. Notebooks, reviews and
recovery drafts keep their existing account/language protections; legacy
activity completion settings retain their existing storage model.

This is bundled content and requires no paid API. Online lesson overrides may
differ from the deliberately pinned activity examples.

## Validation

- Compiled-UI tests cover discovery in Today, Explore and the place lesson;
  both guidance languages; assisted building; incorrect/correct marker choices;
  separate histories for questions that share options; failed notebook writes,
  retained writing, safe retry/deduplication, prior originals/corrections and
  navigation back to the primary lesson.
- A prepared synthetic account reopens with auth/content/network reads failing
  and completes a due destination-marker review. Independent correct recall
  resolves that mistake without changing the location task's record or writing
  a guest record.
- Existing permutation and source/inventory checks include the new activity.
  Coverage remains 218/218 draft Marathi meanings; Burmese activity count is five.
- All 162 tests pass with serial execution, including the existing recovery,
  account isolation, notebook, review, audio and offline-release checks.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `3e47153c995fb9165016`: 252 files, 11,646,561 bytes.

Visual verification and physical Phase 6F iPad acceptance remain pending. The
most recent browser attachment attempt, in Phase 6J, timed out; no infrastructure
recovery has been established and no new browser result is claimed. Compiled
DOM/offline checks do not establish Home Screen cold reopen, Files saving,
VoiceOver, font rendering or real-device layout behaviour.

After updating, select Burmese and open the activity from Explore. Build the
library sentence, choose `မှာ` for studying there and `ကို` for the Yangon trip,
then save a personal sentence and meaning. Revisit the place lesson from My
Learning. Keep existing device data and follow the backup-first iPad checklist.

Native-speaker review of the expanded activity set and physical device
acceptance remain separate gates before claiming reviewed content or iPad
readiness. Further content expansion should remain independently scoped.
