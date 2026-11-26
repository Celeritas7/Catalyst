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
assert.equal(api.pilots.filter(p=>p.language==='my').length,4);
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
for(const old of api.pilots.filter(p=>['my-word-order','ja-topic-transitions'].includes(p.id)))for(const order of old.build.orders)assert.equal(api.assemble(old.build,order),order.map(i=>old.build.chunks[i]).join(' '));
console.log('Validated negation statement/request contrast and authored joining without changing existing pilots.');

const questions=api.pilots.find(p=>p.id==='my-yes-no');
assert.equal(questions.concept,'yes_no_ka');
assert.equal(api.assemble(questions.build,[0,1]),'ကော်ဖီ သောက်မလား။');
assert.equal(api.assemble(questions.build,[1,0]),'သောက်မလား။ ကော်ဖီ');
assert.equal(questions.example,api.assemble(questions.build,questions.build.orders[0]));
assert.equal(questions.choices[0].options[questions.choices[0].accepted[0]],'ကော်ဖီ သောက်မလား။');
assert.equal(questions.choices[1].options[questions.choices[1].accepted[0]],'ကော်ဖီ သောက်မယ်။');
assert.equal(questions.choices[2].options[questions.choices[2].accepted[0]],'ကျောင်းသားလား။');
assert.equal(questions.content.reviewStatus,'draft');
assert.equal(questions.content.language,'my');assert.equal(questions.content.script,'Myanmar');
assert.match(questions.notice.en,/not the negative prefix/);
assert.match(questions.content.register.en,/familiar conversation/);
console.log('Validated yes/no offer, statement reply and noun-question context.');

const information=api.pilots.find(p=>p.id==='my-wh-questions');
assert.equal(information.concept,'wh_question');
assert.equal(api.assemble(information.build,[0,1]),'ဘာ စားမလဲ။');
assert.equal(information.example,api.assemble(information.build,information.build.orders[0]));
assert.equal(information.choices[0].options[information.choices[0].accepted[0]],'ဘာ စားမလဲ။');
assert.equal(information.choices[1].options[information.choices[1].accepted[0]],'ဘယ်ကို သွားမလဲ။');
assert.equal(information.choices[2].options[information.choices[2].accepted[0]],'ကော်ဖီ သောက်မလား။');
assert.equal(information.content.reviewStatus,'draft');
assert.match(information.deeper.en,/destination, not where someone currently lives/);
assert.match(information.notice.en,/omitted “you”/);
assert.equal(information.content.exampleRefs.length,3);
console.log('Validated food/destination information questions and the separate yes/no contrast.');
