# Phase 6D — prepared accounts and source snapshots

Implemented from merged Phase 6C (`e64b0ba3ef2ff7d10650807d85a248bcd51ffa60`).
Date: 2026-11-25 (Japan). This change prepares a reviewable frontend release;
it does not deploy or modify Technical Supabase.

## User flow

1. Sign in online and open **Study offline** in the browser or Home Screen app
   where you will actually study. Download/verify the public app and lessons.
2. Choose **Prepare this account for offline study**. The account is verified
   with Supabase Auth before a local study identity is enabled.
3. Each source for the selected learning language downloads separately. See its
   count, save time or reason it is unavailable. An empty complete source says
   **0 words**; a failed source remains an error.
4. Reopen offline. The banner identifies the prepared study account; notebooks,
   reviews and recovery drafts keep their existing owner and language keys.
   Saved ratings and eligible pattern nouns show their date and refresh status.
5. Reconnect to verify sign-in and refresh an already prepared source when its
   view opens. **Refresh offline account and words** explicitly retries every
   source for the selected language. Cancellation retains completed sources.

App/text, account, each word source and audio have separate readiness. Preparing
an account does not download the shell, sync writing to the cloud, merge provider
ratings or enable AI generation. Audio remains Phase 6E.

## Production boundary: KG Chart is not ready for offline downloads

A read-only catalog check against Technical on 2026-11-25 found:

| Required function | Present |
| --- | --- |
| `kg_chart_is_allowed()` | Yes |
| `kg_chart_u3_my_access_snapshot()` | No |
| `kg_chart_my_private_lesson_visibility(text)` | No |

Therefore **KG Chart ratings and learned-noun downloads are blocked** with a
specific message on the current backend. Notebook/review preparation and Burmese
Study/Japanese Study snapshots can proceed independently. Existing online pattern
practice continues to use its existing account-gated adapter.

The KG adapter was reviewed against KG Chart's merged U3A access-snapshot and
U3B3A private-record SQL contracts. Once those endpoints are deployed separately,
this version accepts contract 1 **legacy** profiles only: it rechecks the allowlist
and private-topic visibility before and after a complete read, filters words
without a visible topic, and detects permission revisions/hidden-topic changes.
Restricted profiles are explicitly unsupported until their enforced feature and
topic contract is separately validated. No raw private-lesson settings or other
users' email lists are queried, stored or exported. Missing endpoints never cause
an unrestricted offline fallback. This PR does not approve a KG SQL rollout.

## Ownership and storage

`js/catalyst-account.js` maintains one minimal local preparation marker:
`catalyst_offline_owner_v1`. It contains an owner ID/display label, verification
date and revision. It stores no tokens. Only the existing project SDK key is read
to compare the cached owner; other account keys are not enumerated. Supabase keeps
its normal session storage and OAuth callback handling.

Offline access requires both the prepared owner and the same cached SDK owner.
An expired token can therefore coexist with a local study identity; it is never
represented as an authenticated API session. The app supplies a real session to
online-only features only after `getUser` verification. Without preparation,
failed verification leaves account records unavailable instead of silently
writing under guest. Settings offers an explicit sign-out/guest route.

Sign-out first disables local preparation, then calls the pinned SDK with
`scope: 'local'`. A network failure cannot re-enable offline access. Observed SDK
sign-out, shared-session removal, account switch or sibling preparation removal
invalidates outstanding jobs and hides the old owner. Original writing is kept.
Source access cannot be revalidated while offline; the UI says so. This local
storage is not encrypted and cannot enforce remote revocation on a disconnected
device. No token lifetime or server permission is extended.

`js/catalyst-snapshots.js` stores only normalized derived words in IndexedDB
`catalyst_study_snapshots_v1`, keyed by schema, owner, language, provider and kind.
Writes replace an individual source atomically after all pages and checks finish.
No partially downloaded rows are presented as a complete snapshot. Provider
rating labels/levels retain their original meanings. Custom Japanese labels are
also paginated; an absent optional category table retains the existing fallback.
KG learned eligibility still requires completed topics or two distinct correct
answer IDs in the owner's language; duplicate retries are not new evidence.

Network/partial-response/quota errors preserve the last complete snapshot.
Authoritative denial or an incompatible permission contract advances a durable
source gate, hiding old snapshots across languages and tabs without deleting
their bytes. A later explicit complete refresh unlocks only the newly saved
record. A concurrent gate change defeats both late downloads and stale fallbacks.
If denial cannot be recorded, offline preparation is disabled. Corrupt or future
snapshot formats are preserved and cannot be overwritten by preparation.

Account/language cancellation uses ownership and view tickets. An account switch
cannot publish a late result in the new view. Completed sources are checkpoints;
an interrupted source restarts its complete read on retry. There is no per-page
partial word resume or automatic background download.

Recovery exports continue to cover existing personal writing/reviews/drafts.
Derived word caches and preparation/permission markers are deliberately excluded:
restoring writing does not restore sign-in or authorize offline source access.

## Validation

Release `65b6ac072f218d5d9153`: 252 files, 11,531,296 bytes.
`npm run check:app`, `npm run check:build` and all **104 tests** pass locally.

Chromium QA passed with synthetic accounts: explicit account/word preparation;
253-file QA shell verification; offline pattern and original saves; switching to
B hides A’s two sentences; switching back restores both. After closing the app
tab and stopping the preview server, a new tab opened the cached app and both
account-owned sentences. The extra QA file is the fake SDK/control harness; it
is not shipped. Preview release: `0421d231403f2149b7ac`, from source
`91d30a24c7a69f1c50bb`. The final build also shows snapshot dates inside linked
word-rating details and avoids briefly displaying a previous provider’s rows.

Automated coverage is in `account.test.cjs`, `snapshots.test.cjs`,
`account-ui.test.cjs`, existing source-adapter tests and the retained Phase 6C
worker/recovery suite. It includes offline reload, original/pattern saves into
the correct notebook, changed/absent owners, late verification, expired cached
identity, durable sign-out despite a network error, corrupt markers, quotas,
1,001-row pagination, duplicate quiz answers, private-topic filtering, missing
contracts, permission changes, late source locks and unknown stored formats.

Physical iPad Safari/Home Screen, Android Airplane mode, real Google OAuth and
real learner accounts are not acceptance-tested by these fixtures. The synthetic
browser preview uses a fake SDK and blocked external connections. Its KG-success
fixture does not establish production KG availability.

Auth behavior was checked against the pinned `@supabase/auth-js` 2.119.2 source
and the official [getUser](https://supabase.com/docs/reference/javascript/auth-getuser)
and [signOut](https://supabase.com/docs/reference/javascript/auth-signout)
documentation. The [Supabase changelog](https://supabase.com/changelog.md) was
reviewed; no library upgrade, SQL migration or production write was needed.

## Next

Phase 6E: inventory and verified resumable downloads for available recorded audio.
Phase 6F: physical iPad/Android acceptance, including expiry, shared-session
sign-out and source-refresh recovery. KG offline activation remains dependent on
the separate KG permission deployment and acceptance, not on an API key.
