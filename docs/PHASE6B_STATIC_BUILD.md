# Phase 6B — self-contained static release

Implemented from merged Phase 6A (`a17e22a`) on 2026-11-24 (Japan).
This removes external startup-code, converter and font dependencies. It does
**not** install a service worker, download an offline pack, preserve an offline
account session or promise cold offline reopening. Those are subsequent phases.

## Publishing and source layout

GitHub Pages settings were inspected in the signed-in repository UI: **Deploy
from a branch → main → / (root)**. The live URL remains
`https://celeritas7.github.io/Catalyst/`. No Pages setting or deployment workflow
was changed. Generated output is checked in at that existing publication root;
merging the PR uses the existing Pages deployment mechanism.

- `src/app.jsx` is the previous inline JSX extracted without code changes. App routing,
  OAuth handling, public configuration, session options, notebook/review storage
  keys and study behavior are unchanged.
- `src/index.template.html`, `src/base.css`, `js/study.css` and
  `tailwind.config.cjs` supply the page and precompiled styles.
- `tools/build_app.cjs` creates `index.html`, `assets/` and
  `release-manifest.json` without network requests or timestamps.
- `tools/app_sources.cjs` preserves helper load order. Deferred runtime and app
  scripts execute in order after parsing; there is no browser Babel or Tailwind
  compiler and no runtime converter fetch/evaluation.
- `npm run build` remains the content/SQL generator. Its default converters are
  now local; the explicit `--lu` local-directory override remains available.
  Content and SQL have not been regenerated as part of this release.

## Pinned dependencies and provenance

React and ReactDOM remain **18.3.1**; Supabase JS is **2.119.2**, the version the
old unversioned-major CDN URL resolved to during this phase. Tailwind **3.4.19**
compiles the existing classes. Babel **7.29.15** is only a build dependency.
Exact direct build versions and all transitive resolutions are in the lockfile.

The Burmese and Chinese sources are unmodified copies from the owner's
`Celeritas7/language-utils` commit
`d476d2ae76d25823044375ca5e1a6478824bfbcf`. Their upstream revision and SHA-256
values are in `vendor/language-utils/provenance.json`; the build refuses a
mismatching source. Upstream supplies no license file at that revision, and
this change does not invent one or relicense the converters.

Fontsource supplies DM Sans, Playfair Display, Noto Sans Devanagari, Noto Sans
Japanese, Noto Sans Simplified Chinese and Noto Sans Myanmar. Existing CSS family
names are retained. Full WOFF2 Unicode subsets are packaged, including characters
outside the current lessons; browsers request the subsets needed for displayed
text. Variable fonts cover weight ranges; Myanmar includes 400/500/700. Runtime
package licenses, dependency licenses, font licenses and converter attribution
are collected in the hashed `THIRD-PARTY-LICENSES` asset.

Reference documentation: [Tailwind v3](https://v3.tailwindcss.com/docs/installation),
[Fontsource](https://fontsource.org/docs/getting-started/install), and
[Supabase JS](https://supabase.com/docs/reference/javascript/installing).

## Release inventory and updates

`release-manifest.json` records a schema version, deterministic build ID,
bundled-content hash, converter revision, package versions and each release
file's relative URL, byte size, type and SHA-256. It includes the entry document,
scripts, styles, all fonts and license notice. The manifest excludes itself to
avoid a circular hash; its byte total is the sum of the inventoried files.

Initial build `552eea7eb7d0c589c9bf`: **248 files / 11,432,217 bytes** (about 10.9 MiB). Most bytes are
the complete Japanese/Chinese font subsets. This is the complete asset inventory,
not a claim that every font is fetched during ordinary online startup. Later
offline downloads must budget and verify the required files explicitly.

Assets use content-derived filenames. Builds **retain older assets** so an open
page can still request its release's fonts/scripts. Do not run an automatic
asset-pruning command during future updates. The current manifest describes only
the current release; later offline lifecycle work must manage release retention.
No cache, storage, account or sibling-app data is cleared by this build.

## Developer checks

Use Node 22.18 or newer:

```sh
npm ci --ignore-scripts
npm run build:app
npm run check:app
npm run check:build
npm test
```

Commit the changed sources and their generated release together. `check:build`
rebuilds in memory and fails if any current generated file is missing or stale;
it does not write files. The validation workflow runs that check and the tests
on pull requests and main, without deploying or using production credentials.
Source changes to content still require the separate content/backend review.

## Validation and limits

- The original 63 tests pass against the compiled runtime/UI. Three additional
  release tests verify deterministic output and the complete dependency graph,
  startup with every external request blocked at `/Catalyst/`, preserved notebook
  originals/corrections/review dates/legacy history/sibling sentinel across
  reload, and intact handoff of synthetic hash and query OAuth callbacks.
- The actual pinned Supabase SDK boots successfully in the blocked-network guest
  test. Callback tests verify delivery to SDK initialization; they do not replace
  a real Google sign-in round trip. No callback values enter a cache/export, and
  no worker or cache interception is introduced in this phase.
- A deliberate stale generated HTML edit was refused by `check:build`, then
  restored. The content generator completed from local converters; its generated
  data/SQL were restored to their unchanged baseline afterward.
- Chromium browser QA used the compiled release at the nested `/Catalyst/`
  path with a test-only CSP permitting same-origin assets and blocking all
  connections. Desktop and a 390-pixel iframe viewport rendered Burmese,
  Devanagari, Japanese and Chinese; a synthetic saved original and correction
  survived reload. The preview harness and synthetic records are not published.
- Real Google OAuth, physical iPad Safari/Home Screen, Android Home Screen and
  cold Airplane-mode startup remain **not run**. A narrow desktop viewport is
  not a physical device acceptance result. Existing optional audio and account
  data still need their network services.

## After merge and next phase

At the existing app URL, refresh once and verify a lesson, My Learning notebook
and Settings. Existing writing and corrections should remain. There is no new
offline button in 6B, and clearing website data is never an update step.

Next is **Phase 6C: Study offline, verified/resumable app downloads, safe update
activation and recovery/preservation controls** under the Phase 6A boundaries.
Account-scoped source snapshots follow in 6D, available audio in 6E, then physical
iPad/Android acceptance in 6F. Paid generation remains paused.
