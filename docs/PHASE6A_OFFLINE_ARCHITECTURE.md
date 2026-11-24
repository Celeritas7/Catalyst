# Phase 6A — offline architecture and preservation review

**Completed 2026-11-24 (Japan).** Audited merged main
`27318fa9a17f4b494d576d1784f8c6342ef822cd` (PR #18). This change records the
implementation design and acceptance gates; it adds no runtime offline feature.

**Decision: proceed with Phase 6B, a self-contained static build.** Keep Catalyst
at its existing origin and path. Follow with explicit downloads, safe updates and
account-scoped offline data. Offline readiness cannot be claimed yet.

## Evidence and current gaps

[The source inventory](phase6a-offline-inventory.json) records file hashes, byte
counts, dependency URLs, content counts and public HTTP observations. No learner
storage, credentials or private quiz history was inspected. No database changes,
deployment, service-worker registration or paid model requests were performed.

The public app at <https://celeritas7.github.io/Catalyst/> returned HTTP 200 with
the pattern-practice script and no service-worker registration or manifest link.
The repository has `.nojekyll` and no checked-in Pages workflow or custom-domain
file. The actual Pages publishing settings and any root-origin service worker
must still be inspected before changing the release mechanism.

| Finding | Evidence | Implementation consequence |
| --- | --- | --- |
| Startup depends on remote code | `index.html`: Tailwind browser compiler, React, ReactDOM, Babel and Supabase SDK use five CDN scripts | Compile styles/JSX and serve pinned runtime dependencies locally |
| Current lockfile does not cover all browser code | React/DOM 18.3.1 and Babel 7.29.15 are locked for development; browser URLs use major ranges; Tailwind and Supabase are not locked | Record exact production versions and integrity in the build |
| Text is already bundled | 24 concepts, 120 entries, 218 examples; Burmese/Japanese/Chinese examples all have saved Devanagari | Cache the small complete text corpus; keep draft/review labels |
| Bundled bytes are only part of the download | Entry HTML, 11 local scripts and one stylesheet total 271,072 bytes | This is not a final pack-size estimate; libraries, fonts, converters and audio are excluded |
| Fonts and converters still load remotely | Google Fonts; two fetched `language-utils` scripts, compiled dynamically | Package exact versions and required font coverage; preserve saved-reading fallback |
| Live grammar is not persisted | `useContent()` replaces the built-in content after three Supabase reads | Save only a complete validated content snapshot; retain the last usable version |
| Private data depends on sign-in and network | `useSession()`, `CatalystPatterns.load()`, `CatalystVocabulary.loadSource()` | Separate online authentication from an explicitly prepared local study identity |
| Audio is not ready for a download promise | All five public `audio-grammar/<lang>/clips.json` requests returned HTTP 400; Burmese response specifically reported `404` / `NoSuchKey` | Audit media separately; keep text available without claiming downloaded audio |
| Current recovery covers notebooks only | `SentenceNotebook` exports one language's notebook | Add recovery coverage for review schedules, legacy history, settings and guided drafts |
| Some changes are unsaved in memory | Notebook form/notes use React state; `beforeunload` is the only exit warning | Updates must not reload an active writing session; add explicit draft recovery |
| General settings failures are silent | `useSettings()` falls back on parse failure and suppresses write errors | Preserve raw damaged data, show failed saves, and block destructive replacement |

The audio check did not enumerate Storage objects or verify individual clips.
No conclusion about a language having zero recordings follows from an unavailable
manifest. Device voices also cannot be counted as downloaded, verified audio.

## Storage that must survive

| Existing location | Ownership and contents | Rule |
| --- | --- | --- |
| `catalyst_settings` | Device-wide legacy preferences, `learned`, `practice`, `activities`, `lastConcept`, and retained older fields | Keep the key and legacy ownership; do not silently reassign it to the current account |
| `catalyst_review_v1:<encoded-scope>:<language>` | Account/guest learning states, mistakes, review counts and due dates | Preserve exact records and timestamps; do not reset schedules when offline |
| `catalyst_notebook_v1:<encoded-scope>:<encoded-language>` | Original writing, meanings, corrections and versioned activity IDs | Retain version 1; use existing merge semantics and duplicate protection |
| `catalyst_audio_prefs` | Device-local voice/mute preference | Retain independently of downloaded audio |
| Supabase SDK session storage | Default project-scoped storage; potentially shared with sibling apps in the same browser storage context | Keep SDK-owned; never copy tokens into packs, exports, logs or cache keys |
| `catalyst_generated` | Server-owned AI examples with existing row-level access | Keep current online read/flag behavior; no generic REST cache or new generation |
| KG/Burmese/Japanese source records | Server-owned progress and labels, read by adapters | Download normalized, account-scoped snapshots explicitly; never infer a missing response means zero progress |

Preserve all existing Catalyst storage namespaces. Cache eviction or pack removal
must never delete learner records. Do not call `localStorage.clear()`, delete all
origin caches/databases, unregister sibling workers or recommend clearing site
data to recover an update. Same-origin storage namespaces are organizational
boundaries, not encryption or isolation from other scripts on that origin.

## Architecture decisions

### 1. One app at the existing URL

Retain `/Catalyst/`, its hash routes and its current storage origin. A second
offline hostname would create a separate storage/auth context and another
transfer problem. Service-worker URL and scope will be `/Catalyst/sw.js` and
`/Catalyst/`; manifest ID/start URL/scope must agree with that path. Build helpers
must also support an explicit local preview base path.

Register only this worker. Fetch handling must additionally check paths and
methods: scope does not restrict every resource a controlled page can request.
Never serve Catalyst HTML for a sibling app, API, JavaScript, audio or arbitrary
404. Root-origin registrations are an uninspected deployment dependency, not
permission to remove them.

### 2. Reproducible, locally served dependencies

Phase 6B extracts browser JSX into a build input, compiles it with the existing
Babel toolchain, and builds static Tailwind CSS compatible with the current
classes. Keep the current React major. Resolve and lock the exact Supabase SDK
and Tailwind versions; do not use floating CDN URLs in the release output.
Preserve notices/licences and pin the existing converter source revisions.
Do not redesign the UI or change authentication flow as part of the build switch.

Output remains static files suitable for the current GitHub Pages publication
path. Prefer checked-in generated assets for the first release so a new hosting
workflow is not an implicit prerequisite. Record the actual Pages configuration
before selecting its input directory. A deterministic check must detect stale
output. Tests must exercise the compiled output as well as the editable source.

Generate a release manifest with a build ID, explicit relative asset URLs,
SHA-256 digests, byte sizes and content version. Use content-addressed assets and
keep the previous release's needed assets available during rollout. Include
install icons, CSS, runtime code, converters, text and the fonts required by the
selected target, meanings and comparisons. Measure font coverage and sizes before
promising a total. An external font download must not be required to read Burmese
or Marathi offline.

### 3. Separate app files, packs and learner records

Use narrowly owned Cache Storage names such as `catalyst-shell-<build>` for
versioned public app files and `catalyst-media-<pack>` for verified public media.
Use a new `catalyst_offline_v1` IndexedDB database for download jobs, release/pack
manifests and explicitly saved normalized source snapshots. Existing localStorage
learner records remain authoritative; no migration is needed for the first offline
release. The names here are the proposed contract, not currently existing stores.

| Data class | Offline policy |
| --- | --- |
| App shell and bundled text | Explicit release asset list; validate all required files before marking ready |
| Live public grammar | Bounded/paginated reads and joins; store an internally complete version, not three independent stale responses |
| Learned nouns and linked ratings | Separate snapshots keyed by owner, language, provider and schema version; preserve each provider's rating meanings |
| Public recorded audio | Explicit manifest, language/voice/hash, nonempty verified bytes and resumable file downloads |
| Auth, REST/RPC, Edge requests and mutations | Network only; never generic service-worker caching or offline replay |
| User writing/review progress | Existing durable local stores; no new server sync or mutation queue in this phase |

IndexedDB and Cache Storage do not share a transaction. Write candidate files and
metadata first, verify them, and then publish an active pointer. Recheck referenced
files on startup; a pointer alone cannot prove readiness. An interrupted candidate
must leave the prior complete version usable. Cleanup only recognizes exact owned
prefixes and never removes the active or retained rollback version.

### 4. Honest offline identity

Public downloaded lessons can open without login. Private source snapshots require
an explicit **Study offline** action while the real account and source access are
verified online. Store only the owner ID, minimal display label, source/version,
verification time and download metadata alongside normalized data; no token copy.

Use a separate local study identity, not a fabricated Supabase session. Account
notebook/review keys must resolve to that same owner while in local mode. Expired
online tokens must not force those writes into the guest namespace.

| Situation | Required behavior |
| --- | --- |
| No previously prepared account | Public downloaded lessons and guest work only; private reads need online sign-in |
| Prepared owner, connection unavailable or token refresh pending | Offer that owner's saved study data with snapshot date and offline label; no server requests authorized by the local marker |
| Explicit sign-out, observed sibling-session sign-out, or different verified account | Immediately detach the old owner's data and cancel/ignore in-flight work; do not expose old snapshots to the new account |
| Authoritative online denial/revocation | Lock that source's snapshot for reuse; preserve personal notebook and recovery data; do not classify a network failure as denial |
| Reconnect | Revalidate the real session and current source permissions before refresh; replace only complete snapshots for the same owner |

Offline access cannot discover a revocation while disconnected. It is access to
previously downloaded local material, not proof of current server permission.
Local sign-out must disable automatic offline reopening for that owner even if a
network sign-out call fails. Do not scan other accounts' notebook keys to choose a
fallback identity. Importing a recovery file never authenticates an account.

The current KG adapter uses `kg_chart_is_allowed`; recheck the source permission
contract when implementing snapshots because KG's user/language/topic permission
work is evolving separately. Do not broaden access or modify that project's data.

### 5. Downloads, readiness and updates

Expose **Study offline** on desktop and iPad, with selected language/account,
required size when known, downloaded bytes/files, remaining size, pause/resume,
retry and last successful verification. If total bytes are unknown, say so rather
than inventing a percentage. File-level resume is sufficient initially; retain
verified completed files and restart only an interrupted file.

Show separate readiness for **app/text**, **my learned words** and **audio**.
Only claim the selected experience is ready after all its required files and
snapshots validate and a matching worker controls the page. An optional missing
audio file must not disable text study; an authentication or network failure must
not be silently replaced with a placeholder. No missing-media placeholders are
added to the learning content.

Updates stage a complete candidate and keep the active release running. Offer
**Update ready** only after verification. Do not unconditionally call
`skipWaiting()`, reload, or delete the old cache during installation. Coordinate
all Catalyst tabs, preserve/flush drafts, and defer activation while any tab has
unsaved writing. Recheck dirty state when activation is requested. Display app
and worker versions so an update can be verified without clearing storage.

On suspension or process termination, downloads resume from persisted metadata
on foreground/reopen. Do not depend on background sync or continuous iPad
execution. Detect quota/write failures explicitly, leave originals and existing
downloads intact, and offer retry or selective removal of downloaded media.

### 6. Recovery and rollback

Before the first offline activation release, provide a separate recovery export
for the current account's notebooks/reviews and explicitly included guest/device
legacy state. Preview the exact scope and counts. Exclude Supabase credentials,
other accounts and unrelated origin data. Keep existing notebook JSON exports
compatible. Restore validates and previews before merging; it must reread current
state and retain conflicting history instead of overwriting it. Existing settings
parse errors must preserve the raw value for recovery and block replacement.

Drafts need their own local recovery records and truthful saved/unsaved states;
`beforeunload` is insufficient for a suspended or terminated mobile app. Pending
note text, intended meaning, import preview and guided writing all count as dirty
when deciding whether an update may reload the page.

For a failed candidate installation, keep the old worker and complete cache. For
a bad active release, publish a forward recovery worker at the **same stable URL**
with a new recovery build ID and the last compatible shell. Retain old assets and
storage formats; stop ordinary cleanup during recovery. Deleting `sw.js` or
reverting only HTML does not remove an installed worker. Test the recovery release
before the first worker is enabled in production.

## iPad constraints checked against platform documentation

WebKit documents separate Home Screen storage: Safari localStorage/IndexedDB is
not automatically copied into the installed app. Therefore prepare downloads in
the exact Home Screen instance used at the café and transfer existing notebook
data through an explicit export/import when needed. Do not ask the learner to
reinstall an existing working instance as an update step.

Storage quota is an estimate, not a reservation. Use `estimate()`, `persisted()`
and `persist()` when supported, and still handle failure/eviction. Persistence is
not a substitute for a recovery file. Record actual iPadOS version and whether
the icon opens a web app or a browser bookmark; iPadOS 26 changed installation
defaults. Feature detection and physical tests determine support.

Supabase documents that `getSession()` can refresh a session. Its current use is
therefore not evidence of reliable disconnected startup. Do not lengthen JWT
lifetimes or weaken authentication to solve offline study. Preserve OAuth query/
fragment data until the SDK processes it; neither route normalization nor a
cache key should consume or persist credential-bearing callback URLs.

Sources consulted on the audit date:

- [WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/)
- [Safari 17.2 Home Screen storage behavior](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/)
- [Safari 26 installation changes](https://webkit.org/blog/17333/webkit-features-in-safari-26-0/)
- [Service-worker lifecycle, origin caches and updates](https://web.dev/articles/service-worker-lifecycle)
- [Supabase getSession](https://supabase.com/docs/reference/javascript/auth-getsession)
- [Supabase sessions](https://supabase.com/docs/guides/auth/sessions)

## Independently reviewable phases

| Phase | Deliverable | Exit condition |
| --- | --- | --- |
| 6A — this change | Source/dependency/storage audit, architecture and preservation acceptance | Evidence recorded; no runtime changes |
| 6B — next | Reproducible static build, pinned local runtime, compiled CSS/JSX, packaged fonts/converters, release manifest | Built app runs with third-party assets blocked; online login/routes and notebook regression checks pass; no offline claim yet |
| 6C | Scoped worker, install manifest/icons, Study offline controls, safe update/recovery and local writing protection | Public text cold-starts offline; interrupted installs and update rollback preserve all learner stores |
| 6D | Prepared offline account identity and learned-word/provider snapshots | Expired sessions do not misroute writes; account switches and reconnect cannot leak or overwrite data |
| 6E | Verified audio inventory and resumable optional media packs | Actual available clips replay offline; missing media and sizes are honest; text readiness stays independent |
| 6F | Physical iPad/Android/desktop acceptance and accessibility/content follow-up | Recorded device evidence for cold start, suspension, update, recovery, fonts and keyboard use |

Content expansion/native-speaker review may continue alongside this work, but
offline packaging does not turn draft content into reviewed material. Notebook
cloud sync, paid AI activation and changes to other language apps are outside
this sequence. See [the acceptance matrix](PHASE6_ACCEPTANCE.md) for exact gates.

## Validation of this audit

Verified all 13 inventory file digests and byte counts against the audited main
commit, the total size, local document links and `git diff --check`. Confirmed
that app code, dependencies, SQL, Edge functions and tests are unchanged. The
63-test Phase 5G result remains a historical baseline; the application suite was
not rerun for this documentation-only change. No browser/device offline test was
performed, and all product gates in the acceptance matrix remain pending.
