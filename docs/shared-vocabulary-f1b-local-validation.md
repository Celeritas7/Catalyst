# F1B isolated validation and deployment gate — 2026-11-15

## Scope and verdict

**Local SQL validation passed; production deployment NOT YET APPROVED.**

- Base: `main` at `56f0a19` (PR #10 merged).
- Runtime: PGlite 0.5.16, PostgreSQL 18.6-compatible WebAssembly engine, isolated and populated only with synthetic fixtures. It is **not** a Supabase service or a conventional PostgreSQL server.
- Foundation: all 12 tables created, all 12 had RLS enabled, no policies, no anon/authenticated grants; foreign keys, representative checks, uniqueness, deletion restriction and role-based deny-by-default verified (22 checks with typed-ID fix).
- `shared-vocabulary-f1b-verify.sql`: both statements executed; 12 expected rows, all RLS enabled, no anon/authenticated CRUD grants, zero initial mappings and claims.
- `shared-vocabulary-f1b-dry-run.sql`: all four statements executed against minimal empty synthetic legacy table signatures. **Actual legacy schemas, source row counts and real-data reconciliation were not validated.**
- No production or staging Supabase connection was used; no legacy content was copied.

## Identified correction

The stored `source_pk_type` and `related_source_pk_type` were omitted from two source uniqueness constraints. This prevents a source with integer `1` and text `"1"` being represented independently. The fix includes both types in their respective unique keys; requires PR review and merge before first F1B deployment.

## Unverified items

1. Supabase-specific `auth.users` FK behavior, project Postgres version, extension availability, default grants and service-role behavior.
2. Actual column names/types of each legacy source table in the read-only dry-run.
3. Real backup/restore drill, extension/role catalog, existing-name collisions, lock impact and migration timing.
4. Actual app account realms, source identities, and source progress ownership proofs.
5. Importer idempotency, content drift and user-event replay: no F1C/F2 importer exists yet.

## Production deployment checklist — all required before approval

- [ ] Review and merge typed-source identity PR; revalidate the exact merged SQL SHA.
- [ ] Identify target Technical Supabase project by verified identity and ensure it is distinct from the language apps' other projects.
- [ ] Inspect Postgres version, extensions, existing `lex_*` name collisions, `auth.users`, default grants, role privileges and SQL editor execution role.
- [ ] Capture encrypted/restorable database backup and source/media manifests with row counts; rehearse restoration outside production.
- [ ] Run read-only inventory on the real source schemas and resolve any missing/renamed columns before migration.
- [ ] Execute migration with single-transaction behavior in a real isolated PostgreSQL/Supabase-compatible environment; test error rollback and rerun behavior.
- [ ] Run verify SQL and confirm 12 tables, RLS on all, no frontend CRUD grants, zero new mappings/evidence/claims.
- [ ] Test anon/authenticated denial using real Supabase JWT/API contexts; check schema exposure settings.
- [ ] Record rollback/incident steps: F1B is additive, so legacy apps must continue untouched; reverting a deployed schema requires separate reviewed SQL, never automatic drops.
- [ ] Obtain explicit owner approval for production change after reviewing test evidence and backup location.

**Deployment remains blocked until these boxes are checked.**

## F1C mapping preparation (inventory only; no import)

| Application/source | Existing source table | Language/kind | Mapping rule to investigate |
| --- | --- | --- | --- |
| Japanese Study Advanced | `japanese_unified_words` | `ja` / word | preserve kanji, hiragana and English meaning; inspect source PK and sense scope |
| Burmese Study Advanced | `burmese_app_words` | `my` / word | preserve Burmese spelling and translation; quarantine unknown-owner progress |
| KG Chart | `kg_chart_vocabulary_translations` | per-row / translation | translation rows are not automatically standalone lexemes; inspect parent vocabulary relation |
| Chinese Study | `chinese_study_app_words` | `zh` / word | preserve word ID, reading and meanings after source-column inspection |
| Chinese Study | `chinese_study_app_hanzi_database` | `zh` / character reference | keep character/reference distinction, do not merge by glyph alone |
| Kata Kita | `words` | `ms` / word | preserve Malay text and English gloss; confirm project/account realm and local progress |

Chinese Study Simple, Catalyst and the app-level use of shared KG Chart data still need verified source-path inventories. Akatsuki owns service discovery separately and is not a gatekeeper for vocabulary permissions.

F1C should first ship a **read-only source contract** specifying project, table, typed PK, source-to-form/sense fields, source owner, provenance and ambiguity rules. Do not approve candidate matches by spelling alone. The reconciliation invariant for each source is `total = approved + ambiguous + excluded + unmapped`, with no owner inference from unrelated legacy UUIDs.
