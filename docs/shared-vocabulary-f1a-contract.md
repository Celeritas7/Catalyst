# Shared Vocabulary Contract — F1A (proposal only)

Status: **design-only, not deployed**. No database migrations, API adapters, or app behavior changes are included in this PR.

## Ownership boundaries

- `lex_*` canonical public language content is separate from private `lex_user_*` progress and account links.
- Canonical IDs are immutable UUIDs, allocated once; original source IDs remain valid.
- All clients authenticate through the vocabulary project's identity provider or a verified cross-project account link. A client-supplied user ID is never authoritative.
- All progress RLS must enforce `user_id = (select auth.uid())` for SELECT/INSERT/UPDATE/DELETE, including UPDATE `WITH CHECK`. Grant only needed operations; no service-role secrets in browsers.
- Unassigned Burmese legacy events and Kata Kita local-only reviews are not assigned to accounts automatically.

## Versioned API contract

Version `lex-v1` (planned; endpoint names indicative):

- `GET /v1/languages`: available language/script combinations.
- `GET /v1/lexemes?language=...`: paginated canonical forms and senses; version cursor for offline caches.
- `GET /v1/source-mappings?app=...&source_id=...`: resolve existing source IDs without replacing them.
- `GET /v1/me/evidence?language=...`: authenticated user's raw skill evidence and interpretations, with provenance and source semantics.
- `POST /v1/me/evidence`: append one idempotent event with original source event key, skill, raw score/category, label, timestamp, evidence type, and device event ID.
- `GET /v1/sync?cursor=...`: incremental content changes and tombstones; offline queued user progress synced separately and deduplicated.

Contract registry may later be tracked by Akatsuki. Akatsuki is discovery/monitoring, **not** a required proxy or permission authority. All app authorizations are enforced by the vocabulary API and underlying RLS.

## Proposed additive tables

- `lex_languages(code, script, name, active)`
- `lex_lexemes(id, language_code, lemma, part_of_speech, status)`
- `lex_forms(id, lexeme_id, script, form, reading, variant_kind)`
- `lex_senses(id, lexeme_id, sense_no, usage_register, domain)`
- `lex_glosses(id, sense_id, reference_language_code, gloss, provenance)`
- `lex_source_records(id, source_project, source_app, source_table, source_pk_text, lexeme_id nullable, sense_id nullable, form_id nullable, source_hash, status, batch_id)` with unique immutable source tuple
- `lex_match_candidates(id, source_record_id, candidate_lexeme_id, decision, score_explanation, reviewed_at)`
- `lex_source_links(id, source_app, source_relation, source_pk_text, lexeme_id nullable, sense_id nullable, relation_kind, media_ref)`
- `lex_user_evidence(id, user_id, lexeme_id nullable, sense_id nullable, skill, source_app, source_event_key, raw_rating, raw_label, raw_payload, occurred_at, imported_at)` with unique event-source key; immutable history
- `lex_user_projection(user_id, lexeme_id, sense_id nullable, skill, scheme_version, state, recomputed_at)`
- `lex_legacy_claims(source_record_id, status, owner_user_id nullable, proof_method, verified_at)`

Use stable normalized source PK encoding and preserve original key type in provenance. Forms are **not** unique by spelling; canonical merging requires language, reading, POS and meaning compatibility, with ambiguous matches queued.

## Required semantics

- KG Chart ratings are **categories** (1 Monthly Review, 5 Don't know), not ascending mastery. Preserve full original category catalog.
- Burmese Study buttons 0–6 are event types; derived practice mastery 0–5 is a separate model. Unowned legacy records are quarantined.
- Burmese Song review state is a separate account-linked source.
- Japanese markings may target a written surface shared by multiple senses; preserve that scope and custom category labels.
- Kata Kita local review state must remain device-origin until owner verifies import.
- Recognition, listening, speaking, writing, usage, and grammar knowledge are independent dimensions. Grammar mastery is not derived from vocabulary recognition.

## F1B implementation gates

1. Verify each deployed app's actual project and account realm (especially Kata Kita) and source read/write paths.
2. Capture encrypted DB and media manifests, source totals, policy definitions, baseline deployment SHAs, and restore drill.
3. Draft reversible migrations and read-only deterministic importer. Initial dry-run must never write.
4. For each source, assert total = approved + ambiguous + excluded + unmapped; verify all legacy relationships/media remain resolvable.
5. Test idempotent reruns, source-content changes, offline event replay, cross-user isolation and anon-denial.
6. Merge only after review; no production read/write cutover until F2 pilot and parity checks.

## Compatibility and rollback

Legacy apps keep using existing IDs and legacy tables. New consumers resolve source IDs via mapping table. Never silently double-write. Pilot should explicitly designate a source-of-truth writer and an idempotent reconciliation strategy. Feature-flag rollback switches adapters back to original paths; avoid dropping source tables until explicit F4 approval.
