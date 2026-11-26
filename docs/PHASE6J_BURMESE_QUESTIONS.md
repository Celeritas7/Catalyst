# Phase 6J — guided Burmese yes/no questions

Checkpoint: 2026-11-27 (Japan), based on merged PR #31
(`e329e2d1f0eb14f0fe90332d2e7c2700ed3f1ab2`).

## Learner-facing result

With Burmese selected, Today and Explore offer **Ask a yes/no question**
(`हो किंवा नाही असे उत्तर येणारा प्रश्न विचारा` with Marathi meanings).
The same activity appears in the existing `yes_no_ka` lesson. Its five steps are
situation, notice, build, choose by intention, and personal writing.

| Form | Intended use in this activity | Provenance / review |
| --- | --- | --- |
| `ကော်ဖီ သောက်မလား။` | Offer coffee to a friend; “Will you have coffee?” | Exact bundled `yes_no_ka/my` example 2; source remains an unchecked draft. |
| `ကော်ဖီ သောက်မယ်။` | Listener replies “I'll have coffee.” | Authored application of the future statement pattern; draft. |
| `ကျောင်းသားလား။` | Ask a male addressee “Are you a student?” | Exact bundled `yes_no_ka/my` example 1; context and guidance are authored drafts. |

The scenarios make the speaker/listener explicit. The guidance explains that
the omitted pronoun is recovered from the conversation, rather than presenting
either sentence as universally meaning “I” or “you”. The build uses two authored
chunks, `ကော်ဖီ` and `သောက်မလား။`, joined with the existing default space.
It keeps the verb and question ending together; the buttons do not claim to
identify general Burmese word boundaries. Three contextual checks distinguish
the offer, the reply and the noun question. One production task and three
contextual tasks join adaptive review.

Burmese now has three guided activities; Japanese retains one. The core lesson
pack still has 24 concepts, 120 language entries and 218 example rows, all with
draft Marathi meanings available. No original lesson/gloss, meaning translation,
legacy activity definition or native-speaker approval flag was changed.

## References and review limits

References checked on 2026-11-27 (Japan):

- [Pinned repository lesson pack](https://github.com/Celeritas7/Catalyst/blob/e329e2d1f0eb14f0fe90332d2e7c2700ed3f1ab2/data/grammar.yaml):
  the two existing questions and their source lesson context.
- [NIU SEAsite, beginning lesson 3 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_3/syntax.htm):
  yes/no questions with a noun followed by `လား`.
- [NIU SEAsite, beginning lesson 6 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_6/syntax.htm):
  the future marker in questions, the future statement ending, and information
  questions ending in `လဲ`.
- [NIU SEAsite, beginning lesson 5 syntax](https://seasite.niu.edu/Burmese/Beginning/Blesson_5/syntax.htm):
  position of the negative prefix and other verb-question forms.

The sources inform the pattern; scenarios, statement reply, Marathi/English
guidance and review prompts are authored material. No external lesson was copied,
and no recording, transcription or private source file was added. References do
not establish native-speaker approval. The activity and its translations are
explicitly labelled **drafts** in the UI and metadata.

Metadata declares Burmese, Myanmar script, plain familiar conversation, the
three intended senses, draft status, pinned source revision and two exact
example references. The disclosure presents usage/context and provenance in the
selected meaning language. The inventory validates these and detects source
drift. This is not a complete treatment of polite address, gender-neutral student
terms, all question endings or negative answers. The future/intention marker
after the verb is distinguished from the negative prefix before a verb;
learners are not told to append `လား` to every statement.

## Preservation and integration

The stable ID is `my-yes-no`, linked to `yes_no_ka`. Existing activity, review,
notebook and recovery mechanisms are reused. No schema, storage key, review
interval or previous task ID changes. Personal attempts retain their activity ID
and source-lesson link; corrections remain separate from originals. Explicit
notebook saving neither grades nor completes the activity.

Legacy activity completion/draft settings retain their existing storage model;
this phase does not claim to migrate all activity settings to account scopes.
Notebook/review writes and recovery drafts use the current account/language
protections. Meaning/target changes reset the active view as before; reopening
the activity resumes its saved step without rewriting review history.

The activity is bundled and requires no paid API, SQL migration or production
database write. Online lesson overrides can differ; this activity retains its
pinned draft examples. The normal app update includes it in the verified offline
asset bundle.

## Validation

- New compiled-UI checks cover Explore discovery, Marathi/English guidance,
  target switching, incorrect/correct builds, offer/reply/noun choices, canonical
  answers, retry accounting and preservation of older activity settings.
- A prepared synthetic account reopens with content/auth/network reads failing,
  resumes unfinished question text and its Marathi meaning, survives a failed
  notebook write, retries and deduplicates, and preserves the older original and
  separate correction. Its saved source link returns to `yes_no_ka`.
- A due contextual review uses the new prompt/answer, records delayed correct
  recall and leaves an older activity's review record intact.
- Permutation and content-inventory checks include the new activity. A direct
  comparison with the merged base verifies that all three older activity objects
  are unchanged.
- All 158 tests pass with serial execution, including the earlier recovery,
  account isolation, lesson, review, audio and offline-release checks.
- `check:app`, `check:content`, `check:build` and `git diff --check` pass.
- Release `030777bc8214a9bfc3ce`: 252 files, 11,620,761 bytes.

The managed preview started with a synthetic account/backend and external
requests blocked. Browser attachment timed out before inspection, so visual QA
is unverified. No screenshot or physical iPad result is claimed. Phase 6F Files
saving, Home Screen cold reopen, Airplane-mode, VoiceOver, fonts and layout
acceptance remain pending. Compiled offline fixtures do not certify those
real-device behaviours.

After the update, select Burmese and open Explore: there should be three guided
activities. Open the question activity, build the coffee question, choose the
host's question and listener's reply, then save a personal attempt and revisit
its lesson from My Learning. Retain the backup-first iPad checklist and existing
device data.

Next bounded content expansion: sourced Burmese what/where questions with
explicit question-word and `လဲ` context. Native-speaker review and physical
device acceptance remain separate gates.
