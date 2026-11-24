# Phase 6C — verified offline app downloads and writing recovery

Implemented from merged Phase 6B (`9b4bf97`, PR #20), 2026-11-25 (Japan).
Release **`5b8d25886cb7ce84fb0c`** contains **252 required files / 11,506,045 bytes**
(about 11.0 MiB). The UI uses MB for this binary size. This phase prepares public
lessons, quizzes, fonts and converters. It does not prepare account access, learned
word snapshots, live grammar snapshots or audio.

## What the learner sees

1. Open the existing Catalyst URL in the actual browser or Home Screen app used
   for studying. Choose **Study offline** in the header.
2. **Preview recovery export → Download recovery file** protects the current
   account across all five languages. Guest records and device-wide legacy
   settings/history are explicitly labelled choices. Keep the file privately.
3. Choose **Download app and lessons** while connected. The panel reports saved
   bytes, remaining bytes and verified files. **Pause download** and
   **Resume / repair download** reuse complete files.
4. Wait for **App and text ready offline** with matching app/worker versions.
   **Verify saved files** repeats the integrity check. The app also checks when
   foregrounded and before serving an offline navigation.
5. For an update, use **Check for updates**, download the candidate, then
   **Apply update and reload**. Save writing or **Keep draft for later** in every
   open Catalyst tab. A dirty, unresponsive or newly opened tab defers activation.

The header's Ready offline label refers to **app and public text**. The panel
explicitly says learned words/account access still need a connection and audio
has not been downloaded. Prepare the iPad Home Screen instance itself; a desktop
or Safari-tab download is not evidence that the installed instance is ready.

## Storage and worker boundaries

| Area | Implementation and preservation rule |
| --- | --- |
| Worker registration | Stable `./sw.js`, explicit directory scope, `updateViaCache: none`; first registration only after the download action |
| Cache Storage | `catalyst-shell-v1-<encoded app pathname>-<build ID>`; exact release inventory only |
| IndexedDB | `catalyst_offline_v1`, `state` store, pathname-prefixed keys for release/job/active metadata; metadata publication is transactional |
| Download verification | Same-origin allowlisted paths, successful nonopaque/nonredirected response, expected MIME, exact byte length and SHA-256; verify again after cache write |
| Resume | Per-file verification and persisted counts; an interrupted in-progress job becomes interrupted, not ready; completed files are reused |
| Routing | Only GET navigation to app directory/index and inventoried `assets/` files; queries, OAuth codes, auth, REST/RPC, mutations, external hosts and sibling apps remain network-only |
| Missing files | Readiness withdrawn; retry network or show a small offline repair page. Unknown assets never receive the app HTML |
| Updates | Candidate download leaves current pointer unchanged. Full verification, clean-tab votes and a final tab/deadline check precede atomic active-pointer/activation publication |
| Input during activation | Clean pages temporarily become inert and writes are guarded. No unconditional install-time skipWaiting or controllerchange reload; only the requesting tab reloads after its matching activation nonce |
| Older tabs/releases | Retained release inventories/assets remain usable by still-open older tabs. No automatic cache deletion; storage can grow with updates, and quota failures stop the candidate safely |
| Learner records | Existing notebook/review keys remain authoritative; worker never reads or writes learner records or SDK auth storage |

The public manifest and icons support standalone installation under the existing
path. The manifest's relative start URL/scope resolve to the application directory,
not the shared GitHub Pages root. This change does not unregister a broader root
worker or touch sibling app caches. A live root-worker conflict has not been
tested on the owner's installed devices and belongs in device acceptance.

Browser storage protection is requested only during the explicit download.
Estimates are not reservations; a persistent-storage grant is not a backup.
Browser/OS eviction can still require a download repair. Website-data clearing,
uninstallation and unregistering workers are not update or recovery steps.

## Writing, settings and recovery

- Notebook original text, intended meaning, correction notes and guided writing
  get synchronous device recovery drafts on input. A unique slot per page draft
  prevents two tabs from overwriting the same aggregate during concurrent saves.
  Slots are restricted to the current owner and learning language.
- **Keep draft for later** saves before clearing the editor; **Resume draft**
  saves a replacement before removing the old copy. Failed writes remain visible
  and keep an in-memory dirty guard. Reload cannot guarantee recovery if the
  browser refused every storage write; the UI asks the learner to copy the text.
- Dirty writing, pending notebook/recovery import previews and filled sign-in
  fields prevent update acceptance. Durable drafts can be kept and resumed after
  reload. Existing saved originals and correction notes are not rewritten by
  app updates.
- Settings writes re-read the latest stored history. Malformed/unsupported raw
  settings are retained, updates are refused, and the error banner links the
  learner to recovery. Existing notebook/review corruption remains fail-closed.
- Recovery JSON has a versioned format and a 25 MiB validation/export limit.
  Export reads explicitly allowed current-owner/guest/device records, including
  damaged raw bytes, recovery copies and restore journals. SDK credentials and
  unrelated accounts/apps are excluded. It is a sensitive local file, not a
  cloud backup or login method.
- Restore validates ownership/schema, previews counts/destinations, then rechecks
  the records and draft-slot inventory. Notebook merges retain conflicting
  originals and missing notes. Current conflicting schedules, settings and draft
  versions win; incoming snapshots remain as inert recovery copies. Reimporting
  the same file is idempotent.
- A restore journal records both sides before changing any active record. Quota
  failure before that write changes nothing. Partial restores keep the journal;
  subsequent restores archive the previous journal before replacing it. Damaged
  records are never silently replaced with empty state. Recovery copies/journals
  can be exported for deliberate repair; they are never executed as arbitrary
  storage-key instructions.

## Build and forward recovery

Sources: `src/offline.jsx`, `src/offline.css`, `src/sw.js`,
`js/catalyst-offline-core.js`, `js/catalyst-offline.js`, `js/catalyst-safety.js`.
The build emits `sw.js` with a pinned inventory, plus immutable
`releases/<build ID>.json` and `.html`. Commit those and all referenced assets.
Earlier committed assets are retained. Unreleased local intermediate builds do
not form part of the published history.

The normal configuration is:

```json
{"mode":"normal","revision":"1"}
```

If a published offline release needs recovery, prepare an isolated PR with a
working worker source and a previously retained **offline-protocol-1** app:

```json
{"mode":"recovery","from":"5b8d25886cb7ce84fb0c","revision":"recovery-1"}
```

Run `npm run build:app`, `npm run check:app`, `npm run check:build`, and `npm test`.
The builder verifies retained document/assets, creates a **new build ID**, and
publishes a new worker at the same `sw.js` URL with the compatible retained UI.
The learner downloads and applies it using the same guarded flow. Select the
actual known-good retained ID and a fresh revision for each recovery; the example
above is not a deployment instruction. Pre-worker Phase 6B is not a compatible
recovery target. Do not simply revert away `sw.js`, remove old assets, or reset
learner storage. After fixing the source, return to a normal build in another PR.

## Verification record

Local Node 24.22.3: **85 tests passed**; full JSX check and deterministic
checked-in release verification passed. CI uses the repository's Node 22 job.

| Check | Evidence |
| --- | --- |
| Verified first download, restart/resume | Actual IndexedDB API via fake-indexeddb and Cache Storage fixture; exact counts/hashes, omitted credentials, no extra fetch on repeat |
| Failure preservation | Hash/MIME/HTTP/redirect/network failures, abort, cache quota, metadata/commit failure, missing asset; prior pointer and sibling sentinel retained |
| Worker protocol | Actual worker source in VM: install has no download/skipWaiting; dirty, missing and newly opened tabs defer; clean unanimous votes activate; foreign client messages ignored |
| Routing | OAuth query, API, sibling, external host and non-GET excluded; unknown asset remains 404; offline repair HTML only for app navigation |
| Recovery | Scope exclusion, damaged/future formats, draft reload and interleaved-tab saves, notebook conflicts, preserved review schedules, stale preview, quota/partial journal and idempotent imports |
| Compiled UI | Original, meaning and correction draft recovery after reload; Keep draft clears only after saving; visible write failures and corrupt-settings recovery export |
| Forward recovery | Reproducible new ID/worker using retained compatible assets; damaged/invalid target refused; retained older assets continue serving after successive promotions |
| Browser download | Chromium at `/Catalyst/`: pause at 34/252 files, resume to 252/252 and verified matching app/worker IDs |
| Browser cold reopen | All Catalyst tabs closed and preview server stopped; new tab reopened the cached app, recovered Burmese/Marathi writing, and opened a built-in quiz |
| Browser update | Candidate staged while prior release remained ready; unfinished second-tab draft blocked activation; Keep draft enabled update, only requesting tab reloaded, both recovered drafts remained |

Browser evidence used synthetic guest records. Preview source build
`642af574b0e993eadfab` used preview IDs `41444ac117e9cbb6cf41` and
`a22932ba5f846669b88e`. The managed preview adds a live-reload script to HTML, so
the **test-only** inventory included those exact extra bytes; a test-only CSP
blocked that script and all external connections. Production inventory checks
remain strict and contain no preview additions. Subsequent per-draft storage,
journal-retention and final activation-check hardening passed the complete
automated suite against the final release above.

Not run: physical iPad Safari/Home Screen or Android acceptance, OS process
termination, real Google OAuth, browser-profile restart without a warm HTTP
cache, live origin root-worker interaction, and production deployment. Stopping
the preview server verifies service-worker reopening, not physical Airplane mode.
The [acceptance matrix](PHASE6_ACCEPTANCE.md) records these limits.

## Next phase

**6D — prepared account identity and owner/language/source snapshots**. Preserve
local notebook/review ownership while offline instead of relying on a live
Supabase session, then prepare learned-word/source snapshots with current access
checks. Audio (6E) and full physical-device acceptance (6F) follow. Paid generation
remains disabled; no production database or hosting configuration is changed here.
