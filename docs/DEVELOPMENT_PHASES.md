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

Initial Phase 3 checkpoint: two guided pilots implemented, Burmese sentence order and Japanese topic transitions. Later Phases 6H–6L add Burmese negation, yes/no questions, what/where questions and location/destination. Available in Today/Explore for the selected target language, with Marathi/English guidance, chunk building, contextual choices, hints, reveals and locally saved self-reviewed writing. See [content provenance and limits](PHASE3_CONTENT.md). All examples and new translations await native-speaker review; other lessons retain the existing flow.

Situation → Notice → Build → Choose → Use, with optional deeper explanations and comparisons. Pilot standalone ちなみに versus ところで plus one sentence-building lesson. Distinguish standalone ところで from verb-past + ところで. Support multiple valid answers and language-specific sentence chunking.

Acceptance: the complete pilot works with available explanation languages; hints and answer reveal are accessible; the source material and any additions have explicit review status.

## 4. Adaptive practice and review

Status: implemented for browser-local use. Due reviews, persistent mistakes, four self-assigned learning states, skill-specific checks and independent-retry protection are available. New records are scoped by target language and session user/guest; historical combined records remain intact. See [scheduling, storage and verification details](PHASE4_REVIEW.md). Cross-device synchronization and automatic free-writing assessment are not included.

Implement needs-revision, known-but-misused, cannot-write, and never-used learning states. Separate understanding, contextual selection, production and retention. Add persistent mistake review and due dates; self-marked learned is not mastery. Scope records by target language and user where appropriate, preserving legacy records.

Acceptance: mistakes affect the relevant skill; delayed reviews become due predictably; retries do not inflate independent mastery; migration retains old history.

## 5. Personal sentences and KG Chart integration

Current direction: Phase 5G provides Burmese pattern practice without paid AI.
The earlier selected-language AI backend is installed but paused; its activation
is deferred. Existing AI history and the personal notebook remain available.

Use known target-language vocabulary with clear support for necessary new words. Remove the multi-language word minimum in the sentence-generation backend as part of this phase, not just in the UI. Store original attempts, corrections and explanations separately. Add a central personal-sentence view and explicit generated/reviewed status. Validate authorization, ownership, quotas and failure handling.

Current acceptance: a Burmese learner can use a compatible learned noun with an
explicit fixed frame, save it to the notebook, reopen it and add separate notes
without a model call. Existing saved sentences remain readable and failures do
not discard writing. The earlier Japanese-only AI acceptance criterion remains
conditional on future paid activation.

## 6. Content expansion, accessibility and offline study

Phase 6A architecture/preservation review is complete against merged PR #18.
See the [offline design](PHASE6A_OFFLINE_ARCHITECTURE.md),
[measured source inventory](phase6a-offline-inventory.json) and
[acceptance matrix](PHASE6_ACCEPTANCE.md). Phase 6B now implements the
[self-contained static build](PHASE6B_STATIC_BUILD.md) at the existing URL.
[Phase 6C](PHASE6C_OFFLINE_DOWNLOADS.md) implements explicit downloads, safe
worker updates and recovery; synthetic Chromium cold reopening is verified.
[Phase 6D](PHASE6D_ACCOUNT_SNAPSHOTS.md) adds prepared account data.
[Phase 6E](PHASE6E_OFFLINE_AUDIO.md) adds optional verified audio packs. Production
audio is unavailable until recordings are published. [Phase 6F](PHASE6F_DEVICE_ACCEPTANCE.md)
has started: verified live release files, corrected header overlap at enlarged
text sizes, and prepared backup-first physical iPad/Android/desktop checks.
A follow-up adds an in-app iPad preparation checklist and a copyable, privacy-limited
status report for versions and readiness. A further backup reliability correction
adds distinct filenames, visible retry guidance and current-record validation on
notebook export. Word-source readiness now rechecks after cancellation, withdraws
missing snapshots, and separates refresh errors from retained or locked saved words.
Recovery round-trip acceptance also corrects repeated history wrapping and
preserves the previous journal before replacement; see the
[recovery checkpoint](PHASE6F_RECOVERY_ROUNDTRIP.md). These corrections do not
certify Files saving or physical device tests.
Physical acceptance remains pending. Synthetic browser results do not prove iPad
Home Screen behavior, actual speech quality or real sign-in round trips.

[Phase 6G](PHASE6G_CONTENT_COVERAGE.md) now adds Explore content coverage and a
reproducible review inventory as the next independent content step. It exposes
translation gaps, preserves repeated sentences with different contexts, and
distinguishes source check marks from documented linguistic review. This is a
coverage/review foundation, not expanded or newly approved lesson content.

[Phase 6H](PHASE6H_BURMESE_NEGATION.md) adds a second Burmese guided activity:
negative statements and their contrast with direct requests. It includes
Marathi/English guidance, authored chunk joining, notebook/review integration,
and explicit source/register/sense metadata. Content remains draft material;
reference checks and automated tests are not native-speaker approval.

[Phase 6I](PHASE6I_MARATHI_MEANINGS.md) fills the 27 recorded Marathi-meaning
gaps, giving all 218 bundled examples a draft Marathi meaning. Separate usage
notes preserve gender, register and context details without putting grammar
explanations into new quiz answers. Existing translations and saved work remain
intact; live content with unknown glosses still shows missing meanings. The next
bounded content expansion is a sourced Burmese yes/no-question guided activity.

[Phase 6J](PHASE6J_BURMESE_QUESTIONS.md) implements that activity with a coffee
offer, a contrasting statement reply and a noun question. Three Burmese guided
activities now reuse the existing notebook and adaptive-review mechanisms.
Its contexts, register, pinned references and bilingual guidance remain drafts.
The next bounded expansion is sourced Burmese what/where questions; physical 6F
acceptance and native-speaker review remain pending.

[Phase 6K](PHASE6K_BURMESE_INFORMATION_QUESTIONS.md) adds guided Burmese
what/where questions about a food choice and a planned destination, with a
yes/no contrast. Four Burmese activities are now available. Existing core
examples, meanings and older activities remain unchanged; all new guidance is
draft content. Next is a sourced action-location/destination contrast using
`မှာ` and `ကို`; linguistic review and physical acceptance remain separate.

[Phase 6L](PHASE6L_BURMESE_LOCATION_DESTINATION.md) adds that contrast with
studying at the library, a planned trip to Yangon and a cat's location. Five
Burmese guided activities now use the existing notebook and review flow.
The new activity reuses three pinned examples with draft bilingual guidance;
all five earlier activity definitions and all 218 core examples remain intact.
Native-speaker review and physical Phase 6F acceptance remain pending.

[Phase 6M](PHASE6M_GUIDED_ACTIVITY_OWNERSHIP.md) separates new guided-activity
steps, saved writing and completion by study account/guest and target language.
Marathi/English writing contexts retain their own intended meanings. Older
device-wide writing stays intact and can be reviewed and explicitly copied;
its completion marks are not silently attributed to the current account.
Recovery exports include the new records. A regression reproduced the prior
account-switch problem; automated and synthetic desktop-browser checks pass.
Its keyboard and screen-reader interaction follow-up is recorded as Phase 6N
below. Physical iPad acceptance and linguistic review stay open.

[Phase 6N](PHASE6N_GUIDED_ACTIVITY_ACCESSIBILITY.md) improves all six guided
activities' keyboard navigation and feedback: title/step/return focus, chunk
selection and removal, stable status regions, question groups, recovery focus
and visible focus outlines. Automated and synthetic desktop checks pass;
physical iPad, actual zoom and VoiceOver acceptance remain open under Phase 6F.

[Phase 6O](PHASE6O_JAPANESE_FORMULA_REVIEW.md) reads four selected private
Japanese source documents and maps 16 formula families to existing lessons.
The [structured map](japanese-formula-map.json) records attachment/conjugation,
meaning, limits, example needs, Marathi support and unresolved corrections.
This is a bounded source-review checkpoint, not a full-archive import or a new
app lesson. Private originals and personal examples remain outside the repository.

Next bounded content step, Phase 6P: one draft Japanese hearing activity
contrasting 聞こえる with 聞ける, with contextual examples, Marathi/English
explanations and precise form guidance. Review the existing `ability` summary
as part of that pilot. Seeing follows separately; conditional and other complex
tables need further source correction before implementation. See the Phase 6O
implementation contract for scope, checks and remaining review gates.

Continue source review and deduplication; keep provenance, actual language, script, register, sense and review status. Do not import placeholders or mislabeled template content into normal lessons. Extend reviewed coverage gradually. Download app dependencies and selected lesson/audio packs for offline reopening and practice; synchronize safely when online. Include account-scoped learned-word snapshots for the local pattern bank. Paid AI activation is not a prerequisite.

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

### Phase 5E — backend readiness and first-install rehearsal

Read-only inspection confirmed compatible KG source columns, RLS flags, required
grants, the vocabulary translation relationship and allow-list execution. Catalyst
tables/RPC and the sentence function were absent in the configured Technical project
at that phase's audit.
Prepared explicit grammar content grants, a read-only preflight and a reproducible
atomic first-install bundle. It rejects any existing Catalyst objects and starts
with the generation limit at zero.

Full installation tests cover broad and explicit-only default privileges, rollback,
preservation and denied writes. A disposable PostgreSQL 17.6 cluster verified the
quota under 20 distinct simultaneous sessions, including legacy usage, independent
users and non-refundable reservations. Hosted staging, actual Auth/Edge behavior,
live-model validation and physical browser/iPad testing remain separate gates.
See [Phase 5E](PHASE5E_BACKEND_READINESS.md). No production writes or deployment
occurred during 5E. The later production checkpoint is recorded below.

### Phase 5F — paused backend deployed

On 2026-11-24 (Japan), the owner completed a fresh backup and installed the guarded
SQL bundle. Verified all five tables, 24 concepts, 120 entries, 218 examples,
expected grants/own-user policies and the private quota function. Generation is
paused at zero requests per day.

With explicit owner approval, deployed `catalyst-sentence` version 1 from the merged
source and verified exact deployed-file contents. Live GET, browser CORS preflight,
missing/invalid-token rejection and unsupported-method checks passed. GET reports
API v2 and incomplete model configuration. Zero generated rows and quota ledger
rows remained after testing; no paid model call was made.

See [Phase 5F](PHASE5F_PAUSED_DEPLOYMENT.md) for the historical deployment and the
later configuration checkpoint. Paid activation and its remaining acceptance are
deferred in favour of Phase 5G. This does not complete notebook sync or offline startup.

### Phase 5G — Burmese practice without a paid API

Implemented a bundled, versioned bank for eating, drinking and going to a place.
Only exact native/English noun pairs from the signed-in learner's Burmese KG
progress are offered. Food and drinks have compatible current dictionary entries;
the place pattern waits for a compatible standalone place word to exist and be
learned. One matching noun is sufficient. Pronouns and verbs are labelled lesson
support, with masculine/feminine forms, Marathi/English meanings and approximate
Devanagari readings. Content still awaits native-speaker review.

Pattern saves reuse the existing notebook format with distinct source labels;
original writing, corrections, export/import and duplicate protection are retained.
Earlier AI history remains readable and flaggable, while new AI controls and their
capability requests have been removed from the page. No production data, SQL,
Edge Function or quota changes are part of this phase.

See [Phase 5G](PHASE5G_PATTERN_PRACTICE.md) for verification and post-merge checks.
Next: Phase 6A offline architecture and preservation review, then app/dependency
caching and account-scoped learned-word downloads, followed by physical iPad
Airplane-mode acceptance. Current KG progress loading still requires a connection.

### Phase 6A–6B — offline architecture and local app dependencies

The preservation architecture and acceptance matrix are in
[Phase 6A](PHASE6A_OFFLINE_ARCHITECTURE.md) and [Phase 6 acceptance](PHASE6_ACCEPTANCE.md).
[Phase 6B](PHASE6B_STATIC_BUILD.md) extracts the unchanged JSX, compiles the app
and styles, packages exact runtime dependencies/fonts/converters, and inventories
the static release with hashes and sizes. GitHub Pages continues to publish the
main branch at its root, keeping the existing URL and storage keys.

Next is 6C for explicit downloads, safe updates and recovery, then 6D account
snapshots, 6E available audio and 6F physical iPad/Android acceptance. No offline
readiness or completed live OAuth acceptance is claimed by the static build.
