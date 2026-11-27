const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
const {mount}=require('./app-fixture.cjs');
require('../js/catalyst-review.js');
const review=globalThis.CatalystReview;
const title='Say what you will not do',taskId='activity:my-negation:build',notebookKey='catalyst_notebook_v1:u1:my';
const settings={targetLanguage:'my',anchor:'mr',meaningLanguage:'en',showEnglish:false,comparisonLanguages:[]};
const baseStorage={'catalyst_settings':JSON.stringify(settings)};
const input=(app,element,value)=>{Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
const records=app=>JSON.parse(app.w.localStorage.getItem('catalyst_review_v1:u1:my')||'{"items":{}}').items;
async function open(app){
  app.w.location.hash='#negation';
  const button=()=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===title);
  await app.wait(()=>!!button());button().click();await app.wait(()=>!!app.w.document.querySelector('.activity-panel'));
}
async function step(app,label){
  [...app.w.document.querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith(label)).click();
  await app.wait(()=>app.w.document.querySelector('.activity-body h3')?.textContent.includes(label==='Use'?'Use it yourself':label));
}
async function chunks(app,texts){
  for(let index=0;index<texts.length;index++){
    [...app.w.document.querySelectorAll('.chunk-bank button')].find(el=>el.textContent===texts[index]).click();
    await app.wait(()=>app.w.document.querySelectorAll('.chunk-answer button').length===index+1);
  }
}

test('new activity builds joined Burmese and distinguishes the statement from the request without inflating retry mastery',async()=>{
  const app=await mount({storage:baseStorage});
  try{
    await open(app);assert.ok(app.has('I won’t go. (A reply about the planned outing.)'));
    assert.ok(app.has('Draft content'));assert.ok(app.has('NIU SEAsite: negative statements'));
    await step(app,'Notice');assert.ok(app.has('ဘူး alone does not mean future time'));
    assert.ok(app.has('A statement or a request?'));assert.equal(app.has('Different pattern: verb-past + ところで'),false);
    await step(app,'Build');await chunks(app,['သွား','မ','ဘူး။']);app.click('Check order');
    await app.wait(()=>app.has('Try another order for this pattern'));
    assert.equal(records(app)[taskId].lastResponse,'သွားမဘူး။');assert.equal(records(app)[taskId].lastAnswer,'မသွားဘူး။');
    app.click('Clear');await app.wait(()=>app.w.document.querySelectorAll('.chunk-answer button').length===0);
    await chunks(app,['မ','သွား','ဘူး။']);app.click('Check order');await app.wait(()=>app.has('✓ Accepted order'));
    const saved=records(app)[taskId];assert.equal(saved.lastResponse,'မသွားဘူး။');assert.equal(saved.independent,1);assert.equal(saved.correct,0);assert.equal(saved.mistake,true);
    assert.equal(app.w.document.querySelector('.activity-body .feedback p[lang="my"]').textContent,'မသွားဘူး။');
    await step(app,'Choose');
    const choose=async(index,text)=>{const row=app.w.document.querySelectorAll('.activity-choice')[index];[...row.querySelectorAll('.answer-btn')].find(button=>button.textContent===text).click();await app.wait(()=>records(app)[`activity:my-negation:choice:${index}`]?.lastResponse===text);};
    await choose(0,'မသွားနဲ့။');assert.equal(records(app)['activity:my-negation:choice:0'].lastOutcome,'incorrect');
    await choose(0,'မသွားဘူး။');assert.equal(records(app)['activity:my-negation:choice:0'].lastOutcome,'correct');
    await choose(1,'မသွားနဲ့။');assert.equal(records(app)['activity:my-negation:choice:1'].lastOutcome,'correct');
    await choose(2,'အသား မစားဘူး။');assert.equal(records(app)['activity:my-negation:choice:2'].lastOutcome,'correct');
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('activity notebook failure retains writing, retry and repeated save preserve originals/notes, and reload keeps the source lesson',async()=>{
  const old={id:'older',original:'Keep the original',meaning:'Keep its meaning',meaningLanguage:'en',lesson:'verb_final',createdAt:'2026-11-22',corrections:[{text:'Keep the correction',source:'user-entered',createdAt:'2026-11-23'}]};
  let app=await mount({storage:{...baseStorage,[notebookKey]:JSON.stringify({version:1,entries:[old]})}});
  try{
    await open(app);await step(app,'Use');
    const draft=app.w.document.querySelector('#draft-my-negation'),meaning=app.w.document.querySelector('.notebook-transfer textarea');
    input(app,draft,'မသွားဘူး။');input(app,meaning,'I won’t go to tomorrow’s outing.');await app.wait(()=>app.has('Recovery draft saved'));
    assert.equal(app.button('Complete activity').disabled,true);
    const set=app.w.Storage.prototype.setItem;
    app.w.Storage.prototype.setItem=function(key,value){if(key===notebookKey)throw Error('Synthetic storage full');return set.call(this,key,value);};
    app.click('Save to notebook');await app.wait(()=>app.has('Could not save to the notebook.'));
    assert.equal(draft.value,'မသွားဘူး။');assert.equal(meaning.value,'I won’t go to tomorrow’s outing.');assert.deepEqual(JSON.parse(app.w.localStorage.getItem(notebookKey)).entries,[old]);
    app.w.Storage.prototype.setItem=set;app.click('Save to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    const data=JSON.parse(app.w.localStorage.getItem(notebookKey));assert.equal(data.entries.length,2);assert.deepEqual(data.entries[1],old);
    assert.equal(data.entries[0].activityId,'my-negation');assert.equal(data.entries[0].lesson,'negation');assert.equal(data.entries[0].original,'မသွားဘူး။');
    app.click('Save to notebook');await app.wait(()=>app.has('No duplicate was added.'));assert.equal(JSON.parse(app.w.localStorage.getItem(notebookKey)).entries.length,2);
    assert.ok(!JSON.parse(app.w.localStorage.getItem('catalyst_activity_v1:u1:my')).items['my-negation'].completed);
    app.click('Save draft');await app.wait(()=>app.has('Draft saved on this device.'));
    const storage=app.snapshot();app.dom.window.close();app=await mount({storage});await open(app);
    assert.equal(app.w.document.querySelector('#draft-my-negation').value,'မသွားဘူး။');
    app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (2)'));
    assert.ok(app.has('From guided activity: '+title));assert.ok(app.has('Keep the correction'));
    const entry=[...app.w.document.querySelectorAll('details')].find(el=>el.querySelector('summary')?.textContent==='မသွားဘူး။');
    const revisit=[...entry.querySelectorAll('button')].find(button=>button.textContent==='Revisit lesson →');assert.ok(revisit);revisit.click();
    await app.wait(()=>app.w.location.hash==='#negation'&&app.has(title));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('a due adaptive review assembles the same unspaced answer and records independent delayed recall',async()=>{
  const now=Date.now(),task={id:taskId,conceptId:'negation',skill:'production',answer:'မသွားဘူး။'};
  const data=review.record(review.empty(),task,{correct:false,response:'wrong'},now-2*review.DAY);
  const app=await mount({storage:{...baseStorage,'catalyst_review_v1:u1:my':JSON.stringify(data)}});
  try{
    app.click('◷My Learning');await app.wait(()=>app.has('1 checks due'));app.click('Review 1 due checks →');
    await app.wait(()=>app.has('Your review sentence')||!!app.w.document.querySelector('[aria-label="Your review sentence"]'));
    await chunks(app,['မ','သွား','ဘူး။']);app.click('Check sentence');await app.wait(()=>app.has('✓ Correct'));
    assert.ok(app.has('Answer: မသွားဘူး။'));const saved=records(app)[taskId];assert.equal(saved.lastAnswer,'မသွားဘူး။');assert.equal(saved.lastResponse,'မသွားဘူး။');assert.equal(saved.retentionCorrect,1);assert.equal(saved.mistake,false);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('prepared account can use the bundled activity and save its notebook entry without content/auth network access',async()=>{
  const indexedDB=new IDBFactory();let app=await mount({indexedDB,storage:baseStorage});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed')&&app.has('3 words · saved'));
    const storage=app.snapshot();app.dom.window.close();
    app=await mount({indexedDB,storage,offline:true,setup(w){
      w.__mockDb.auth.getSession=async()=>{throw Error('No offline auth request');};w.__mockDb.auth.getUser=async()=>{throw Error('No offline auth request');};
      w.__mockDb.from=()=>({select(){return this;},limit:async()=>{throw Error('No offline database access');}});w.fetch=async()=>{throw Error('Offline');};
    }});
    await open(app);await step(app,'Build');app.click('Reveal one answer');await app.wait(()=>app.has('One accepted answer · revealed'));
    assert.equal(records(app)[taskId].assisted,1);assert.equal(records(app)[taskId].independent,0);
    await step(app,'Use');input(app,app.w.document.querySelector('#draft-my-negation'),'မသွားဘူး။');await app.wait(()=>!app.button('Save to notebook').disabled);
    app.click('Save to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    assert.equal(JSON.parse(app.w.localStorage.getItem(notebookKey)).entries[0].activityId,'my-negation');assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:guest:my'),null);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
