const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
const {mount}=require('./app-fixture.cjs');
require('../js/catalyst-review.js');
const review=globalThis.CatalystReview;
const study='စာကြည့်တိုက်မှာ စာ ကျက်တယ်။',trip='ရန်ကုန်ကို သွားမယ်။',cat='စာကြည့်တိုက်မှာ ကြောင် ရှိတယ်။';
const title={mr:'क्रियेचे ठिकाण की जाण्याचे ठिकाण?',en:'At a place or going to it?'};
const olderActivity={step:4,draft:'ဘယ်ကို သွားမလဲ။',completed:true};
const settings={targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[],activities:{'my:my-wh-questions':olderActivity}};
const storage={catalyst_settings:JSON.stringify(settings)},notebookKey='catalyst_notebook_v1:u1:my',reviewKey='catalyst_review_v1:u1:my';
const records=app=>JSON.parse(app.w.localStorage.getItem(reviewKey)||'{"items":{}}').items;
const input=(app,element,value)=>{Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
const link=(app,language='mr')=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===title[language]);
async function open(app,language='mr'){app.w.location.hash='#place-de-ni';await app.wait(()=>!!app.w.document.querySelector('[aria-label="Lesson mode"]')&&!!link(app,language));link(app,language).click();await app.wait(()=>!!app.w.document.querySelector('.activity-panel'));}
async function step(app,label){[...app.w.document.querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith(label)).click();await app.wait(()=>app.w.document.querySelector('.activity-body h3')?.textContent.includes(label==='Use'?'Use it yourself':label));}
async function meaning(app,language){
  app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
  app.select('Meaning language',language);await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings')).meaningLanguage===language);
  app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));await open(app,language);
}

test('place activity is discoverable, explains both contexts bilingually and preserves distinct marker tasks and notebook attempts',async()=>{
  const old={id:'old',original:olderActivity.draft,meaning:'Keep the original destination question',meaningLanguage:'en',lesson:'wh_question',createdAt:'2026-11-27',corrections:[{text:'Keep this separate note',source:'user-entered',createdAt:'2026-11-27'}]};
  const app=await mount({storage:{...storage,[notebookKey]:JSON.stringify({version:1,entries:[old]})}});
  try{
    app.click('☀Today');await app.wait(()=>!!link(app));
    app.click('⌕Explore');await app.wait(()=>app.has('Content coverage')&&!!link(app));
    await open(app);assert.ok(app.has('स्वतःच्या अभ्यासाच्या सवयीबद्दल'));assert.ok(app.has('Draft content'));
    assert.equal(app.w.document.querySelector('.activity-panel').textContent.includes('Describing my study habit'),false);
    await step(app,'Notice');assert.ok(app.has('मी यांगूनला जाईन'));assert.ok(app.has('ग्रंथालयात एक मांजर आहे'));
    await meaning(app,'en');assert.ok(app.has('neither sentence writes a pronoun for “I”'));assert.ok(app.has('do not decide the place marker from the ending alone'));
    assert.ok(app.has('NIU SEAsite: place expressions and at/from/to markers'));
    await meaning(app,'mr');await step(app,'Build');app.click('Hint');app.click('Reveal one answer');await app.wait(()=>app.has('One accepted answer · revealed'));
    assert.equal(app.w.document.querySelector('.activity-body .feedback p[lang="my"]').textContent,study);
    app.click('Check order');await app.wait(()=>app.has('✓ Accepted order'));
    const built=records(app)['activity:my-location-destination:build'];assert.equal(built.lastAnswer,study);assert.equal(built.independent,0);assert.ok(built.assisted>0);
    await step(app,'Choose');
    const choose=async(index,text)=>{const row=app.w.document.querySelectorAll('.activity-choice')[index];[...row.querySelectorAll('.answer-btn')].find(el=>el.textContent===text).click();await app.wait(()=>records(app)[`activity:my-location-destination:choice:${index}`]?.lastResponse===text);};
    await choose(0,'ကို');assert.equal(records(app)['activity:my-location-destination:choice:0'].lastOutcome,'incorrect');
    await choose(0,'မှာ');assert.equal(records(app)['activity:my-location-destination:choice:0'].independent,1);assert.equal(records(app)['activity:my-location-destination:choice:0'].mistake,true);
    const location=records(app)['activity:my-location-destination:choice:0'];
    await choose(1,'ကို');assert.equal(records(app)['activity:my-location-destination:choice:1'].lastOutcome,'correct');
    assert.deepEqual(records(app)['activity:my-location-destination:choice:0'],location);
    await choose(2,cat);assert.equal(records(app)['activity:my-location-destination:choice:2'].lastOutcome,'correct');
    assert.equal(records(app)['activity:my-wh-questions:choice:1'],undefined);
    await step(app,'Use');const intended='मी यांगूनला जाण्याचा बेत सांगत आहे.';
    input(app,app.w.document.querySelector('#draft-my-location-destination'),trip);input(app,app.w.document.querySelector('.notebook-transfer textarea'),intended);
    await app.wait(()=>!app.button('Save to notebook').disabled);
    const setItem=app.w.Storage.prototype.setItem;
    app.w.Storage.prototype.setItem=function(key,value){if(key===notebookKey)throw Error('Test storage full');return setItem.call(this,key,value);};
    app.click('Save to notebook');await app.wait(()=>app.has('Could not save to the notebook.'));
    assert.equal(app.w.document.querySelector('#draft-my-location-destination').value,trip);assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,intended);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem(notebookKey)).entries,[old]);
    app.w.Storage.prototype.setItem=setItem;app.click('Save to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    app.click('Save to notebook');await app.wait(()=>app.has('No duplicate was added.'));
    const data=JSON.parse(app.w.localStorage.getItem(notebookKey));assert.equal(data.entries.length,2);assert.deepEqual(data.entries[1],old);
    assert.equal(data.entries[0].activityId,'my-location-destination');assert.equal(data.entries[0].lesson,'place_de_ni');assert.equal(data.entries[0].original,trip);assert.equal(data.entries[0].meaning,intended);
    assert.equal(app.button('Complete activity').disabled,true);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem('catalyst_settings')).activities['my:my-wh-questions'],olderActivity);
    app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (2)'));
    const entry=[...app.w.document.querySelectorAll('details')].find(el=>el.querySelector('summary')?.textContent===trip);
    [...entry.querySelectorAll('button')].find(el=>el.textContent==='Revisit lesson →').click();await app.wait(()=>app.w.location.hash==='#place-de-ni'&&!!link(app));
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('prepared offline destination review grades the correct marker from its context without changing the same-option location history',async()=>{
  const location={id:'activity:my-location-destination:choice:0',conceptId:'place_de_ni',skill:'context',answer:'မှာ'};
  const destination={id:'activity:my-location-destination:choice:1',conceptId:'place_de_ni',skill:'context',answer:'ကို'};
  let data=review.record(review.empty(),location,{correct:true,response:'မှာ'});
  data=review.record(data,destination,{correct:false,response:'မှာ'},Date.now()-2*review.DAY);
  const indexedDB=new IDBFactory();let app=await mount({indexedDB,storage:{...storage,[reviewKey]:JSON.stringify(data)}});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed'));
    const saved=app.snapshot();app.dom.window.close();
    app=await mount({indexedDB,storage:saved,offline:true,setup(w){
      w.__mockDb.auth.getSession=async()=>{throw Error('Offline auth');};w.__mockDb.auth.getUser=async()=>{throw Error('Offline auth');};
      w.__mockDb.from=()=>({select(){return this;},limit:async()=>{throw Error('Offline content');}});w.fetch=async()=>{throw Error('Offline');};
    }});
    app.click('◷My Learning');await app.wait(()=>app.has('1 checks due'));app.click('Review 1 due checks →');
    await app.wait(()=>app.buttons('ကို').length===1);assert.ok(app.has('तुम्ही यांगूनला जाण्याचे ठरवले आहे.'));assert.ok(app.has('ရန်ကုန်___ သွားမယ်။'));
    app.click('ကို');await app.wait(()=>app.has('✓ Correct'));
    const current=records(app);assert.equal(current[destination.id].lastAnswer,'ကို');assert.equal(current[destination.id].lastOutcome,'correct');
    assert.equal(current[destination.id].independent,data.items[destination.id].independent+1);assert.equal(current[destination.id].retentionCorrect,1);assert.equal(current[destination.id].mistake,false);
    assert.deepEqual(current[location.id],JSON.parse(JSON.stringify(data.items[location.id])));assert.equal(app.w.localStorage.getItem('catalyst_review_v1:guest:my'),null);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
