"""Read-only public recording verifier. No API key, synthesis, upload or DB write.

python tools/audio_inventory.py --lang my --output /path/to/my-clips.json
Publish the resulting clips.json only through a separately authorized upload.
"""
import argparse
import hashlib
import json
import re
import unicodedata
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

BASE = 'https://ulgrfumbwjovbjzjiems.supabase.co/storage/v1/object/public/vocabulary-assets/audio-grammar/'
ROOT = Path(__file__).resolve().parent.parent
LANGUAGES = ('ja', 'my', 'zh', 'mr', 'en')


def norm(text):
    return ' '.join(unicodedata.normalize('NFC', text or '').split())


def fnv1a8(text):
    value = 0x811C9DC5
    for byte in norm(text).encode('utf-8'):
        value = ((value ^ byte) * 0x01000193) & 0xFFFFFFFF
    return f'{value:08x}'


def texts_for(language):
    source = (ROOT / 'js/catalyst-data.js').read_text(encoding='utf-8')
    data = json.loads(source[source.index('{'):source.rindex('}') + 1])
    return sorted({norm(e['t']) for c in data['concepts'] for e in c['entries'].get(language, {}).get('ex', [])})


def mp3(data):
    if len(data) < 4:
        return False
    offset = 0
    if data[:3] == b'ID3':
        if len(data) < 10 or data[3] not in (2, 3, 4) or any(x > 127 for x in data[6:10]):
            return False
        offset = 10 + (data[6] << 21 | data[7] << 14 | data[8] << 7 | data[9])
    if offset + 4 > len(data):
        return False
    a, b, c = data[offset:offset + 3]
    return a == 255 and b & 224 == 224 and b & 24 != 8 and b & 6 != 0 and c & 240 not in (0, 240) and c & 12 != 12


def public_get(path, limit):
    # The caller supplies only validated language/voice/hash paths below.
    request = urllib.request.Request(BASE + path, headers={'Cache-Control': 'no-cache'})
    with urllib.request.urlopen(request, timeout=30) as response:
        if response.url != BASE + path:
            raise ValueError('Unexpected redirect in audio inventory')
        data = response.read(limit + 1)
        if len(data) > limit:
            raise ValueError('Audio response exceeds the size limit')
        return data, response.headers.get_content_type()


def verified_manifest(language, texts, voices, have, rate='-15%', get=public_get):
    if language not in LANGUAGES:
        raise ValueError('Unsupported Catalyst language')
    by_hash = {}
    for text in texts:
        normalized = norm(text)
        key = fnv1a8(normalized)
        if key in by_hash and by_hash[key] != normalized:
            raise ValueError('Text hash collision; publication stopped')
        by_hash[key] = normalized
    files, lists = [], {'m': [], 'f': []}
    for voice in ('m', 'f'):
        if not isinstance(voices.get(voice), str) or not voices[voice] or len(voices[voice]) > 128:
            raise ValueError('Both recorded voice names must be declared')
        hashes = have.get(voice)
        if not isinstance(hashes, list) or any(not isinstance(h, str) or not re.fullmatch('[0-9a-f]{8}', h) for h in hashes) or len(hashes) != len(set(hashes)):
            raise ValueError('Invalid or duplicate recording hashes')
        for key in sorted(set(hashes) & set(by_hash)):
            data, mime = get(f'{language}/{voice}/{key}.mp3', 20 * 1024 * 1024)
            if mime != 'audio/mpeg' or not mp3(data):
                raise ValueError(f'Invalid recording: {language}/{voice}/{key}')
            files.append({'hash': key, 'voice': voice, 'mime': 'audio/mpeg', 'bytes': len(data),
                          'sha256': hashlib.sha256(data).hexdigest(),
                          'textSha256': hashlib.sha256(by_hash[key].encode('utf-8')).hexdigest()})
            lists[voice].append(key)
    if sum(f['bytes'] for f in files) > 200 * 1024 * 1024:
        raise ValueError('Audio inventory is too large')
    return {'version': 2, 'lang': language, 'rate': rate, 'voices': voices,
            'generated_at': datetime.now(timezone.utc).isoformat(timespec='seconds'),
            **lists, 'files': files}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--lang', choices=LANGUAGES, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error('Output already exists; choose a new file to preserve it.')
    try:
        raw, mime = public_get(args.lang + '/clips.json', 1024 * 1024)
        if mime != 'application/json':
            raise ValueError('Audio manifest is not JSON')
        source = json.loads(raw)
        if source.get('lang') != args.lang:
            raise ValueError('Manifest language does not match')
        manifest = verified_manifest(args.lang, texts_for(args.lang), source.get('voices', {}), source, source.get('rate', ''))
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with args.output.open('x', encoding='utf-8') as stream:
            json.dump(manifest, stream, ensure_ascii=False, indent=2)
            stream.write('\n')
        print(f"Verified {len(manifest['files'])} public recordings. Local inventory created; nothing uploaded.")
    except Exception as exc:
        parser.exit(1, 'Audio verification failed; no new inventory published: ' + str(exc) + '\n')


if __name__ == '__main__':
    main()
