# Phase 6 — offline acceptance and preservation matrix

Created with Phase 6A on 2026-11-24 (Japan). Implementation evidence is recorded
in the checkpoints below; physical device acceptance remains pending. Source
inspection and the previous Phase 5G tests do not count as offline device
acceptance. This is the implementation checklist for the
[architecture](PHASE6A_OFFLINE_ARCHITECTURE.md).

## Baseline and evidence

Use synthetic fixtures for automated tests. Before live acceptance, record the
app URL/path, source/release ID, app/worker IDs, browser/OS, Home Screen versus
browser-tab mode, selected target/reference/meaning and account/guest mode.
Keep the real learner's notebook export and future recovery file locally; publish
only counts and pass/fail evidence, never sentences, tokens or account identifiers.

Record counts/hashes for legacy settings/history/guided drafts, current-account
and guest reviews, notebooks/corrections, and downloaded packs. Compare the same
records after each operation. Test a sibling app cache/key sentinel in a synthetic
same-origin environment. Never inspect or delete real sibling data for a test.

| ID | Phase | Scenario | Required evidence |
| --- | --- | --- | --- |
| B1 | 6B | Fresh build with unpkg, Tailwind CDN, Google Fonts and remote converters blocked | Built UI renders with readable scripts; no external bootstrap request; exact assets/versions match manifest |
| B2 | 6B | Current source versus generated release | Existing tests plus built-output checks pass; generation is reproducible and stale output is detected |
| B3 | 6B | OAuth callback and existing deep links | SDK consumes callback before normal routing; token/code query data absent from cache/log/export; `#verb-final` and Back still work |
| B4 | 6B | Existing saved data loaded by the built app | Same originals, notes, due dates, legacy totals, settings and pattern source labels; no migration/reset |
| C1 | 6C | First explicit download and control activation | Progress/bytes shown; readiness only after required files verify and worker/app IDs agree |
| C2 | 6C | Cold offline startup | Close all Catalyst windows, disable network and reopen the exact installed app; built-in lessons, navigation and public practice work without a warm HTTP cache |
| C3 | 6C | Interrupt install, foreground later and resume | Verified files retained; incomplete files retried; no false Ready; prior release remains usable |
| C4 | 6C | Low storage, failed cache write or missing required file | Visible failure; originals and previous complete release unchanged; partial candidate not activated |
| C5 | 6C | In-scope page fetches a sibling path/API/unknown file | No broad HTML fallback, mutation replay or auth/REST cache entry; sibling sentinel unchanged |
| C6 | 6C | Update while typing and while a second tab has unsaved notes | No forced reload; new release waits; all drafts recover after an accepted update |
| C7 | 6C | New worker fails install, then active-release rollback rehearsal | Old complete release survives failed install; forward recovery worker restores compatible shell without deleting progress |
| C8 | 6C | Unsupported/corrupt settings, review or notebook data | Original raw bytes preserved, writes blocked with recovery path; no empty-state overwrite |
| C9 | 6C | Full recovery and legacy notebook import | Preview shows correct destination/counts; merge preserves newer/conflicting history; repeated import is idempotent; no credentials or other accounts exported |
| C10 | 6C | Missing cache entries after eviction; worker present but asset absent | Readiness is withdrawn or repair requested; no false fully downloaded badge; no automatic learner-data reset |
| D1 | 6D | Prepared account; access token expires while offline | That owner's local study/notebook/review remains available with offline label; no guest reassignment or fabricated session |
| D2 | 6D | No prepared owner or explicit sign-out | Public/guest path available; previous owner's snapshots hidden; writes cannot target that owner |
| D3 | 6D | Account A fetch finishes after switching to B | Late result ignored; no A words, ratings, drafts or notebook content appears under B |
| D4 | 6D | Network failure versus authoritative source denial | Failure keeps last complete snapshot dated and stale; denial locks that source; neither produces zero-known-word claims or deletes writing |
| D5 | 6D | Reconnect with changed source permissions/data | Real session and current permissions checked; same-owner complete replacement; no source/target mixing |
| D6 | 6D | Download/resume after account or language change | Job stays bound to original owner/target and cannot activate in another scope |
| D7 | 6D | Own progress beyond one server page, duplicate answers, empty compatible set | Complete paginated eligibility preserved; retry duplicates do not create learned words; empty is distinct from failure |
| E1 | 6E | Download available selected-language recorded clips | Counts, bytes, language, voice and manifest agree; normal/slow playback works with network fully disabled |
| E2 | 6E | Missing manifest/file, zero bytes, bad MIME, HTTP/auth/network failure | Correct actionable state; no corrupted success entry or silent placeholder; text stays available |
| E3 | 6E | Pause, force-close, reopen and resume media | Previously verified files reused; totals do not double-count shared assets; incomplete file retried |
| E4 | 6E | Device speech without a verified local clip | Label is device voice/availability, never a downloaded-audio claim; actual offline result recorded per device |
| F1 | 6F | iPad Safari and Home Screen checked separately | Origin/container and OS recorded; download in the actual study instance; notebook export/import checked in Files |
| F2 | 6F | iPad café-style use | After download, Airplane mode + cold reopen, lesson/practice, notebook save, close/reopen, and later reconnect all preserve records |
| F3 | 6F | iPad suspension or process termination while writing/downloading | Saved records survive; draft recovery and resume are honest; no requirement for continuous background execution |
| F4 | 6F | Mobile/tablet accessibility | Burmese/Devanagari/CJK shaping, 200% zoom, portrait/landscape, keyboard focus, labels, touch targets and status announcements checked |
| F5 | 6F | Android Home Screen and desktop fresh profile | Same cold-start, update, account isolation and restore scenarios pass; desktop-only success is not counted as iPad evidence |

## Completion record

For each check, record **PASS / FAIL / BLOCKED / NOT RUN**, build IDs, device,
date and a minimal observation. A failed optional audio check may leave text-only
study ready if the UI says so. A failed startup, ownership or preservation check
blocks the corresponding offline-ready claim.

Do not clear website data, uninstall the existing Home Screen app, disable RLS,
extend token expiry, enable paid generation or change production source records
to make a check pass. Fresh synthetic profiles can be used for repeatable tests;
the owner's existing browser/PWA is always treated as persistent learner data.

## Phase 6E implementation checkpoint — 2026-11-25

See [the 6E report](PHASE6E_OFFLINE_AUDIO.md) for inventory, storage and playback
contracts. Release `6e993fd5a1ca723dd86f`; 118 automated tests pass.

| Check | Status | Evidence and remaining boundary |
| --- | --- | --- |
| E1 | PARTIAL | Synthetic Chromium: explicit 6,572-byte tone download, 1/50 coverage, voice/size/progress, normal 1× and slow 0.7× decoded and ended; repeated after tab close, server stop and cached reopen. Production speech BLOCKED: zero published objects and all five manifests missing. Physical devices NOT RUN |
| E2 | PASS (automated) | Missing manifest/file, wrong MIME/checksum, empty file, HTTP/auth/network error and quota failure never activate bad audio; app/text remain ready; active old audio retained |
| E3 | PASS (automated), PARTIAL (Chromium) | Restarted manager reuses verified files; interrupted download/removal resumes; byte deduplication, eviction repair and selective removal verified. Chromium cold tab reopening passes; OS suspension/process termination NOT RUN |
| E4 | PARTIAL | UI distinguishes saved recordings, online clips and device voices; normal/slow use the same saved bytes. Actual native device speech availability NOT RUN |
| F1–F5 | NOT RUN | Physical iPad/Android/desktop acceptance remains next. Text-only checks can proceed while real recorded audio is unavailable |

No production writes, paid generation, actual sign-in or learner records were
used. The tone is a test fixture, not language pronunciation evidence.

## Phase 6D implementation checkpoint — 2026-11-25

See [the 6D report](PHASE6D_ACCOUNT_SNAPSHOTS.md) for source contracts and limits.
Release `65b6ac072f218d5d9153`; 104 automated tests pass.

| Check | Status | Evidence and remaining boundary |
| --- | --- | --- |
| D1 | PASS (synthetic automated + Chromium) | Prepared owner survives offline reload; pattern and original writing save to the same notebook; cached shell reopens after preview server stops |
| D2 | PASS (automated) | No owner preparation means no private offline access; sign-out and sibling session removal hide snapshots; server sign-out failure cannot re-enable preparation |
| D3 | PASS (automated + Chromium) | Late A verification/download ignored after B; B has no A notebook; A’s originals remain on switching back |
| D4 | PASS (automated) | Network/partial reads keep dated complete snapshots; denial locks the source persistently; concurrent locks defeat stale fallback |
| D5 | PARTIAL | Auth and permission changes tested with fixtures; real KG downloads blocked because access/visibility endpoints are missing; restricted profiles unsupported |
| D6 | PASS (automated) | Cancellation and account/target tickets discard incomplete jobs; completed sources retained, interrupted source restarts |
| D7 | PASS (automated) | 1,001-row complete reads; duplicate answer IDs cannot create eligibility; empty and failed sources are distinct |
| E1–F5 | NOT RUN | Audio packs and physical iPad/Android acceptance remain future phases |

No production writes, real login or real user data were used for acceptance.

## Phase 6C implementation checkpoint — 2026-11-25

See [the 6C report](PHASE6C_OFFLINE_DOWNLOADS.md) for build IDs and exact fixtures.
Final release: `5b8d25886cb7ce84fb0c`; 85 automated tests pass.

| Check | Status | Evidence and remaining boundary |
| --- | --- | --- |
| C1 | PASS (automated + Chromium) | Explicit 252-file download, full verification and matching app/worker readiness |
| C2 | PARTIAL | Closed all app tabs, stopped preview server, reopened cached app and public quiz; physical Airplane mode and full browser-profile restart still pending |
| C3 | PASS (automated + Chromium) | Pause at 34 files, retained files reused on resume; simulated process restart resumes persisted download metadata |
| C4 | PASS (automated) | Cache/metadata quota, wrong content, HTTP/network and atomic-publication failures retain old active release and sibling sentinel |
| C5 | PASS (automated) | Exact-scope GET allowlist; query/auth/API/mutations/siblings excluded; unknown asset is not HTML |
| C6 | PASS (automated + Chromium) | Second-tab draft blocks apply; saved drafts recover after accepted update; clean-tab freeze, no controllerchange reload; import-preview guards implemented |
| C7 | PARTIAL | Invalid worker fixture preserves active shell; compatible forward recovery build and retained-asset promotion verified automatically; live device rollback rehearsal pending |
| C8 | PASS (automated) | Raw settings/notebook/review preservation, visible settings/draft failures and recovery route |
| C9 | PASS (automated) | Current/guest/device scope, merge conflicts, same-file idempotence, stale preview and partial-write journal; physical Files export/import pending |
| C10 | PASS (automated) | Cache eviction withdraws readiness, requests repair and resumes missing file; browser/OS eviction not induced |
| D1–F5 | NOT RUN | Account snapshots, recorded-audio packs and physical iPad/Android acceptance remain future phases |

This checkpoint does not approve deployment, prove offline account identity, or
claim physical iPad acceptance. No real learner records were used as fixtures.

## Phase 6B implementation checkpoint — 2026-11-24

See [the 6B report](PHASE6B_STATIC_BUILD.md) for the exact build and test boundaries.

| Check | Status | Evidence |
| --- | --- | --- |
| B1 | PASS (automated + Chromium) | Compiled app loads under `/Catalyst/` with external connections blocked; all bootstrap assets are local; desktop/390px language rendering checked |
| B2 | PASS | Deterministic rebuild, full hashes/sizes/graph, deliberate stale-output refusal, existing tests run against compiled app |
| B3 | PARTIAL | Synthetic hash/query callback reaches SDK initialization intact; actual SDK guest startup, deep link and Back pass; real Google round trip not run |
| B4 | PASS (synthetic fixtures) | Original, corrections, due dates, legacy practice/drafts and account isolation retained across compiled-app reloads; browser notebook/correction reload checked |
| C1–F5 | NOT RUN | No service worker/download/account snapshot/audio pack or physical device offline acceptance in 6B |

These are build-foundation results, not a claim that the application can reopen
offline. Production records and real device storage were not used as test fixtures.
