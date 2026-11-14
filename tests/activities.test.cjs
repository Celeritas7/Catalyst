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
assert.equal(api.pilots.filter(p=>p.language==='my').length,1);
assert.equal(api.pilots.filter(p=>p.language==='zh').length,0);
assert.equal(api.pilots.find(p=>p.language==='ja').build.orders.length,2);
assert(api.pilots.find(p=>p.language==='ja').deeper.en.includes('verb-past'));
console.log('Validated pilot coverage, every chunk permutation, multiple accepted orders, choice grading and target isolation.');

const html=fs.readFileSync('index.html','utf8');
assert(html.includes('<script src="./js/catalyst-activities.js"></script>'));
assert(html.indexOf('src="./js/catalyst-activities.js"')<html.indexOf('function ActivityLibrary'));
