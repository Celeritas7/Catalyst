# Phase 5F — paused deployment checkpoint

**Later checkpoint, 2026-11-24:** the owner completed model configuration privately;
the capability response subsequently reported `configured:true`, and the owner's
signed-in attempt reached the expected zero-limit response. A read-only check for
Phase 5G confirmed limit 0, zero quota ledger rows and zero generated rows. No paid
model acceptance was performed. The owner chose pattern practice without paid AI;
see [Phase 5G](PHASE5G_PATTERN_PRACTICE.md). The deployment observations below retain
their original point-in-time results. The activation list is deferred, not a
requirement for pattern practice or Phase 6.

Verified on **2026-11-24 (Japan)**. The Technical database installation is complete
and `catalyst-sentence` is deployed. **AI generation is still paused**; model
configuration and live-model acceptance are not complete.

## Installed database

The owner reported a successful fresh custom-format database backup before
installation: 14,018,218 bytes, with a successful full archive read using
`pg_restore --file NUL`. The local backup path and checksum remain in the private
handoff conversation. This confirms archive readability, not a complete restore
rehearsal of that new backup.

The owner then applied the first-install bundle from merged PR #16. Read-only
verification confirmed:

| Object or check | Result |
| --- | --- |
| Five Catalyst tables | Present; RLS enabled on all five |
| Grammar content | 24 concepts, 120 language entries, 218 examples |
| Public grammar grants | SELECT only for anon, authenticated and service_role |
| Generated sentences | Authenticated own-user SELECT/DELETE and UPDATE of `flagged` only |
| Anonymous sentence access | No table or column grants |
| Daily quota ledger | No browser role access |
| Reservation function | Service-role-only EXECUTE; SECURITY INVOKER; empty search path |
| Language metadata | Nullable text columns present |
| `catalyst_daily_limit` | **0** |

The existing generated-sentence policies use `user_id = auth.uid()` for SELECT,
UPDATE and DELETE, with the same UPDATE check. Verification here inspected live
catalogs and effective grants; it did not sign in as two real learners.

Security advisors report an informational no-policy notice for the intentionally
private quota ledger, and the generic anonymous-authenticated-session notice on
the own-user generated-sentence policies. The PostgreSQL `anon` role has no sentence
access, and the Edge handler additionally requires KG allow-list approval. These
notices were not hidden by broadening access. References:
[RLS with no policies](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy),
[anonymous authenticated sessions](https://supabase.com/docs/guides/database/database-advisors?queryGroups=lint&lint=0012_auth_allow_anonymous_sign_ins).

## Deployed function

After explicit owner approval, the reviewed function was deployed at approximately
00:25 JST on November 24:

- Function: `catalyst-sentence`, deployment version **1**, status **ACTIVE**.
- Source commit: `5fd28efd55dab3e4dfcdfe973851a55153dd77d6` (merged PR #16).
- `index.ts` Git blob: `002b2b297f73b5c94e20133adf91be2928a2f215`.
- `core.ts` Git blob: `8c287e04a068485d97b360ff901f1463076928b0`.
- Deployed bundle SHA-256: `95fe35c33d2c37c513f47ec8c3c5f0544451fab6b15be6041a1a66fcccc86973`.
- The deployed source was read back and both file contents matched the reviewed
  source exactly. No function source edits were made for this deployment.
- Gateway JWT checking is disabled because the handler performs `auth.getUser`
  and KG allow-list verification itself; CORS preflight remains accessible.
- No model secrets were added, no quota setting was raised, and no paid model
  requests were made. The existing `kg-pronounce` function was not redeployed.

## Live HTTP checks

Tests called the deployed endpoint with the frontend Origin header. No real user
token, private learner content or model credentials were supplied.

| Request | Observed result |
| --- | --- |
| GET capabilities | 200; `ok:true`, `api_version:2`, targets `ja,my,zh,mr` |
| GET model configuration | `configured:false` |
| OPTIONS preflight | 200; POST and required request headers allowed |
| POST without Authorization | 401; `reason:auth`, "Please sign in." |
| POST with a deliberately invalid Bearer token | 401; `reason:auth`, "Please sign in again." |
| PUT | 405; `reason:bad_request` |

JSON responses included `Cache-Control: no-store` and CORS response headers.
`configured:false` means at least one of `ANTHROPIC_API_KEY` and `CATALYST_MODEL`
is absent/blank. It does not identify which secret is missing, and does not test
whether any existing provider key is valid.

After the checks, database reads confirmed **limit 0, zero generated rows and zero
quota ledger rows**. These requests neither reserved a slot nor created a sentence.

The earlier 61 automated tests and PostgreSQL 17.6 rehearsal with 20 distinct
concurrent sessions are recorded in [Phase 5E](PHASE5E_BACKEND_READINESS.md).
Those tests were not rerun for this documentation-only checkpoint.

## Remaining activation work

1. Configure `ANTHROPIC_API_KEY` privately in Supabase and choose an explicit
   `CATALYST_MODEL` available to that provider account. Do not put secrets in a
   repository, report or chat. Keep the daily limit zero during setup.
2. Verify valid signed-in access, allow-list denial, selected-language source
   reads and own-row isolation using two authorized test accounts. The HTTP
   rejection checks above do not complete this positive-account acceptance.
3. Agree on the provider/model cost and explicitly authorize a small live test
   before increasing the daily limit. Validate one generated target sentence,
   reading and selected meaning, then save/reload/flag and account/target changes.
4. Complete desktop and physical iPad acceptance, including the earlier notebook
   export/import check. Native-speaker quality review remains separate from the
   structural model-output checks.

Leave generation at zero if activation is deferred or fails. Keep the installed
schema, content, saved rows and quota history. **Do not rerun the first-install
bundle** on this now-existing installation; use an additive change for any upgrade.

Notebook cloud synchronization, the central generated-sentence view and Phase 6
offline startup/content packs remain separate work.
