# Phase 5E — backend readiness and first-install rehearsal

Prepared 2026-11-23 (Japan), after PR #15 merged. This phase prepares a reviewed
installation; it does not install or activate the hosted backend.

**Later checkpoint:** the database and paused function were installed on
2026-11-24 (Japan). See [Phase 5F](PHASE5F_PAUSED_DEPLOYMENT.md) for the current
deployment state. The absence/readiness findings below describe the earlier audit.

## Current hosted state

A fresh read-only inspection of the configured **Technical** project found:

| Check | Observed result |
| --- | --- |
| Project | Active/healthy; PostgreSQL 17.6 |
| Catalyst tables | None of the five required tables exist |
| Reservation function | `catalyst_reserve_generation(uuid)` absent |
| Sentence Edge Function | `catalyst-sentence` absent |
| KG source contract | Required columns/types and translation foreign key present |
| Source permissions | Six source tables have RLS; required learner/server SELECT grants present |
| Allow-list helper | `kg_chart_is_allowed()` exists and authenticated can execute it |
| Hosted staging | No branches; organization is on the Free plan |
| Model key, model availability, live account behavior | Not verified |

`sql/catalyst-preflight.sql` reproduces the catalog checks without reading learner
rows, reserving quota, calling a model, or changing anything. On this project its
five source prerequisite checks passed; Catalyst tables/RPC were NOT_INSTALLED.
Catalog compatibility is not proof of end-to-end authentication or PostgREST
behavior. No production SQL writes, secrets changes, deployments, paid model calls,
or paid staging resources were made.

Source policies were inspected: completions/sessions use own-user or admin reads;
answer reads follow owned sessions or admin; vocabulary reads use the KG allow-list.
The allow-list helper requires the existing admin check or a confirmed-email user
in KG Chart's allow-list. No email addresses or learner content are in this report.
The source tables and policies are not changed by this phase.

The project's security advisors also reported existing helper/policy warnings.
An authenticated-callable SECURITY DEFINER helper is expected for the existing
allow-list, but that design still needs live account checks; a catalog PASS is not
a clean project-wide security audit. See the advisor explanations for
[authenticated SECURITY DEFINER calls](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable)
and [anonymous authenticated-user policy checks](https://supabase.com/docs/guides/database/database-advisors?queryGroups=lint&lint=0012_auth_allow_anonymous_sign_ins).
Unrelated shared-project findings were not modified.

## What is prepared

- **Explicit content permissions:** public grammar content grants SELECT to anon,
  authenticated and service_role. Browser/server content writes are not granted.
  Old table and column grants are removed on those three Catalyst tables only.
  This works under both broad legacy defaults and explicit-only defaults; RLS
  alone does not grant access. Global defaults and sibling application grants
  are unchanged.
- **Read-only preflight:** checks required source columns/types, RLS flags,
  necessary SELECT grants, the translation relationship, allow-list execution,
  Catalyst table presence and quota RPC execution grants. It intentionally does
  not certify existing Catalyst schemas/policies or replace account tests.
- **First-install SQL:** `sql/catalyst-initial-install.sql` contains content schema,
  repository grammar seed, generated-sentence schema and the v2 migration in one
  transaction. A failure rolls everything back. It takes a transaction advisory
  lock and uses bounded lock/statement timeouts.
- **Overwrite guard:** any existing public `catalyst_` relation or function blocks
  the first-install bundle. In particular, it cannot run the existing seed's
  cleanup DELETE statements over an existing installation and cascade-delete
  saved sentences. Upgrades need a separately reviewed additive migration.
- **Paused start:** the install creates only the dedicated
  `kg_chart_settings.catalyst_daily_limit = 0` setting. An existing nonzero or
  invalid value blocks installation rather than being replaced. Existing zero
  is retained. A later approved setting change is required to enable generation.

These changes leave device-local notebooks, correction notes, exports, learning
history and account sessions intact. Model validation and offline startup are
separate work.

## Reproduce the checks

Use Node 22.18+ as an ordinary user:

```sh
npm ci
npm run check:backend
npm test
npm run check:app
npm run test:postgres
```

`npm run prepare:backend` regenerates the checked-in SQL bundle from its source
files and preflight. It does not connect to any database. After changing content
or schema sources, regenerate the bundle and review the diff. `check:backend`
fails if it is stale.

The usual suite adds first-install tests to the existing generation/notebook/UI
regressions. Tests exercise fresh installs under both default-grant modes, public
content reads, denied writes even with an accidental permissive policy, removal
of old column grants, paused generation, rejected reruns, custom concept/saved-row
preservation, source mismatch, existing nonzero limits and complete rollback of
a deliberately failing installation.

`test:postgres` starts a disposable **PostgreSQL 17.6** cluster on loopback with a
random local password and synthetic data. It accepts no external database URL or
production credentials. It stops the server and removes the temporary cluster.
It needs a supported native binary platform, permission to start local processes
and listen on loopback, and a non-root account. The locked development dependencies
are `embedded-postgres@17.6.0-beta.15` and `pg@8.23.1`. This is PostgreSQL validation,
not a complete local Supabase Auth/Edge/PostgREST environment.

The real database rehearsal passed with **20 distinct PostgreSQL sessions**:

| Scenario | Result |
| --- | --- |
| Limit 5, three legacy saved rows, twenty simultaneous first reservations | Exactly two accepted; final usage 5 |
| Different user, twenty simultaneous first reservations | Exactly five accepted; independent usage 5 |
| Delete saved rows, request again | No refunded reservation |
| Change limit to zero | New reservations denied |
| Malformed limit | Error; usage unchanged |
| Authenticated/anon call reservation RPC directly | Permission denied |

This closes Phase 5D's PostgreSQL multi-session contention gap. Production
authentication, source RLS with real sessions, Edge runtime, model quality and
physical browser/iPad behavior remain unverified.

## Next phase: staged activation

The first-install SQL is ready for review; live generation is **not ready to
activate**. Merge of this PR performs no backend deployment.

1. Confirm a current recoverable backup and re-run the read-only preflight. The
   historical November 15 backup is not a fresh pre-deployment backup. Review the
   exact bundle and obtain authorization for the paused production installation.
   If any Catalyst objects now exist, stop and prepare an additive upgrade.
2. Apply the entire first-install bundle as the database owner in one execution.
   If the SQL client leaves an error transaction open, issue ROLLBACK before retry.
   Never run selected fragments. Verify table/column privileges and own-user
   sentence access with two approved test accounts; do not copy private data into
   a public test fixture. Keep the daily limit zero.
3. Deploy the v2 Edge Function with explicit operator authorization. Initially
   omit model credentials; check GET capability/version, CORS, authentication,
   allow-list rejection, unavailable-service behavior and saved-row access without
   a paid call. The handler verifies auth itself when gateway JWT checking is off.
4. Choose an available model and budget, set the API key privately in Supabase,
   and authorize a small live-model acceptance run with a temporary low limit.
   Check the target sentence, reading, Marathi meaning, save/reload/flag, failures
   and account/target switching on desktop and iPad. Then agree on the normal cap.
5. Pause by setting the dedicated limit to zero if acceptance fails. Keep all
   saved rows, metadata and quota history. Do not drop the additive schema or roll
   back to the old unreserved generation function.

Hosted branch creation was not attempted: Supabase documents branching through
its MCP tools as a paid-plan feature. The free local rehearsal above does not
claim hosted staging parity. References:
[explicit grants and RLS](https://supabase.com/docs/guides/api/securing-your-api),
[Data API default changes](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically),
[Supabase MCP branching](https://supabase.com/docs/guides/ai-tools/mcp),
[embedded PostgreSQL](https://github.com/leinelissen/embedded-postgres).
