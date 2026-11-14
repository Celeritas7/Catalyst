const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync('js/catalyst-review.js','utf8'),c);
const e=c.window.CatalystReview,D=e.DAY,t=1700000000000,task={id:'q',conceptId:'negation',skill:'understanding',answer:'No'};
let data=e.record(e.empty(),task,{correct:false,response:'Yes'},t);
assert.equal(data.items.q.dueAt,t+D);assert(data.items.q.mistake);assert.equal(data.items.q.independent,1);
const failed=JSON.stringify(data);
data=e.record(data,task,{correct:true,retry:true},t+1000);
assert.equal(data.items.q.independent,1);assert.equal(data.items.q.correct,0);assert(data.items.q.mistake);assert.equal(data.items.q.streak,0);
data=e.record(data,task,{correct:true},t+2000); // reopening is still an immediate retry
assert.equal(data.items.q.independent,1);assert(data.items.q.mistake);
const due=data.items.q.dueAt;
data=e.record(data,task,{correct:true},due);
assert.equal(data.items.q.independent,2);assert.equal(data.items.q.retentionCorrect,1);assert(!data.items.q.mistake);assert.equal(data.items.q.dueAt,due+D);
data=e.record(data,task,{correct:true},data.items.q.dueAt);assert.equal(data.items.q.streak,2);assert.equal(data.items.q.dueAt,due+4*D);
data=e.record(data,task,{correct:false},data.items.q.dueAt);assert.equal(data.items.q.streak,0);assert(data.items.q.mistake);
let assisted=e.record(e.empty(),task,{correct:null,assisted:true},t);
assisted=e.record(assisted,task,{correct:true},t+1000);assert.equal(assisted.items.q.independent,0);
assisted=e.record(assisted,task,{correct:true,assisted:true},t+2*D);assert.equal(assisted.items.q.independent,0);
let independent=e.record(e.empty(),task,{correct:true},t);
assert.equal(e.summary(independent).understanding.attempts,1);assert.equal(e.summary(independent).context.attempts,0);assert.equal(e.summary(independent).retention.attempts,0);
const contextTask={...task,id:'context',skill:'context'};independent=e.record(independent,contextTask,{correct:false},t);
assert.equal(e.summary(independent).context.attempts,1);assert.equal(e.summary(independent).production.attempts,0);
assert.equal(e.rank([contextTask,task],independent,t+D)[0].id,'context');
assert.notEqual(e.storageKey('guest','my'),e.storageKey('guest','ja'));
assert.notEqual(e.storageKey('user-a','my'),e.storageKey('user-b','my'));
assert.notEqual(e.storageKey('guest','my'),e.storageKey('user-a','my'));
assert.equal(e.setState(e.empty(),'negation','writing').states.negation,'writing');
assert.equal(e.setState(e.empty(),'negation','bogus').states.negation,undefined);
assert.equal(e.setState(e.setState(e.empty(),'negation','revision'),'negation','').states.negation,undefined);
assert.equal(JSON.stringify(e.parse(failed)),failed);assert.throws(()=>e.parse('{broken'));assert.throws(()=>e.parse('{"version":99}'));
const legacy={learned:['negation'],practice:{answers:12},activities:{'my:pilot':{draft:'test'}}},before=JSON.stringify(legacy);
e.record(e.empty(),task,{correct:true},t);assert.equal(JSON.stringify(legacy),before);
// First true delayed success advances deterministically, independent of clock timezone.
let schedule=e.empty();let time=t;
for(const interval of [1,3,7,14,30,30]){schedule=e.record(schedule,task,{correct:true},time);assert.equal(schedule.items.q.dueAt,time+interval*D);time=schedule.items.q.dueAt;}
console.log('Validated scheduler intervals, cooldown, retry/reveal protection, mistakes, skill separation, scope isolation and legacy preservation.');

const oldInterval=schedule.items.q.streak;
const early=e.record(schedule,task,{correct:true},schedule.items.q.lastAt+2*D);
assert.equal(early.items.q.streak,oldInterval);
assert.equal(early.items.q.independent,schedule.items.q.independent);
assert.equal(early.items.q.dueAt,schedule.items.q.dueAt);
assert.equal(data.items.q.lastMistake.expected,'No');
// Verify the actual task catalog used by practice and review has stable, matching IDs.
for(const file of ['catalyst-preferences','catalyst-meanings','catalyst-activities','catalyst-data'])vm.runInContext(fs.readFileSync(`js/${file}.js`,'utf8'),c);
const html=fs.readFileSync('index.html','utf8');
vm.runInContext(html.slice(html.indexOf('    const LANG ='),html.indexOf('    // ---- settings'))+html.slice(html.indexOf('    const GROUP_ICON'),html.indexOf('    function Practice('))+'\nthis.catalog=reviewTasks;this.quiz=makeQuestions;this.wrap=quizTask;',c);
const settings=c.window.CatalystPreferences.normalize({targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',comparisonLanguages:[]});
const tasks=c.catalog(c.window.CATALYST_DATA.concepts,settings);
assert.equal(new Set(tasks.map(t=>t.id)).size,tasks.length);
assert(tasks.every(t=>!t.lang||t.lang==='my'));
assert(tasks.some(t=>t.type==='build'));
for(const q of c.quiz(c.window.CATALYST_DATA.concepts,['my','mr'],'meaning','mr',['my']))assert(tasks.some(t=>t.id===c.wrap(q,'meaning').id));
assert(html.includes('<script src="./js/catalyst-review.js"></script>'));
console.log('Validated stable review/practice IDs, target-language scope and activity coverage.');
