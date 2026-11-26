const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
const {mount}=require('./app-fixture.cjs');
require('../js/catalyst-review.js');
const review=globalThis.CatalystReview;
const food='ဘာ စားမလဲ။',destination='ဘယ်ကို သွားမလဲ။',coffee='ကော်ဖီ သောက်မလား။';
const titles={mr:'काय आणि कुठे असे प्रश्न विचारा',en:'Ask what and where'};
const olderActivity={step:4,draft:coffee,completed:true};
const settings={targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[],activities:{'my:my-yes-no':olderActivity}};
const storage={catalyst_settings:JSON.stringify(settings)},notebookKey='catalyst_notebook_v1:u1:my',reviewKey='catalyst_review_v1:u1:my';
const records=app=>JSON.parse(app.w.localStorage.getItem(reviewKey)||'{"items":{}}').items;
const input=(app,element,value)=>{Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
const link=(app,language='mr')=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===titles[language]);
async function open(app,language='mr'){app.w.location.hash='#wh-question';await app.wait(()=>!!link(app,language));link(app,language).click();await app.wait(()=>!!app.w.document.querySelector('.activity-panel'));}
async function step(app,label){[...app.w.document.querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith(label)).click();await app.wait(()=>app.w.document.querySelector('.activity-body h3')?.textContent.includes(label==='Use'?'Use it yourself':label));}
async function meaning(app,language){
  app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
  app.select('Meaning language',language);await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings')).meaningLanguage===language);
  app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));await open(app,language);
}

test('information activity keeps bilingual meanings, assistance, intentions and source-linked notebook writing separate',async()=>{
  const old={id:'old',original:coffee,meaning:'Keep the old coffee meaning',meaningLanguage:'en',lesson:'yes_no_ka',createdAt:'2026-11-27',corrections:[{text:'Keep its separate correction',source:'user-entered',createdAt:'2026-11-27'}]};
  const app=await mount({storage:{...storage,[notebookKey]:JSON.stringify({version:1,entries:[old]})}});
  try{
    await open(app);assert.ok(app.has('तू काय खाणार?'));assert.ok(app.has('Draft content'));
    assert.equal(app.w.document.querySelector('.activity-panel').textContent.includes('What will you eat?'),false);
    await step(app,'Notice');assert.ok(app.has('काय, कुठे जाणार, की हो/नाही?'));assert.ok(app.has('सध्या कुठे राहतो हे नाही'));
    await meaning(app,'en');assert.ok(app.has('not where someone currently lives'));assert.ok(app.has('NIU SEAsite: place questions and at/from/to markers'));
    await meaning(app,'mr');await step(app,'Build');app.click('Hint');app.click('Reveal one answer');await app.wait(()=>app.has('One accepted answer · revealed'));
    assert.equal(app.w.document.querySelector('.activity-body .feedback p[lang="my"]').textContent,food);
    app.click('Check order');await app.wait(()=>app.has('✓ Accepted order'));
    const built=records(app)['activity:my-wh-questions:build'];assert.equal(built.lastAnswer,food);assert.equal(built.lastResponse,food);assert.equal(built.independent,0);assert.ok(built.assisted>0);
    await step(app,'Choose');
    const choose=async(index,text)=>{const row=app.w.document.querySelectorAll('.activity-choice')[index];[...row.querySelectorAll('.answer-btn')].find(el=>el.textContent===text).click();await app.wait(()=>records(app)[`activity:my-wh-questions:choice:${index}`]?.lastResponse===text);};
    await choose(0,destination);assert.equal(records(app)['activity:my-wh-questions:choice:0'].lastOutcome,'incorrect');
    await choose(0,food);assert.equal(records(app)['activity:my-wh-questions:choice:0'].independent,1);assert.equal(records(app)['activity:my-wh-questions:choice:0'].mistake,true);
    await choose(1,destination);assert.equal(records(app)['activity:my-wh-questions:choice:1'].lastOutcome,'correct');
    await choose(2,coffee);assert.equal(records(app)['activity:my-wh-questions:choice:2'].lastOutcome,'correct');
    assert.equal(records(app)['activity:my-yes-no:choice:0'],undefined);
    await step(app,'Use');const intended='मित्र उद्या कुठे जाणार आहे ते विचारत आहे.';
    input(app,app.w.document.querySelector('#draft-my-wh-questions'),destination);input(app,app.w.document.querySelector('.notebook-transfer textarea'),intended);
    await app.wait(()=>!app.button('Save to notebook').disabled);app.click('Save to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    app.click('Save to notebook');await app.wait(()=>app.has('No duplicate was added.'));
    const data=JSON.parse(app.w.localStorage.getItem(notebookKey));assert.equal(data.entries.length,2);assert.deepEqual(data.entries[1],old);
    assert.equal(data.entries[0].activityId,'my-wh-questions');assert.equal(data.entries[0].lesson,'wh_question');assert.equal(data.entries[0].original,destination);assert.equal(data.entries[0].meaning,intended);
    assert.equal(app.button('Complete activity').disabled,true);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem('catalyst_settings')).activities['my:my-yes-no'],olderActivity);
    app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (2)'));
    const entry=[...app.w.document.querySelectorAll('details')].find(el=>el.querySelector('summary')?.textContent===destination);
    [...entry.querySelectorAll('button')].find(el=>el.textContent==='Revisit lesson →').click();await app.wait(()=>app.w.location.hash==='#wh-question'&&!!link(app));
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('prepared offline review shows the planned destination context and a reveal cannot become independent recall or change prior yes/no history',async()=>{
  const olderTask={id:'activity:my-yes-no:choice:0',conceptId:'yes_no_ka',skill:'context',answer:coffee};
  const task={id:'activity:my-wh-questions:choice:1',conceptId:'wh_question',skill:'context',answer:destination};
  let data=review.record(review.empty(),olderTask,{correct:true,response:coffee});
  data=review.record(data,task,{correct:false,response:food},Date.now()-2*review.DAY);
  const indexedDB=new IDBFactory();let app=await mount({indexedDB,storage:{...storage,[reviewKey]:JSON.stringify(data)}});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed'));
    const saved=app.snapshot();app.dom.window.close();
    app=await mount({indexedDB,storage:saved,offline:true,setup(w){
      w.__mockDb.auth.getSession=async()=>{throw Error('Offline auth');};w.__mockDb.auth.getUser=async()=>{throw Error('Offline auth');};
      w.__mockDb.from=()=>({select(){return this;},limit:async()=>{throw Error('Offline content');}});w.fetch=async()=>{throw Error('Offline');};
    }});
    app.click('◷My Learning');await app.wait(()=>app.has('1 checks due'));app.click('Review 1 due checks →');
    await app.wait(()=>app.buttons(destination).length===1);assert.ok(app.has('मित्र बाहेर जाण्याचे ठरवत आहे.'));
    app.click('Reveal answer');await app.wait(()=>app.has('Answer revealed · assisted practice'));
    const current=records(app);assert.equal(current[task.id].lastAnswer,destination);assert.equal(current[task.id].lastOutcome,'revealed');
    assert.equal(current[task.id].independent,data.items[task.id].independent);assert.equal(current[task.id].retentionCorrect,0);assert.equal(current[task.id].mistake,true);
    assert.deepEqual(current[olderTask.id],JSON.parse(JSON.stringify(data.items[olderTask.id])));assert.equal(app.w.localStorage.getItem('catalyst_review_v1:guest:my'),null);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
