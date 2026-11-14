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
