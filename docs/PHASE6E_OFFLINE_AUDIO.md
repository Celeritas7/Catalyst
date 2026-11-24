# Phase 6E — optional verified offline audio

Implemented 2026-11-25 (Japan), based on merged Phase 6D PR #22,
`5363f4591cd48ea4fa3f68f1b9623106de54ccc8`. Release
`6e993fd5a1ca723dd86f`: 252 public app files, 11,575,825 bytes. Audio files are
optional separate downloads; their bytes are not included in that app total.

## Result and production availability

**Study offline → Recorded lesson audio** checks the selected learning language
and male/female voice, displays available lesson coverage and verified byte size,
and supports download, pause/resume, repair, verification and selective removal.
Normal and slow playback use the same saved MP3. Existing notebooks, corrections,
reviews, account snapshots and public app files keep their storage locations.

The read-only Technical Storage audit found **zero objects** in bucket
`vocabulary-assets` under `audio-grammar/`. All five public manifest requests
returned HTTP 400 with `404` / `not_found` / `NoSuchKey`. This is stronger evidence
than the earlier 6A manifest-only check. No real recorded-speech pack can be
downloaded yet. The UI reports this without disabling text study or claiming
device speech is downloaded audio.

| Language | Bundled unique example texts | Published manifest | Published recordings |
| --- | ---: | --- | ---: |
| Burmese (`my`) | 50 | Missing | 0 |
| Japanese (`ja`) | 48 | Missing | 0 |
| Chinese (`zh`) | 48 | Missing | 0 |
| Marathi (`mr`) | 47 | Missing | 0 |
| English (`en`) | 24 | Missing | 0 |

The counts describe bundled example texts, not every guided/pattern/custom
sentence. No private word list, learner writing or account identifier is sent to
an audio service. There were no Azure/model calls, Storage uploads, database
changes or deployments in this phase. The existing paid sentence limit remains
zero. Actual audio publication is a separate task; it is not required to test
text-only offline learning in Phase 6F.

## Verified inventory contract

The fixed public path remains `audio-grammar/<language>/clips.json`. Version 2
retains legacy `m` and `f` hash arrays for the online player and adds:

```json
{
  "version": 2,
  "lang": "my",
  "voices": {"m": "recorded voice name", "f": "recorded voice name"},
  "m": [],
  "f": ["<8 lowercase hex text hash>"],
  "files": [{
    "voice": "f",
    "hash": "<8 lowercase hex text hash>",
    "mime": "audio/mpeg",
    "bytes": 12345,
    "sha256": "<64 lowercase hex audio SHA-256>",
    "textSha256": "<64 lowercase hex normalized text SHA-256>"
  }]
}
```

This is an illustrative schema, not a usable manifest. The build pins the full
normalized-text SHA-256 for each bundled example in both runtime and worker.
Only matching language/voice/text entries are eligible. NFC and collapsed
whitespace match the existing FNV filename convention; the full text fingerprint
prevents an eight-character hash collision from selecting another sentence.
The builder refuses collisions. Legacy inventories can still play online, but
cannot claim offline readiness until verified v2 metadata is published.

`tools/audio_inventory.py` reads existing public manifests and MP3s and produces
a **new local file**; it needs no API key and cannot synthesize or upload audio:

```sh
python tools/audio_inventory.py --lang my --output /path/to/new-my-clips.json
```

Missing files, wrong MIME, invalid MP3 framing or failed reads stop publication.
The current empty Storage audit means this command will currently fail clearly.
Output is not automatically installed on the server. A future approved upload
must preserve real voice identity and pronunciation provenance. Integrity
checks establish bytes/text mapping, not linguistic correctness.

The existing manual Azure generator now uses the same verifier before publishing
its manifest. Its `--dry-run` works without credentials or network activity.
Burmese dry-run: 50 texts, 1,016 characters per voice / 2,032 for both. Actual
generation remains optional and can incur the configured provider's charge.

## Download, playback and preservation

- Downloads require a matching active app worker with audio protocol 1. A legacy
  worker prompts for app preparation first. No automatic audio download occurs.
- The worker alone owns mutations, with one audio operation at a time. Update
  activation waits for audio and existing writing guards. Closing the panel
  requests a pause; browser suspension can still interrupt background work.
- Fetches omit credentials, refuse redirects and enforce a 30-second request/body
  deadline, readable response, MIME, byte limit, MP3 signature and SHA-256. Limits:
  1 MiB manifest, 20 MiB/file, 100 MiB/voice pack, 1,000 selected clips.
- Candidate and active packs are separate. Only a complete verified candidate
  becomes active. Failed replacements leave the previous active pack readable.
  Resume rescans bytes, reuses valid content and retries incomplete/damaged files.
- The app-path-specific audio cache stores one blob per SHA-256. Shared bytes
  are not counted twice within a pack or fetched again for a second voice.
  Readiness is recalculated after startup, focus, verification and missing-file
  reports; a damaged active pack is labelled for repair.
- Playback uses exact same-origin URLs under `__catalyst_audio__/`, restricted
  to the active language/voice/hash/checksum. The worker verifies saved bytes and
  serves normal 200 responses or single-range 206/416 responses for media seeking.
  It does not intercept arbitrary remote audio, REST, auth or sibling app URLs.
- `Audio.play()` is called directly in the tap handler. Slow playback uses 0.7×
  with pitch preservation when supported. Delayed failures from an older playback
  attempt cannot cancel a newer one. Device TTS remains separately labelled and
  is not guaranteed offline.
- Removal previews the exact language and voice. It detaches only that pack,
  retains shared blobs referenced by another pack, and journals pending deletion
  for interruption recovery. Unknown/corrupt metadata is preserved rather than
  reset. App downloads, account data and writing are not removed.

Browser storage is still evictable. Audio checks do not prove persistent storage
will survive OS eviction, and recovery JSON contains writing/preferences rather
than audio bytes. Re-download missing public audio after reconnecting.

## Validation and limits

`npm run check:app`, `npm run check:build`, all **118 automated tests** and
`git diff --check` pass. The previous 104-test baseline remains covered.

Automated coverage includes inventory validation and exact text ownership, a real
synthetic MP3, range responses, missing/empty/corrupt files, HTTP/auth/network
errors, interrupted resume, quota rejection, active-pack preservation, eviction
and repair, concurrent jobs, shared-byte removal and retry after interrupted
removal. Worker integration proves optional-audio errors cannot turn app-file
readiness into an error. Compiled UI tests cover unavailable/ready states,
progress, stale status arriving after a check, and removal preview/cancel/confirm.
The player test covers synchronous user-gesture playback, normal/slow file reuse,
voice changes and obsolete playback errors. Python tests cover the read-only
verifier and credential-free generator dry-run. Existing preservation/account
tests run unchanged alongside these checks.

Chromium QA uses a separate `/Catalyst-6E/` path, synthetic accounts, blocked
external connections and the generated test tone documented in
`tests/fixtures/README.md`. Preview build `8fd10521d4b89180264a` contains one
explicitly labelled **QA tone — not speech**, mapped to one of 50 Burmese example
texts. The production audio URL is replaced only inside the ignored preview
worker; production output is unchanged.

The preview downloaded and verified 253 app files, then the 6,572-byte optional
tone. The UI showed 1/50 available texts, 1/1 files and the actual fixture voice.
Normal lesson playback decoded and ended at 1×; the practice Slow control decoded
and ended at 0.7×, both from the saved virtual URL.

After switching the fixture offline, stopping the preview server and closing
the only 6E tab, a new tab reopened the cached lesson. It restored app readiness
and the saved audio source; normal and slow playback again decoded and ended at
1× and 0.7× from saved URLs. The original browser process remained running; this
is not a full browser-process restart or physical iPad acceptance.

Physical iPad Safari/Home Screen, Android, real speech quality and real production
audio remain unverified. A synthetic browser/server-stop check does not prove
physical Airplane-mode behavior or full browser-process termination. Phase 6F
must record those results separately using the existing
[acceptance matrix](PHASE6_ACCEPTANCE.md), without clearing learner data.

Relevant primary browser references:
[HTMLMediaElement.play](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play),
[HTTP range requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests).
