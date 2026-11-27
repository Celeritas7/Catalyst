const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
const {mount}=require('./app-fixture.cjs');
require('../js/catalyst-review.js');
const review=globalThis.CatalystReview;
const title={mr:'聞こえる की 聞ける?',en:'聞こえる or 聞ける?'};
const birds='外から鳥の声が聞こえます。',locked='パスワードがないので、録音が聞けません。';
const storage={catalyst_settings:JSON.stringify({targetLanguage:'ja',anchor:'mr',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[]})};
const notebookKey='catalyst_notebook_v1:u1:ja',reviewKey='catalyst_review_v1:u1:ja',task='activity:ja-hearing-possibility:';
const records=app=>JSON.parse(app.w.localStorage.getItem(reviewKey)||'{"items":{}}').items;
const input=(app,element,value)=>{Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
const link=(app,language='mr')=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===title[language]);
async function open(app,language='mr'){app.w.location.hash='#ability';await app.wait(()=>!!app.w.document.querySelector('[aria-label="Lesson mode"]')&&!!link(app,language));link(app,language).click();await app.wait(()=>!!app.w.document.querySelector('.activity-panel'));}
async function step(app,label){[...app.w.document.querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith(label)).click();await app.wait(()=>app.w.document.querySelector('.activity-body h3')?.textContent.includes(label==='Use'?'Use it yourself':label));}
async function meaning(app,language){
  app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
  app.select('Meaning language',language);await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings')).meaningLanguage===language);
  app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));await open(app,language);
}

test('Japanese hearing explains authored forms bilingually, grades context separately and preserves notebook writing on failure and retry',async()=>{
  const old={id:'old',original:'ここは静かです。',lesson:'',meaning:'हे ठिकाण शांत आहे.',meaningLanguage:'mr',createdAt:'2026-11-27',corrections:[{text:'Keep my separate note',source:'user-entered',createdAt:'2026-11-27'}]};
  const app=await mount({storage:{...storage,[notebookKey]:JSON.stringify({version:1,entries:[old]})}});
  try{
    app.click('☀Today');await app.wait(()=>!!link(app));
    app.click('⌕Explore');await app.wait(()=>app.has('Content coverage')&&!!link(app));
    await open(app);assert.ok(app.has('Draft content'));assert.ok(app.has('तुम्ही शांत खोलीत आहात'));
    const reading=app.w.document.querySelector('.activity-body .activity-reading');assert.equal(reading.lang,'ja');assert.equal(reading.textContent,'そと から とり の こえ が きこえます');
    await step(app,'Notice');const guides=[...app.w.document.querySelectorAll('.activity-form-guide')];assert.equal(guides.length,2);
    assert.ok(app.has('शेवटचे る काढून ます'));assert.ok(app.has('प्रत्येक क्रियापदाला हाच नियम लागू होत नाही'));
    for(const row of guides){assert.equal(app.w.document.getElementById(row.getAttribute('aria-labelledby')).lang,'mr');assert.equal(row.querySelector('.activity-form-path').lang,'ja');assert.equal(row.querySelector('.activity-reading').lang,'ja');assert.equal(row.querySelector('p[lang="en"]'),null);}
    assert.equal(guides[0].querySelector('.activity-form-path').textContent,'聞こえる → 聞こえます / 聞こえません');
    assert.equal(guides[1].querySelector('.activity-reading').textContent,'きく → きける → きけます / きけません');
    await meaning(app,'en');assert.ok(app.has('not a rule for every verb'));assert.ok(app.has('Do not make a second potential form'));
    await meaning(app,'mr');await step(app,'Build');app.click('Reveal one answer');await app.wait(()=>app.has('One accepted answer · revealed'));
    app.click('Check order');await app.wait(()=>app.has('✓ Accepted order'));
    const built=records(app)[task+'build'];assert.equal(built.lastAnswer,birds);assert.equal(built.independent,0);assert.ok(built.assisted>0);
    await step(app,'Choose');
    const choose=async(index,text)=>{const row=app.w.document.querySelectorAll('.activity-choice')[index];[...row.querySelectorAll('.answer-btn')].find(el=>el.textContent===text).click();await app.wait(()=>records(app)[task+'choice:'+index]?.lastResponse===text);};
    await choose(0,'聞けます');assert.equal(records(app)[task+'choice:0'].lastOutcome,'incorrect');
    await choose(0,'聞こえます');assert.equal(records(app)[task+'choice:0'].independent,1);assert.equal(records(app)[task+'choice:0'].mistake,true);
    const audible=records(app)[task+'choice:0'];await choose(1,'聞けます');assert.equal(records(app)[task+'choice:1'].lastOutcome,'correct');assert.deepEqual(records(app)[task+'choice:0'],audible);
    await choose(2,'聞こえません');const inaudible=records(app)[task+'choice:2'];assert.equal(inaudible.lastOutcome,'correct');
    await choose(3,'聞けません');assert.equal(records(app)[task+'choice:3'].lastOutcome,'correct');assert.deepEqual(records(app)[task+'choice:2'],inaudible);
    assert.equal(records(app)['activity:ja-topic-transitions:choice:0'],undefined);
    await step(app,'Use');const intended='पासवर्ड नसल्यामुळे ध्वनिमुद्रण ऐकता येत नाही.';
    input(app,app.w.document.querySelector('#draft-ja-hearing-possibility'),locked);input(app,app.w.document.querySelector('.notebook-transfer textarea'),intended);
    await app.wait(()=>!app.button('Save to notebook').disabled);
    const setItem=app.w.Storage.prototype.setItem;
    app.w.Storage.prototype.setItem=function(key,value){if(key===notebookKey)throw Error('Test storage full');return setItem.call(this,key,value);};
    app.click('Save to notebook');await app.wait(()=>app.has('Could not save to the notebook.'));
    assert.equal(app.w.document.querySelector('#draft-ja-hearing-possibility').value,locked);assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,intended);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem(notebookKey)).entries,[old]);
    app.w.Storage.prototype.setItem=setItem;app.click('Save to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    app.click('Save to notebook');await app.wait(()=>app.has('No duplicate was added.'));
    const data=JSON.parse(app.w.localStorage.getItem(notebookKey));assert.equal(data.entries.length,2);assert.deepEqual(data.entries[1],old);
    assert.equal(data.entries[0].activityId,'ja-hearing-possibility');assert.equal(data.entries[0].lesson,'ability');assert.equal(data.entries[0].original,locked);assert.equal(data.entries[0].meaning,intended);
    assert.equal(app.button('Complete activity').disabled,true);
    app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (2)'));
    const entry=[...app.w.document.querySelectorAll('details')].find(el=>el.querySelector('summary')?.textContent===locked);
    [...entry.querySelectorAll('button')].find(el=>el.textContent==='Revisit lesson →').click();await app.wait(()=>app.w.location.hash==='#ability'&&!!link(app));
    await open(app);app.w.__changeUser('u2');await app.wait(()=>!!link(app));await open(app);await step(app,'Use');
    assert.equal(app.w.document.querySelector('#draft-ja-hearing-possibility').value,'');assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'');
    assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:u2:ja'),null);assert.equal(app.w.localStorage.getItem('catalyst_review_v1:u2:ja'),null);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('offline hearing review distinguishes no recording access from inaudibility without changing the same-option history',async()=>{
  const noise={id:task+'choice:2',conceptId:'ability',skill:'context',answer:'聞こえません'};
  const password={id:task+'choice:3',conceptId:'ability',skill:'context',answer:'聞けません'};
  let data=review.record(review.empty(),noise,{correct:true,response:'聞こえません'});
  data=review.record(data,password,{correct:false,response:'聞こえません'},Date.now()-2*review.DAY);
  const indexedDB=new IDBFactory();let app=await mount({indexedDB,storage:{...storage,[reviewKey]:JSON.stringify(data)}});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('2/2 word sources refreshed'));
    const saved=app.snapshot();app.dom.window.close();
    app=await mount({indexedDB,storage:saved,offline:true,setup(w){
      w.__mockDb.auth.getSession=async()=>{throw Error('Offline auth');};w.__mockDb.auth.getUser=async()=>{throw Error('Offline auth');};
      w.__mockDb.from=()=>({select(){return this;},limit:async()=>{throw Error('Offline content');}});w.fetch=async()=>{throw Error('Offline');};
    }});
    app.click('◷My Learning');await app.wait(()=>app.has('1 checks due'));app.click('Review 1 due checks →');
    await app.wait(()=>app.buttons('聞けません').length===1);assert.ok(app.has('ध्वनिमुद्रण उघडण्यासाठी पासवर्ड आवश्यक आहे.'));assert.ok(app.has('パスワードがないので、録音が___。'));
    app.click('聞けません');await app.wait(()=>app.has('✓ Correct'));
    const current=records(app);assert.equal(current[password.id].lastAnswer,'聞けません');assert.equal(current[password.id].lastOutcome,'correct');
    assert.equal(current[password.id].independent,data.items[password.id].independent+1);assert.equal(current[password.id].retentionCorrect,1);assert.equal(current[password.id].mistake,false);
    assert.deepEqual(current[noise.id],JSON.parse(JSON.stringify(data.items[noise.id])));assert.equal(app.w.localStorage.getItem('catalyst_review_v1:guest:ja'),null);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('bundled hearing activity remains available with an older online ability lesson and stays separate from its example count',async()=>{
  const app=await mount({storage,setup(w){
    w.location.hash='#ability';
    const from=w.__mockDb.from.bind(w.__mockDb),concept=w.CATALYST_DATA.concepts.find(c=>c.id==='ability');
    const rows={
      catalyst_concepts:[{id:'ability',sort_order:20,group_name:concept.group,title:concept.title,summary:'Synthetic older online ability summary',levels:concept.levels,pair_notes:concept.pairNotes}],
      catalyst_entries:[{id:'ability:ja',concept_id:'ability',language_code:'ja',form:concept.entries.ja.form,note:'Synthetic older online note',has_equivalent:true,checked:false}],
      catalyst_examples:concept.entries.ja.ex.slice(0,2).map((ex,index)=>({entry_id:'ability:ja',sort_order:index+1,native_text:ex.t,reading:ex.r,english_text:ex.e,highlight:ex.h})),
    };
    w.__mockDb.from=table=>rows[table]?{select(){return this;},limit:async()=>({data:rows[table]})}:from(table);
  }});
  try{
    await open(app);assert.ok(app.has('Synthetic older online ability summary'));assert.ok(app.has(birds));
    await step(app,'Notice');assert.ok(app.has('聞こえる → 聞こえます / 聞こえません'));
    app.click('Close activity');await app.wait(()=>!app.w.document.querySelector('.activity-panel'));assert.ok(app.has('Example 1 of 2'));
    app.click('⌕Explore');await app.wait(()=>app.has('Showing online lessons.'));
    const coverage=app.w.document.querySelector('[aria-labelledby="coverage-title"]');
    const metric=label=>[...coverage.querySelectorAll('dl div')].find(el=>el.querySelector('dt')?.textContent===label).querySelector('dd').textContent;
    assert.equal(metric('Examples'),'2');assert.equal(metric('Guided activities'),'2');assert.ok(link(app));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
