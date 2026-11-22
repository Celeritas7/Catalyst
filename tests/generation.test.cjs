const assert=require('node:assert/strict');
const {test}=require('node:test');
require('../js/catalyst-generation.js');
const api=globalThis.CatalystGeneration;
const legacy={id:'old',user_id:'u1',sentences:{en:'Water',my:{t:'ရေ'},mr:{t:'पाणी'},ja:{t:'水'}}};
const fresh={id:'new',user_id:'u1',target_language:'my',sentences:{en:'Tea',my:{t:'လက်ဖက်ရည်'},meanings:{en:'Tea',mr:'चहा'}}};
test('request sends target and meaning independently',()=>{
  assert.deepEqual(api.request('topic','my','mr'),{concept_id:'topic',target_language:'my',meaning_language:'mr'});
  assert.throws(()=>api.request('topic','en','mr'));assert.throws(()=>api.request('topic','my','xx'));
});
test('legacy and new examples remain visible only in the correct account/target',()=>{
  assert.ok(api.visible(legacy,'u1','my'));assert.ok(api.visible(legacy,'u1','ja'));assert.ok(api.visible(fresh,'u1','my'));
  assert.ok(!api.visible(fresh,'u1','ja'));assert.ok(!api.visible(fresh,'other','my'));assert.ok(!api.visible({...fresh,flagged:true},'u1','my'));
});
test('generated meanings use saved Marathi; legacy English/Marathi remain readable',()=>{
  assert.equal(api.meaning(fresh,'mr'),'चहा');assert.equal(api.meaning(legacy,'mr'),'पाणी');assert.equal(api.meaning(legacy,'en'),'Water');
  assert.equal(api.meaning({sentences:{en:'No Marathi'}},'mr'),'');
});
test('old/unconfigured services cannot accidentally run multilingual generation',()=>{
  assert.ok(!api.compatible({ok:true,configured:true},'my'));
  assert.ok(!api.compatible({ok:true,configured:false,api_version:2,targets:['my']},'my'));
  assert.ok(api.compatible({ok:true,configured:true,api_version:2,targets:['my']},'my'));
});
test('saved sentence reads explicitly filter owner, concept, target and flagged state',async()=>{
  const filters=[];const chain={select(){return this;},eq(...args){filters.push(args);return this;},not(...args){filters.push(args);return this;},order(){return this;},limit(){return Promise.resolve({data:[legacy,fresh,{...fresh,user_id:'other'},{...fresh,target_language:'ja'}]});}};
  const rows=await api.load({from(){return chain;}},'u1','topic','my');
  assert.deepEqual(rows.map(r=>r.id),['old','new']);assert.deepEqual(filters,[['user_id','u1'],['concept_id','topic'],['flagged',false],['sentences->my','is',null]]);
});
