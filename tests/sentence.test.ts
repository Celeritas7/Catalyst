// Node 22.18+; no credentials, network, or model charges.
import { makeHandler, learnedWords, check, buildPrompt, TARGETS, MIN_WORDS } from '../supabase/functions/catalyst-sentence/core.ts';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const W: Record<string,string[]> = {
  ja:['水','飲む','本','読む','日本','行く','泳ぐ','明日','来る','猫'],
  my:['ရေ','သောက်','စာအုပ်','ဖတ်','ဂျပန်','သွား','ရေကူး','မနက်ဖြန်','လာ','ကြောင်'],
  zh:['水','喝','书','看','日本','去','游泳','明天','来','猫'],
  mr:['पाणी','पितो','पुस्तक','वाचतो','जपान','जातो','पोहतो','उद्या','येतो','मांजर'],
};
const examples:Record<string,any>={
  ja:{t:'水が飲みたい。',r:'みず が のみたい',h:['たい'],words:['水','飲む']},
  my:{t:'ရေ သောက်ချင်တယ်။',h:['ချင်'],words:['ရေ','သောက်']},
  zh:{t:'我想喝水。',r:'wǒ xiǎng hē shuǐ',h:['想'],words:['水','喝']},
  mr:{t:'मी पाणी पितो.',h:['पितो'],words:['पाणी','पितो']},
};
const good=(target='my')=>({en:'I want to drink water.',[target]:examples[target],meanings:{mr:'मला पाणी प्यायचं आहे.'}});
const known=(target='my')=>W[target].map(w=>({w,en:'word'}));
const request=(body:any={concept_id:'want_tai',target_language:'my',meaning_language:'mr'},auth='Bearer token')=>new Request('https://test.local/f',{
  method:'POST',headers:{Authorization:auth,'Content-Type':'application/json'},body:JSON.stringify(body),
});
const base=(target='my')=>({
  kg_chart_topic_completions:[{user_id:'u1',language_code:target,topic_id:'drinks'}],
  kg_chart_vocabulary:W[target].map((_,i)=>({id:`v${i}`,topic_id:'drinks'})),
  kg_chart_quiz_sessions:[],kg_chart_quiz_answers:[],
  kg_chart_vocabulary_translations:W[target].map((w,i)=>({vocabulary_id:`v${i}`,language_code:target,native_text:w,vocabulary:{english_text:'word'}})),
  catalyst_generated:[],catalyst_concepts:[{id:'want_tai',title:'Want to',summary:'Desire'}],
  catalyst_entries:TARGETS.map(language_code=>({concept_id:'want_tai',language_code,form:examples[language_code].h[0],note:'Use the described expression',examples:[]})),
});
function fixture(tables:any=base(),options:any={}){
  const reads:any[]=[],inserts:any[]=[],calls:any[]=[],rpcs:any[]=[];
  let quotaUsed=0;
  const value=(row:any,col:string)=>col.split('->').reduce((x,k)=>x?.[k],row);
  const client={auth:{getUser:async()=>({data:{user:options.noUser?null:{id:'u1'}},error:options.authError||null})},
    rpc:async(name:string,args:any)=>{
      rpcs.push({name,args});
      if(name==='kg_chart_is_allowed')return {data:options.allowed!==false,error:options.allowError||null};
      assert.equal(name,'catalyst_reserve_generation');assert.deepEqual(args,{p_user_id:'u1'});
      const limit=options.limit??30,allowed=quotaUsed<limit;
      if(allowed)quotaUsed++;
      return {data:{allowed,used:quotaUsed,limit},error:options.quotaError||null};
    },
    from(table:string){
      const filters:any[]=[],state:any={table,filters,range:null,order:null,limit:null,insert:null};reads.push(state);
      const resolve=()=>{
        if(options.errors?.[table]||state.insert&&options.saveError)return {data:null,error:{message:'PRIVATE DB DETAIL'}};
        if(state.insert){inserts.push(state.insert);const row={id:'saved',...state.insert};tables[table].push(row);return {data:[row],error:null};}
        let data=[...(tables[table]||[])];
        for(const [op,col,v]of filters)data=data.filter(row=>op==='eq'?value(row,col)===v:op==='in'?v.includes(value(row,col)):value(row,col)!=null);
        if(state.order)data.sort((a,b)=>String(value(a,state.order)).localeCompare(String(value(b,state.order))));
        if(state.range)data=data.slice(state.range[0],state.range[1]+1);
        if(state.limit!==null)data=data.slice(0,state.limit);
        return {data,error:null};
      };
      const chain:any={
        select(){return chain;},eq(col:string,v:any){filters.push(['eq',col,v]);return chain;},
        in(col:string,v:any){filters.push(['in',col,v]);return chain;},
        not(col:string,_op:string,v:any){filters.push(['not',col,v]);return chain;},
        order(col:string){state.order=col;return chain;},range(a:number,b:number){state.range=[a,b];return chain;},
        limit(n:number){state.limit=n;return chain;},insert(row:any){state.insert=row;return chain;},
        then(ok:any,bad:any){return Promise.resolve(resolve()).then(ok,bad);},
        async maybeSingle(){const r=resolve();return {...r,data:r.data?.[0]||null};},
        async single(){return chain.maybeSingle();},
      };return chain;
    },
  };
  const env=options.env??{ANTHROPIC_API_KEY:'fake-key',CATALYST_MODEL:'test-explicit-model'};
  const handler=makeHandler({env:k=>env[k],userClient:()=>client,adminClient:()=>client,fetch:async(_url,init)=>{
    calls.push(JSON.parse(String(init?.body)));
    if(options.networkError)throw new Error('PRIVATE PROVIDER DETAIL');
    if(options.providerError)return new Response('PRIVATE PROVIDER DETAIL',{status:500});
    const answer=(options.answers||[good()])[Math.min(calls.length-1,(options.answers||[good()]).length-1)];
    return new Response(JSON.stringify({content:[{type:'text',text:typeof answer==='string'?answer:JSON.stringify(answer)}]}));
  }});
  return {handler,client,reads,inserts,calls,rpcs,get used(){return quotaUsed;}};
}

test('each target can generate with NO other-language progress',async()=>{
  for(const target of TARGETS){
    const f=fixture(base(target),{answers:[good(target)]});
    const r=await f.handler(request({concept_id:'want_tai',target_language:target,meaning_language:'mr',user_id:'attacker'}));
    const result=await r.json();assert.equal(r.status,200,JSON.stringify(result));
    assert.deepEqual(result.known,{[target]:10});assert.equal(f.inserts[0].user_id,'u1');
    assert.equal(f.inserts[0].target_language,target);assert.equal(f.inserts[0].meaning_language,'mr');
    assert.deepEqual(Object.keys(result.row.sentences).sort(),['en','meanings',target].sort());
    for(const read of f.reads.filter(x=>['kg_chart_topic_completions','kg_chart_quiz_sessions','kg_chart_vocabulary_translations','catalyst_entries'].includes(x.table))){
      assert.ok(read.filters.some(x=>x[1]==='language_code'&&x[2]===target));
    }
    assert.equal(f.calls[0].model,'test-explicit-model');assert.equal(f.used,1);
  }
});
test('meaning and target are independent; English requires no Marathi response',async()=>{
  const f=fixture(base('ja'),{answers:[{en:'I want to drink water.',ja:examples.ja}]});
  const r=await f.handler(request({concept_id:'want_tai',target_language:'ja',meaning_language:'en'}));
  assert.equal(r.status,200);assert.deepEqual(f.inserts[0].sentences.meanings,{en:'I want to drink water.'});
});
test('missing/invalid target or meaning and legacy clients fail before model/quota',async()=>{
  for(const body of [{concept_id:'want_tai'},{concept_id:'want_tai',target_language:'en',meaning_language:'mr'},
    {concept_id:'want_tai',target_language:['my'],meaning_language:'mr'},
    {concept_id:'want_tai',target_language:'my',meaning_language:'xx'},
    {concept_id:'DROP TABLE',target_language:'my',meaning_language:'en'}]){
    const f=fixture();assert.equal((await f.handler(request(body))).status,400);assert.equal(f.calls.length,0);assert.equal(f.used,0);
  }
});
test('auth and allow-list fail closed, before reading progress',async()=>{
  for(const [options,status]of [[{noUser:true},401],[{authError:{}},401],[{allowed:false},403],[{allowError:{}},503]]as any){
    const f=fixture(base(),options);assert.equal((await f.handler(request())).status,status);assert.equal(f.reads.length,0);assert.equal(f.calls.length,0);
  }
  const f=fixture();assert.equal((await f.handler(request(undefined,''))).status,401);
});
test('GET exposes version/configuration, never keys; explicit model is required',async()=>{
  for(const env of [{},{ANTHROPIC_API_KEY:'secret'},{CATALYST_MODEL:'test'}]){
    const f=fixture(base(),{env});const response=await f.handler(new Request('https://test/f'));
    assert.deepEqual(await response.json(),{ok:true,configured:false,api_version:2,targets:TARGETS});
    assert.equal((await f.handler(request())).status,503);assert.equal(f.calls.length,0);
  }
});
test('few words reports selected target only and consumes no quota',async()=>{
  const tb=base();tb.kg_chart_vocabulary_translations=tb.kg_chart_vocabulary_translations.slice(0,3);
  const f=fixture(tb);const result=await(await f.handler(request())).json();
  assert.equal(result.reason,'few_words');assert.deepEqual(result.known,{my:3});assert.match(result.message,new RegExp(`3/${MIN_WORDS}`));
  assert.equal(f.calls.length,0);assert.equal(f.used,0);
});
test('source failures are unavailable, never zero words; no charge',async()=>{
  for(const table of ['kg_chart_topic_completions','kg_chart_vocabulary','kg_chart_quiz_sessions','kg_chart_vocabulary_translations']){
    const f=fixture(base(),{errors:{[table]:true}});const r=await f.handler(request());const result=await r.json();
    assert.equal(r.status,503);assert.equal(result.reason,'vocabulary');assert.equal(f.used,0);assert.equal(f.calls.length,0);
    assert.doesNotMatch(JSON.stringify(result),/PRIVATE/);
  }
});
test('missing content and history errors do not consume quota',async()=>{
  const tb=base();tb.catalyst_entries=[];
  const missing=fixture(tb);assert.equal((await missing.handler(request())).status,422);assert.equal(missing.used,0);
  for(const table of ['catalyst_concepts','catalyst_entries','catalyst_generated']){
    const f=fixture(base(),{errors:{[table]:true}});assert.equal((await f.handler(request())).status,503);assert.equal(f.used,0);
  }
});
test('quota exhausted or unavailable prevents a paid call',async()=>{
  for(const options of [{limit:0},{quotaError:{}}]){
    const f=fixture(base(),options);const r=await f.handler(request());assert.equal(r.status,options.limit===0?429:503);assert.equal(f.calls.length,0);
  }
});
test('bad first answer retries once within ONE reserved request',async()=>{
  const bad=good();bad.my={...bad.my,words:['unknown']};
  const f=fixture(base(),{answers:[bad,good()]});assert.equal((await f.handler(request())).status,200);
  assert.equal(f.calls.length,2);assert.equal(f.used,1);assert.match(f.calls[1].messages[0].content,/listed content words/);
});
test('two invalid answers cannot be saved',async()=>{
  const f=fixture(base(),{answers:['not JSON']});const r=await f.handler(request());
  assert.equal(r.status,422);assert.equal((await r.json()).reason,'invalid');assert.equal(f.calls.length,2);assert.equal(f.inserts.length,0);assert.equal(f.used,1);
});
test('provider and save errors stay explicit and do not leak internal details',async()=>{
  for(const options of [{providerError:true},{networkError:true},{saveError:true}]){
    const f=fixture(base(),options);const r=await f.handler(request());const result=await r.json();
    assert.equal(r.status,options.saveError?503:502);assert.doesNotMatch(JSON.stringify(result),/PRIVATE/);assert.match(result.message,/counts/);assert.equal(f.used,1);
  }
});
test('word queries filter both user and language; repeated correct answers only',async()=>{
  const tb:any=base();tb.kg_chart_topic_completions=[{topic_id:'drinks',user_id:'other',language_code:'my'},{topic_id:'drinks',user_id:'u1',language_code:'ja'}];
  tb.kg_chart_quiz_sessions=[{id:'mine',user_id:'u1',language_code:'my'},{id:'other',user_id:'u2',language_code:'my'},{id:'ja',user_id:'u1',language_code:'ja'}];
  tb.kg_chart_quiz_answers=[
    {id:1,session_id:'mine',vocabulary_id:'v0',is_correct:true},{id:2,session_id:'mine',vocabulary_id:'v0',is_correct:true},
    {id:3,session_id:'mine',vocabulary_id:'v1',is_correct:true},{id:4,session_id:'mine',vocabulary_id:'v1',is_correct:false},
    {id:5,session_id:'other',vocabulary_id:'v2',is_correct:true},{id:6,session_id:'other',vocabulary_id:'v2',is_correct:true},
    {id:7,session_id:'ja',vocabulary_id:'v3',is_correct:true},{id:8,session_id:'ja',vocabulary_id:'v3',is_correct:true}];
  const f=fixture(tb);assert.deepEqual(await learnedWords(f.client,'u1','my'),[{w:'ရေ',en:'word'}]);
  const failed=fixture(tb,{errors:{kg_chart_quiz_answers:true}});await assert.rejects(()=>learnedWords(failed.client,'u1','my'));
});
test('source pagination includes records beyond 1000 instead of silent truncation',async()=>{
  const tb:any=base();tb.kg_chart_topic_completions=[];
  tb.kg_chart_quiz_sessions=Array.from({length:1001},(_,i)=>({id:`s${String(i).padStart(5,'0')}`,user_id:'u1',language_code:'my'}));
  tb.kg_chart_quiz_answers=[{id:1,session_id:'s01000',vocabulary_id:'v0',is_correct:true},{id:2,session_id:'s01000',vocabulary_id:'v0',is_correct:true}];
  const f=fixture(tb);assert.equal((await learnedWords(f.client,'u1','my'))[0].w,'ရေ');
  assert.ok(f.reads.some(r=>r.table==='kg_chart_quiz_sessions'&&r.range?.[0]===1000));
});
test('validator strips unrelated output, requires meaning/highlights/readings and declared words',()=>{
  assert.deepEqual(check(good('ja'),known('ja'),{target:'ja',meaning:'mr'}).problems,[]);
  const extra={...good(),ja:examples.ja};assert.equal(check(extra,known(),{target:'my',meaning:'mr'}).sentences.ja,undefined);
  const cases=[{...good(),meanings:{}},{...good(),my:{...examples.my,h:['missing']}},{...good(),my:{...examples.my,words:['ကြောင်']}},
    {...good(),my:{...examples.my,words:['unknown']}},{...good(),my:{...examples.my,t:'English only'}}];
  for(const answer of cases)assert.ok(check(answer,known(),{target:'my',meaning:'mr'}).problems.length);
  assert.match(check({...good('ja'),ja:{...examples.ja,r:'水'}},known('ja'),{target:'ja',meaning:'en'}).problems.join(),/kana/);
  assert.match(check({...good('zh'),zh:{...examples.zh,r:'水'}},known('zh'),{target:'zh',meaning:'en'}).problems.join(),/pinyin/);
});
test('prompt contains selected words, form, previous meaning and requested translation',()=>{
  const p=buildPrompt({title:'Want to',summary:'Desire'},{form:'ချင်',note:'n'},known(),['I want tea.'],{target:'my',meaning:'mr'});
  assert.match(p,/ရေ/);assert.match(p,/ချင်/);assert.match(p,/I want tea/);assert.match(p,/meanings.mr/);
  assert.doesNotMatch(p,/水 =|Words the learner knows in Japanese/);
});
