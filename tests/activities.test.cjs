const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync('js/catalyst-activities.js','utf8'),context);
const api=context.window.CatalystActivities;
function permutations(xs){return xs.length?xs.flatMap((x,i)=>permutations(xs.filter((_,j)=>j!==i)).map(rest=>[x,...rest])):[[]];}
for(const p of api.pilots){
 for(const lang of ['en','mr']) for(const field of ['title','summary','situation','meaning','notice','comparison','use','checklist']) assert(api.text(p[field],lang),`${p.id} ${field} ${lang}`);
 assert.equal(api.text(p.title,'unsupported'),null);
 for(const order of p.build.orders){assert.equal(new Set(order).size,p.build.chunks.length);assert(api.validOrder(p.build,order));}
 const all=permutations(p.build.chunks.map((_,i)=>i));
 assert.equal(all.filter(order=>api.validOrder(p.build,order)).length,p.build.orders.length);
 assert(!api.validOrder(p.build,[]));assert(!api.validOrder(p.build,[0,0,0]));
 for(const q of p.choices){assert(q.accepted.length);for(let i=0;i<q.options.length;i++)assert.equal(api.choiceCorrect(q,i),q.accepted.includes(i));}
 assert(p.sources.length);
}
assert.equal(new Set(api.pilots.map(api.key)).size,api.pilots.length);
assert.equal(api.pilots.filter(p=>p.language==='my').length,2);
assert.equal(api.pilots.filter(p=>p.language==='zh').length,0);
assert.equal(api.pilots.find(p=>p.language==='ja').build.orders.length,2);
assert(api.pilots.find(p=>p.language==='ja').deeper.en.includes('verb-past'));
console.log('Validated pilot coverage, every chunk permutation, multiple accepted orders, choice grading and target isolation.');

assert(require('../tools/app_sources.cjs').includes('js/catalyst-activities.js'));

const negation=api.pilots.find(p=>p.id==='my-negation');
assert.equal(negation.concept,'negation');
assert.equal(api.assemble(negation.build,negation.build.orders[0]),'မသွားဘူး။');
assert.equal(api.assemble(negation.build,[1,0,2]),'သွားမဘူး။');
assert.equal(negation.example,api.assemble(negation.build,[0,1,2]));
assert.equal(negation.content.reviewStatus,'draft');
assert.equal(negation.content.language,'my');
assert.equal(negation.content.script,'Myanmar');
assert(negation.notice.en.includes('ဘူး alone does not mean future time'));
assert.equal(negation.choices[0].options[negation.choices[0].accepted[0]],'မသွားဘူး။');
assert.equal(negation.choices[1].options[negation.choices[1].accepted[0]],'မသွားနဲ့။');
for(const old of api.pilots.filter(p=>p.id!=='my-negation'))for(const order of old.build.orders)assert.equal(api.assemble(old.build,order),order.map(i=>old.build.chunks[i]).join(' '));
console.log('Validated negation statement/request contrast and authored joining without changing existing pilots.');
