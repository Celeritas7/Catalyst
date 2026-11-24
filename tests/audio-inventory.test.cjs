const {test}=require('node:test'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
test('public inventory tool verifies text/checksums, rejects malformed audio and leaves dry runs independent of credentials',()=>{
  const script=`import sys, pathlib, hashlib
sys.path.insert(0,'tools')
import audio_inventory as a
tone=pathlib.Path('tests/fixtures/audio-tone.mp3').read_bytes()
text='ကျွန်တော် ပန်းသီး စားတယ်။'; key=a.fnv1a8(text)
assert key=='cf50f9f1' and a.mp3(tone)
calls=[]
def get(path,limit):
    calls.append(path)
    return tone,'audio/mpeg'
manifest=a.verified_manifest('my',[text],{'m':'Male','f':'Female'},{'m':[key],'f':[key]},get=get)
assert len(manifest['files'])==2
assert manifest['files'][0]['sha256']==hashlib.sha256(tone).hexdigest()
assert manifest['files'][0]['textSha256']==hashlib.sha256(text.encode()).hexdigest()
assert all(path.startswith('my/') for path in calls)
for body,mime in [(b'', 'audio/mpeg'),(b'<html>bad</html>','audio/mpeg'),(tone,'text/html')]:
    try:a.verified_manifest('my',[text],{'m':'Male','f':'Female'},{'m':[key],'f':[]},get=lambda p,l:(body,mime))
    except ValueError:pass
    else:raise AssertionError('bad audio accepted')
assert a.texts_for('my') and len(a.texts_for('my'))==50
print('Audio inventory verified with synthetic files; no remote requests')
`;
  const result=spawnSync('python3',['-c',script],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);
  const env={...process.env};for(const name of ['SUPABASE_SERVICE_KEY','AZURE_SPEECH_KEY','AZURE_SPEECH_REGION'])delete env[name];
  const dry=spawnSync('python3',['tools/gen_catalyst_audio.py','--lang','my','--dry-run'],{env,encoding:'utf8'});assert.equal(dry.status,0,dry.stderr);assert.match(dry.stdout,/50 unique texts/);assert.match(dry.stdout,/nothing generated or uploaded/);
});
