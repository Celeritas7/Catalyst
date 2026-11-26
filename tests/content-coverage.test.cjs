const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {audit,compareSource,auditActivities,generate}=require('../tools/content_inventory.cjs');
const context={window:{}};vm.createContext(context);
for(const file of ['catalyst-coverage','catalyst-meanings'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',file+'.js'),'utf8'),context);
const {CatalystCoverage:coverage,CatalystMeanings:meanings}=context.window;
const plain=value=>JSON.parse(JSON.stringify(value));

test('coverage keeps declared target, exact sense and meaning language separate',()=>{
  const concepts=[{id:'one',entries:{my:{checked:true,ex:[{t:'က',e:'I eat an apple.'},{t:'ခ',e:'I eat an apple. (new sense)'},{t:'',e:'I eat an apple.'}]},ja:{ex:[{t:'日',e:'I eat an apple.'}]}}},{id:'two',entries:{my:{ex:[]}}}];
  const before=JSON.stringify(concepts),pilots=[{language:'ja'},{language:'my'}];
  const result=coverage.summarize(concepts,'my','mr',meanings.translate,pilots);
  assert.equal(result.availableLessons,1);assert.equal(result.unavailableLessons,1);
  assert.equal(result.examples,2);assert.equal(result.translated,1);assert.equal(result.guidedActivities,1);
  assert.deepEqual(plain(result.lessons[0].missing),[2]);
  assert.equal(result.sourceCheckedLessons,1);assert.equal('reviewedLessons' in result,false);
  assert.equal(coverage.summarize(concepts,'my','en',meanings.translate).translated,2);
  assert.equal(coverage.summarize(concepts,'zh','mr',meanings.translate).examples,0);
  assert.equal(JSON.stringify(concepts),before);
});

test('coverage uses English native text only for English and retains actual missing-example positions',()=>{
  const concepts=[{id:'a',entries:{en:{ex:[{t:''},{t:'I eat an apple.'},{t:'Untranslated sense'}]},my:{ex:[{t:'က'}]}}}];
  const result=coverage.summarize(concepts,'en','mr',meanings.translate);
  assert.equal(result.examples,2);assert.equal(result.translated,1);
  assert.deepEqual(plain(result.lessons[0].missing),[3]);
  assert.equal(coverage.summarize(concepts,'my','en',meanings.translate).translated,0);
  assert.equal(coverage.summarize(concepts,'en','unknown',meanings.translate).translated,0);
});

test('inventory rejects exact in-entry duplicates, missing IDs and placeholder text',()=>{
  const example={t:'I eat an apple.',e:'',h:[]};
  const result=audit([{id:'one',entries:{en:{ex:[example,{...example},{t:'TODO'},{t:''}]}}},{id:'one',entries:{xx:{ex:[]}}}]);
  assert.equal(result.errors.length,5);
  assert.match(result.errors.join('\n'),/duplicate within one entry/);
  assert.match(result.errors.join('\n'),/duplicate concept ID/);
  assert.match(result.errors.join('\n'),/placeholder/);
  assert.match(result.errors.join('\n'),/unknown language/);
});

test('repeat review preserves different glosses, readings, languages and lesson contexts',()=>{
  const concepts=[{id:'first',entries:{ja:{ex:[{t:'日',e:'day',r:'ひ'},{t:'日',e:'sun',r:'ひ'}]},zh:{ex:[{t:'日',e:'day',r:'rì'}]}}},{id:'second',entries:{ja:{ex:[{t:'日',e:'day',r:'にち'}]}}}];
  const before=JSON.stringify(concepts),report=audit(concepts);
  assert.equal(report.errors.length,0);assert.equal(report.repeatedText.length,1);
  assert.equal(report.repeatedText[0].language,'ja');assert.equal(report.repeatedText[0].occurrences.length,3);
  assert.deepEqual(report.repeatedText[0].occurrences.map(x=>[x.english,x.reading]),[['day','ひ'],['sun','ひ'],['day','にち']]);
  assert.equal(JSON.stringify(concepts),before);
});

test('script hints catch likely template leakage without claiming to identify language',()=>{
  const report=audit([{id:'scripts',entries:{zh:{ex:[{t:'私は学生です。',e:'I am a student.'}]},my:{ex:[{t:'template',e:'template'}]},ja:{ex:[{t:'東京',e:'Tokyo'}]}}}]);
  assert.equal(report.errors.length,0);assert.equal(report.scriptWarnings.length,2);
  assert.match(report.scriptWarnings[0].warnings.join(' '),/Kana/);
  assert.match(report.scriptWarnings[1].warnings.join(' '),/Expected script/);
});

test('source drift is detected before accepting a changed inventory',()=>{
  const source={id:'a',group:'group',title:'title',summary:'summary'},built={...source,entries:{}};
  for(const language of ['ja','my','zh','mr','en']){source[language]={form:'form',note:'note',ex:[{t:'text',e:'sense',h:'text'}]};built.entries[language]={...source[language],none:false,checked:false,ex:[{t:'text',e:'sense',h:['text']}]};}
  assert.deepEqual(compareSource([source],[built]),[]);
  built.entries.my.ex[0].e='Changed sense';assert.match(compareSource([source],[built]).join('\n'),/a:my: bundle differs/);
  assert.match(compareSource([source],[]).join('\n'),/counts differ/);
});

test('checked-in inventory is reproducible and exposes current coverage limits',()=>{
  const report=generate(),saved=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/content-coverage.json'),'utf8'));
  assert.deepEqual(plain(report),saved);assert.deepEqual(plain(report),plain(generate()));
  assert.equal(report.errors.length,0);
  const my=report.languages.find(row=>row.language==='my'),mr=report.languages.find(row=>row.language==='mr'),en=report.languages.find(row=>row.language==='en');
  assert.equal(my.lessons,24);assert.equal(my.examples,50);assert.equal(my.meanings[0].missing,0);
  assert.equal(my.sourceCheckedLessons,0);assert.equal(my.guidedActivities,4);assert.equal(my.fixedPatterns,3);
  assert.equal(mr.meanings[0].available,48);assert.equal(en.meanings[0].available,24);
  assert.ok(report.languages.every(row=>row.meanings.every(meaning=>meaning.missing===0)));
  assert.equal(report.repeatedText.length,1);assert.equal(report.repeatedText[0].occurrences.length,2);
});

test('activity audit detects changed source text, incomplete meanings, malformed checks and unsupported approval',()=>{
  const ctx={window:{}};vm.createContext(ctx);
  for(const file of ['catalyst-data','catalyst-activities'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',file+'.js'),'utf8'),ctx);
  const concepts=plain(ctx.window.CATALYST_DATA.concepts),pilot=plain(ctx.window.CatalystActivities.pilots.find(p=>p.id==='my-negation'));
  assert.deepEqual(auditActivities([pilot],concepts),[]);
  const cases=[
    [p=>{p.content.exampleRefs[0].text='changed';},/linked example changed/],
    [p=>{delete p.notice.mr;},/bilingual notice/],
    [p=>{p.build.orders=[[0,0,2]];},/accepted chunk order/],
    [p=>{p.build.joiner='invented';},/chunk joiner/],
    [p=>{p.choices[0].accepted=[8];},/choice answers/],
    [p=>{p.content.reviewStatus='approved';},/approval needs a documented review workflow/],
  ];
  for(const [mutate,message] of cases){const changed=structuredClone(pilot);mutate(changed);assert.match(auditActivities([changed],concepts).join('\n'),message);}
});
