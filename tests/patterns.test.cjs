const {test}=require('node:test');
const assert=require('node:assert/strict');
require('../js/catalyst-patterns.js');
require('../js/catalyst-notebook.js');
const p=globalThis.CatalystPatterns,n=globalThis.CatalystNotebook;
const eat='pattern-my-eat-food-v1',drink='pattern-my-drink-v1',go='pattern-my-go-place-v1';
const learned=p.words.map(w=>({id:w.key,language:'my',native:w.native,english:w.english[0]}));

test('patterns constrain noun meaning, language and slot; one learned noun is enough',()=>{
  assert.deepEqual(p.choices([learned[0]],eat).map(w=>w.key),['apple']);
  assert.equal(p.choices([],eat).length,0);
  assert.equal(p.choices([{...learned[0],language:'ja'}],eat).length,0);
  assert.equal(p.choices([{...learned[0],english:'apple tree'}],eat).length,0);
  assert.equal(p.choices([{...learned[0],native:'ပန်းသီးဖျော်ရည်'}],eat).length,0);
  assert.equal(p.choices([{id:'x',language:'my',native:'ဂျပန်ကြက်သွန်မြိတ်',english:'Japanese leek'}],go).length,0);
  assert.equal(p.choices([learned[6],{...learned[6],id:'other-coffee'}],drink).length,1);
  for(const args of [[eat,'water','masculine'],[go,'apple','feminine'],[eat,'apple','unknown'],['other','apple','masculine']])assert.throws(()=>p.build(...args,learned));
  assert.throws(()=>p.build(eat,'apple','masculine',[]));
});
test('Burmese frames and Marathi agreement are explicit; place forms are inflected',()=>{
  const apple=p.build(eat,'apple','masculine',learned);
  assert.equal(apple.t,'ကျွန်တော် ပန်းသီး စားတယ်။');
  assert.equal(apple.meanings.mr,'मी सफरचंद खातो.');
  assert.equal(p.build(eat,'rice','feminine',learned).meanings.mr,'मी भात खाते.');
  const water=p.build(drink,'water','feminine',learned);
  assert.equal(water.t,'ကျွန်မ ရေ သောက်တယ်။');assert.equal(water.meanings.mr,'मी पाणी पिते.');assert.equal(water.meanings.en,'I drink water.');
  assert.equal(p.build(go,'school','masculine',learned).t,'ကျွန်တော် ကျောင်းကို သွားတယ်။');
  assert.equal(p.build(go,'school','masculine',learned).meanings.mr,'मी शाळेत जातो.');
  assert.equal(p.build(go,'home','feminine',learned).meanings.en,'I go home.');
  for(const pattern of p.patterns)for(const choice of p.choices(learned,pattern.id))for(const speaker of Object.keys(p.speakers)){
    const example=p.build(pattern.id,choice.key,speaker,learned);
    assert.match(example.dev,/\p{Script=Devanagari}/u);assert.ok(!/[\p{Script=Myanmar}a-z]/u.test(example.dev));assert.ok(example.h.every(h=>example.t.includes(h)));
  }
});
function client(tables,{allowed=true,errorTable='',ignoreScope=false}={}){
  const calls=[];
  return {calls,rpc:async name=>{calls.push({rpc:name});return {data:allowed,error:null};},from(table){
    const filters=[],call={table,filters};calls.push(call);let start=0,end=Infinity;
    const q={select(columns){call.columns=columns;return q;},eq(k,v){filters.push(['eq',k,v]);return q;},in(k,v){filters.push(['in',k,v]);return q;},not(k,op,v){filters.push(['not',k,v]);return q;},order(k){call.order=k;return q;},range(a,b){start=a;end=b;call.range=[a,b];return q;},then(resolve,reject){
      let data=tables[table]||[];
      if(!ignoreScope)data=data.filter(r=>filters.every(([kind,k,v])=>kind==='eq'?r[k]===v:kind==='in'?v.includes(r[k]):r[k]!==v));
      return Promise.resolve(table===errorTable?{error:{message:'offline'},data:null}:{data:data.slice(start,end+1),error:null}).then(resolve,reject);
    }};return q;
  }};
}
const translation=(id,native,english)=>({vocabulary_id:id,language_code:'my',native_text:native,vocabulary:{english_text:english}});
test('learned adapter paginates and combines only own Burmese completions and correct answers',async()=>{
  const answers=Array.from({length:501},(_,i)=>({id:'a'+String(i).padStart(4,'0'),session_id:'s1',vocabulary_id:i===0||i===500?'apple':'other',is_correct:true}));
  const db=client({
    kg_chart_topic_completions:[{user_id:'u1',language_code:'my',topic_id:'food'},{user_id:'u2',language_code:'my',topic_id:'drink'},{user_id:'u1',language_code:'ja',topic_id:'fruit'}],
    kg_chart_vocabulary:[{id:'rice',topic_id:'food'},{id:'tea',topic_id:'drink'}],
    kg_chart_quiz_sessions:[{id:'s1',user_id:'u1',language_code:'my'},{id:'s2',user_id:'u2',language_code:'my'}],
    kg_chart_quiz_answers:[...answers,{id:'foreign',session_id:'s2',vocabulary_id:'tea',is_correct:true}],
    kg_chart_vocabulary_translations:[translation('apple','ပန်းသီး','Apple'),translation('rice','ထမင်း','cooked rice'),translation('tea','လက်ဖက်ရည်','Tea')],
  });
  const result=await p.load(db,'u1');assert.deepEqual(result.map(w=>w.id).sort(),['apple','rice']);
  assert.ok(db.calls.some(c=>c.table==='kg_chart_quiz_answers'&&c.range[0]===500));
  for(const table of ['kg_chart_topic_completions','kg_chart_quiz_sessions']){
    const call=db.calls.find(c=>c.table===table);assert.ok(call.filters.some(f=>f[1]==='user_id'&&f[2]==='u1'));assert.ok(call.filters.some(f=>f[1]==='language_code'&&f[2]==='my'));
  }
});
test('adapter rejects foreign rows, duplicate retry answers and unlearned translations even if returned',async()=>{
  const db=client({
    kg_chart_topic_completions:[{user_id:'u2',language_code:'my',topic_id:'food'}],
    kg_chart_quiz_sessions:[{id:'mine',user_id:'u1',language_code:'my'},{id:'foreign',user_id:'u2',language_code:'my'}],
    kg_chart_quiz_answers:[{id:'retry',session_id:'mine',vocabulary_id:'apple',is_correct:true},{id:'retry',session_id:'mine',vocabulary_id:'apple',is_correct:true},{id:'f1',session_id:'foreign',vocabulary_id:'apple',is_correct:true},{id:'wrong',session_id:'mine',vocabulary_id:'apple',is_correct:false}],
    kg_chart_vocabulary_translations:[translation('apple','ပန်းသီး','Apple')],
  },{ignoreScope:true});assert.deepEqual(await p.load(db,'u1'),[]);
});
test('source failures and denied access never become zero learned words',async()=>{
  const denied=client({},{allowed:false});await assert.rejects(p.load(denied,'u1'),/does not have KG Chart access/);assert.equal(denied.calls.filter(c=>c.table).length,0);
  await assert.rejects(p.load(client({},{errorTable:'kg_chart_topic_completions'}),'u1'),/Could not read/);await assert.rejects(p.load(client({}),''),/Sign in/);
});
test('versioned patterns save, deduplicate, export/merge and keep original writing and corrections',()=>{
  const original=n.correct(n.add(n.parse(null),{id:'own',original:'My own writing',meaning:'My meaning',meaningLanguage:'en',createdAt:'2026-11-24'}),'own','Keep this correction','2026-11-24');
  const example=p.build(eat,'apple','feminine',learned),input={pilot:{id:example.patternId,language:'my',concept:'verb_final'},targetLanguage:'my',id:'pattern1',original:example.t,meaning:example.meanings.mr,meaningLanguage:'mr',createdAt:'2026-11-24'};
  const saved=n.addFromActivity(original,input);assert.equal(saved.added,true);assert.deepEqual(saved.data.entries[1],original.entries[0]);assert.equal(n.addFromActivity(saved.data,{...input,id:'duplicate'}).added,false);
  const backup=n.parseImport(JSON.stringify({language:'my',...saved.data}),'my');assert.deepEqual(n.merge(saved.data,backup).data,saved.data);
  assert.equal(p.savedReading(backup.entries[0]),example.dev);assert.equal(p.savedReading({...backup.entries[0],original:'Edited user text'}),'');
  assert.throws(()=>n.parseImport(JSON.stringify({language:'my',...saved.data}),'ja'));assert.throws(()=>n.addFromActivity(original,{...input,targetLanguage:'ja'}));
});
