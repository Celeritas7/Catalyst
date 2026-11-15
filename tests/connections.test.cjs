const assert=require('node:assert/strict');
require('../js/catalyst-vocabulary.js');const v=globalThis.CatalystVocabulary;
const words=[{vocabulary_id:'same',language_code:'my',native_text:'က'},{vocabulary_id:'same',language_code:'ja',native_text:'あ'}];
const ratings=[{user_id:'me',vocabulary_id:'same',language_code:'my',rating:5},{user_id:'other',vocabulary_id:'same',language_code:'ja',rating:1}];
assert.equal(v.rated(words,ratings,'me','my','kg')[0].label,'Don’t know');
assert.equal(v.rated(words,ratings,'me','ja','kg')[0].label,'Not rated');
assert.equal(v.rated(words,ratings,'me','ja','kg').length,1);
const jp=v.rated([{id:1,kanji:'学ぶ',meaning_en:'learn'}],[{user_id:'me',kanji:'学ぶ',marking:3}],'me','ja','japanese',{3:'Writing practice'});
assert.equal(jp[0].label,'Writing practice');assert.equal(jp[0].rating,3);
assert(v.sources('ja').some(p=>p.id==='japanese'));assert(!v.sources('zh').some(p=>p.id==='japanese'));
function client(tables,errorTable){const calls=[];return {calls,from(table){let filters={},start=0,end=499;const q={select(){return q},order(column){calls.push({table,column,filters});return q},range(a,b){start=a;end=b;return q},eq(k,val){filters[k]=val;return q},then(resolve){return Promise.resolve(table===errorTable?{error:{code:'denied'}}:{data:(tables[table]||[]).filter(r=>Object.entries(filters).every(([k,val])=>r[k]===val)).slice(start,end+1)}).then(resolve)}};return q}};}
(async()=>{
const dictionary=Array.from({length:1001},(_,i)=>({vocabulary_id:String(i),language_code:'ja',native_text:'語'+i}));
const db=client({kg_chart_vocabulary_translations:dictionary,kg_chart_user_ratings:[{user_id:'me',language_code:'ja',vocabulary_id:'1000',rating:1}]});
const result=await v.loadSource(db,'me','ja','kg');assert.equal(result.words.length,1001);assert.equal(result.linked,1);assert.equal(result.words[1000].label,'Monthly Review');
assert(db.calls.filter(c=>c.table==='kg_chart_user_ratings').every(c=>c.filters.user_id==='me'&&c.filters.language_code==='ja'));
await assert.rejects(v.loadSource(client({},'kg_chart_user_ratings'),'me','ja','kg'));
await assert.rejects(v.loadSource(db,'me','my','japanese'));
await assert.rejects(v.loadSource(db,null,'ja','kg'));
console.log('Connections: original rating meanings, custom labels, account/language isolation, provider availability, 1001-row pagination and failures passed.');
})();
