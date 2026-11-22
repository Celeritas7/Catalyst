# Catalyst learning upgrade

Upgrade the existing GitHub Pages app incrementally. Preserve concept IDs, existing local settings and practice history, Supabase sessions, saved sentences and account restrictions. Each phase has its own reviewable change and validation; completion of one phase does not imply the later capabilities exist.

## 1. Navigation and study dashboard

Status: deployed (PR #1).

- Today: continue an unfinished lesson, daily answer count and practice entry.
- Explore: existing searchable grouped lessons and tricky-match filter.
- Practice: existing meaning, forms and connections modes.
- My Learning: existing per-concept attempts and self-marked learned status.
- Persistent, accessible mobile navigation; existing concept URLs remain valid.
- Keep local progress keys and existing account/sentence flows unchanged.

Acceptance: all four screens work on mobile and desktop; reload retains history; direct lesson links and browser Back work; authentication callback hashes are not rewritten by initialization; existing question checks pass.

## 2. Language preferences and content contract

Status: preference foundation implemented. Target, grammar reference, meaning language, interface language and optional comparisons are independent. Legacy settings and progress are retained. Quizzes focus on one target; additional comparisons do not silently expand that target. No-reference mode is supported.

Current coverage: five bundled target/reference languages; Marathi and English meanings; English interface and grammar explanations. The interface selector explicitly lists only English. This is not a claim of complete translation into every language. English sentence support is optional and off by default. Marathi meanings remain drafts. New content without a matching translation is skipped by meaning quizzes and labelled unavailable in lesson views.

Audio controls in practice, Burmese-app rating integration and removal of the backend's multilingual vocabulary minimum remain Phase 5 work. Basic lessons and quizzes are independent of that generator. Shared legacy lesson progress is retained and labelled as spanning languages; finer per-language skill tracking belongs to Phase 4.


Separate target, explanation, interface and optional comparison languages. Migrate legacy anchor/show preferences without dropping progress. Make the data model extensible to additional language codes and scripts, including right-to-left layouts. Offer only available language coverage; show explicit fallback when explanations are missing. Do not claim that switching the anchor translates English notes.

Acceptance: changing explanation language preserves target-language progress; a learner can study one language independently; unsupported combinations have honest fallbacks. Preserve existing access restrictions while designing broader audience support.

## 3. Complete lesson activities

Status: two guided pilots implemented: Burmese sentence order and Japanese topic transitions. Available in Today/Explore for the selected target language, with Marathi/English guidance, chunk building, contextual choices, hints, reveals and locally saved self-reviewed writing. See [content provenance and limits](PHASE3_CONTENT.md). All examples and new translations await native-speaker review; other lessons retain the existing flow.

Situation → Notice → Build → Choose → Use, with optional deeper explanations and comparisons. Pilot standalone ちなみに versus ところで plus one sentence-building lesson. Distinguish standalone ところで from verb-past + ところで. Support multiple valid answers and language-specific sentence chunking.

Acceptance: the complete pilot works with available explanation languages; hints and answer reveal are accessible; the source material and any additions have explicit review status.

## 4. Adaptive practice and review

Status: implemented for browser-local use. Due reviews, persistent mistakes, four self-assigned learning states, skill-specific checks and independent-retry protection are available. New records are scoped by target language and session user/guest; historical combined records remain intact. See [scheduling, storage and verification details](PHASE4_REVIEW.md). Cross-device synchronization and automatic free-writing assessment are not included.

Implement needs-revision, known-but-misused, cannot-write, and never-used learning states. Separate understanding, contextual selection, production and retention. Add persistent mistake review and due dates; self-marked learned is not mastery. Scope records by target language and user where appropriate, preserving legacy records.

Acceptance: mistakes affect the relevant skill; delayed reviews become due predictably; retries do not inflate independent mastery; migration retains old history.

## 5. Personal sentences and KG Chart integration

Use known target-language vocabulary with clear support for necessary new words. Remove the multi-language word minimum in the sentence-generation backend as part of this phase, not just in the UI. Store original attempts, corrections and explanations separately. Add a central personal-sentence view and explicit generated/reviewed status. Validate authorization, ownership, quotas and failure handling.

Acceptance: a Japanese-only learner can generate a Japanese lesson example without Burmese/Chinese progress; existing saved sentences remain readable; failed requests do not discard work.

## 6. Content expansion, accessibility and offline study

Continue source review and deduplication; keep provenance, actual language, script, register, sense and review status. Do not import placeholders or mislabeled template content into normal lessons. Extend reviewed coverage gradually. Download app dependencies and selected lesson/audio packs for offline reopening and practice; synchronize safely when online. New AI generation remains online.

Acceptance: downloaded lessons reopen without network; updates preserve progress; missing audio and unreviewed content are clearly identified; validate phone/tablet layouts, fonts, keyboard navigation and assistive labels.

## Source review boundaries

The Language_package inventory covered approximately 3,956 files outside quarantine. Fifteen core files were examined; larger files were sampled. The full archive has not been read or linguistically validated. It is private source material, not an authorization to publish those files. Relevant findings: Marathi-supported Japanese comparisons, supporting-word sentence chunks, separate reading/recall directions, and guidance to test sample layouts before expanding. The new conjunction list includes ところで. Chinese-labelled files contain Japanese template material, so filename alone cannot identify content language.

### Phase 5B — personal sentence notebook

Implemented a device-local notebook in My Learning. Learners choose an optional
lesson, preserve an original sentence and their intended meaning, then append
correction notes without replacing the original. Meaning input follows the chosen
meaning language. Entries are separated by signed-in account (or guest) and target
language; guest and older guided-activity drafts are not silently reassigned.
JSON export lets learners retain a copy. Corrupt/unsupported stored data blocks
writes rather than resetting history; write failures retain the current input.

This is user-entered writing and self-review, not AI correction, validated course
content, cloud sync or a vocabulary database. It does not change ratings, review
intervals, shared lex tables or Akatsuki contracts. Existing guided drafts and
AI-generated sentences remain in their existing locations. Full Phase 5 backend
and personal-sentence integration are still pending.

Source review remains partial. A fresh folder check confirmed separate Burmese
script, vocabulary, grammar, reading, listening and practice sections. This change
publishes no private source content and does not claim those sections were fully
read or validated.

### Phase 5C — restore notebooks and keep guided writing

Implemented merge-only JSON import under My Learning → My sentence notebook →
Import / restore notebook. File selection previews the destination, additions,
missing correction notes and conflicting versions before an explicit import.
The existing version 1 exports remain compatible. A wrong target language,
invalid/unsupported schema, duplicate IDs, oversized input or unreadable local
notebook prevents the write. Files are read locally, not sent to a server.

Existing originals and correction notes are retained. Matching records acquire
only missing notes. Conflicting originals/meanings are kept as separate copies;
re-importing the same content is idempotent, including those copies. A changed
notebook since preview requires reviewing updated counts before import. Failed
storage writes retain the preview for retry. Account/target switches invalidate
pending file reads rather than transferring them to another notebook.

Guided activities now offer Save to notebook in Use it yourself, with an optional
intended meaning in the selected meaning language. The original writing carries
its activity ID and lesson link (where one exists). Repeated saves of the same
activity writing/meaning avoid duplicates; changed writing creates a new attempt.
This action does not grade, schedule reviews or complete the activity. Legacy
activity drafts remain in place and are copied only by an explicit learner action.

Validation: notebook merge/validation/failed-write/account-language/legacy-export
and guided-save tests, existing regression suite, and application JSX compilation.
Browser QA confirmed restoring a version 1 export with a Marathi meaning and a
correction, repeated-import detection, guided save/repeated-save detection,
source/lesson display, reload persistence and target-language isolation. Physical
iPad file-picker/download testing remains pending. This is still device-local
storage, not cloud synchronization or offline application startup support.

### Phase 5D — selected-language generation

Prepared a v2 sentence API and matching lesson UI. It reads only the selected
target's eligible KG Chart vocabulary, requests the chosen Marathi/English meaning,
and retains older multilingual saved rows. API version checks prevent calling the
old three-language workflow. Account/target changes discard late responses; failed
flags retain the visible sentence.

An additive migration adds nullable language metadata and a private daily request
ledger with a service-role-only atomic reservation RPC. Browser access is restricted
to own-row reading/deletion and the flag column. Failed paid attempts count toward
the per-user UTC-day request limit; preflight failures do not.

See [Phase 5D](PHASE5D_GENERATION.md) for tests and deployment gates. Production SQL,
Edge Function deployment, live model validation, physical browser/iPad acceptance,
notebook cloud synchronization and a central generated-sentence view remain pending.
The user's desktop notebook refresh and duplicate-prevention checks passed before
this phase; the separate iPad notebook file test remains pending.
