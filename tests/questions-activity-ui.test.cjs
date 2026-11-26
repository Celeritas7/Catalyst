const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
const {mount}=require('./app-fixture.cjs');
require('../js/catalyst-review.js');
const review=globalThis.CatalystReview;
const question='ကော်ဖီ သောက်မလား။',statement='ကော်ဖီ သောက်မယ်။',student='ကျောင်းသားလား။';
const titles={mr:'हो किंवा नाही असे उत्तर येणारा प्रश्न विचारा',en:'Ask a yes/no question'};
const settings={targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[],activities:{'my:my-negation':{draft:'Keep the older activity',completed:true,step:4}}};
const baseStorage={catalyst_settings:JSON.stringify(settings)},notebookKey='catalyst_notebook_v1:u1:my',reviewKey='catalyst_review_v1:u1:my';
const records=app=>JSON.parse(app.w.localStorage.getItem(reviewKey)||'{"items":{}}').items;
const input=(app,element,value)=>{Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
const activityLink=(app,title)=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===title);
async function open(app){app.w.location.hash='#yes_no_ka';await app.wait(()=>!!activityLink(app,titles.mr));activityLink(app,titles.mr).click();await app.wait(()=>!!app.w.document.querySelector('.activity-panel'));}
async function step(app,label){[...app.w.document.querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith(label)).click();await app.wait(()=>app.w.document.querySelector('.activity-body h3')?.textContent.includes(label==='Use'?'Use it yourself':label));}
async function chunks(app,texts){for(let i=0;i<texts.length;i++){[...app.w.document.querySelectorAll('.chunk-bank button')].find(el=>el.textContent===texts[i]).click();await app.wait(()=>app.w.document.querySelectorAll('.chunk-answer button').length===i+1);}}
async function preference(app,label,value){
  app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
  app.select(label,value);await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings'))[label==='I’m learning'?'targetLanguage':'meaningLanguage']===value);
  app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));
}

test('Explore discovers the new activity, Marathi checks distinguish an offer/reply/noun question, and preferences preserve earlier work',async()=>{
  const app=await mount({storage:baseStorage});
  try{
    [...app.w.document.querySelectorAll('nav[aria-label="Main navigation"] button')].find(el=>el.textContent.includes('Explore')).click();
    await app.wait(()=>!!activityLink(app,titles.mr));activityLink(app,titles.mr).click();await app.wait(()=>app.has('तू कॉफी घेणार का?'));
    assert.ok(app.has('Draft content'));assert.ok(app.has('NIU SEAsite: noun questions with လား'));
    assert.equal(app.w.document.querySelector('.activity-panel').textContent.includes('Will you have coffee?'),false);
    await step(app,'Notice');assert.ok(app.has('प्रश्न की विधान?'));assert.ok(app.has('नकाराचा भाग नाही'));
    await step(app,'Build');await chunks(app,['သောက်မလား။','ကော်ဖီ']);app.click('Check order');await app.wait(()=>app.has('Try another order for this pattern'));
    app.click('Clear');await app.wait(()=>app.w.document.querySelectorAll('.chunk-answer button').length===0);
    await chunks(app,['ကော်ဖီ','သောက်မလား။']);app.click('Check order');await app.wait(()=>app.has('✓ Accepted order'));
    const build=records(app)['activity:my-yes-no:build'];assert.equal(build.lastResponse,question);assert.equal(build.lastAnswer,question);assert.equal(build.independent,1);assert.equal(build.correct,0);assert.equal(build.mistake,true);
    assert.equal(app.w.document.querySelector('.activity-body .feedback p[lang="my"]').textContent,question);
    await step(app,'Choose');
    const choose=async(index,text)=>{const row=app.w.document.querySelectorAll('.activity-choice')[index];[...row.querySelectorAll('.answer-btn')].find(el=>el.textContent===text).click();await app.wait(()=>records(app)[`activity:my-yes-no:choice:${index}`]?.lastResponse===text);};
    await choose(0,statement);assert.equal(records(app)['activity:my-yes-no:choice:0'].lastOutcome,'incorrect');
    await choose(0,question);assert.equal(records(app)['activity:my-yes-no:choice:0'].independent,1);
    await choose(1,statement);assert.equal(records(app)['activity:my-yes-no:choice:1'].lastOutcome,'correct');
    await choose(2,student);assert.equal(records(app)['activity:my-yes-no:choice:2'].lastOutcome,'correct');
    const before=app.w.localStorage.getItem(reviewKey);await preference(app,'Meaning language','en');
    await app.wait(()=>!!activityLink(app,titles.en));activityLink(app,titles.en).click();
    await app.wait(()=>app.has('You are the host. Ask your friend whether they will have coffee.'));
    assert.equal(app.w.localStorage.getItem(reviewKey),before);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem('catalyst_settings')).activities['my:my-negation'],settings.activities['my:my-negation']);
    await preference(app,'I’m learning','ja');await app.wait(()=>!!activityLink(app,'ちなみに or ところで?'));
    assert.equal(!!activityLink(app,titles.en),false);assert.equal(app.has(titles.mr),false);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('prepared offline account recovers unfinished question/meaning and retries a notebook failure without losing notes or duplicating the original',async()=>{
  const old={id:'old',original:'Keep my old writing',meaning:'Keep my old meaning',meaningLanguage:'en',lesson:'negation',createdAt:'2026-11-22',corrections:[{text:'Keep the separate correction',source:'user-entered',createdAt:'2026-11-23'}]};
  const intended='मित्राला कॉफी घेणार का असे विचारत आहे.',indexedDB=new IDBFactory();
  let app=await mount({indexedDB,storage:{...baseStorage,[notebookKey]:JSON.stringify({version:1,entries:[old]})}});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed'));
    app.w.document.querySelector('[aria-label="Close offline settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close offline settings"]'));
    await open(app);await step(app,'Use');input(app,app.w.document.querySelector('#draft-my-yes-no'),question);input(app,app.w.document.querySelector('.notebook-transfer textarea'),intended);
    await app.wait(()=>app.has('Recovery draft saved'));const storage=app.snapshot();app.dom.window.close();
    app=await mount({indexedDB,storage,offline:true,setup(w){
      w.__mockDb.auth.getSession=async()=>{throw Error('Offline auth');};w.__mockDb.auth.getUser=async()=>{throw Error('Offline auth');};
      w.__mockDb.from=()=>({select(){return this;},limit:async()=>{throw Error('Offline content');}});w.fetch=async()=>{throw Error('Offline');};
    }});
    await open(app);await app.wait(()=>app.has('Recovered writing (1)'));app.click('Resume draft');
    await app.wait(()=>app.w.document.querySelector('#draft-my-yes-no').value===question);
    assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,intended);
    const set=app.w.Storage.prototype.setItem;
    app.w.Storage.prototype.setItem=function(key,value){if(key===notebookKey)throw Error('Synthetic full storage');return set.call(this,key,value);};
    app.click('Save to notebook');await app.wait(()=>app.has('Could not save to the notebook.'));
    assert.equal(app.w.document.querySelector('#draft-my-yes-no').value,question);assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,intended);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem(notebookKey)).entries,[old]);
    app.w.Storage.prototype.setItem=set;app.click('Save to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    app.click('Save to notebook');await app.wait(()=>app.has('No duplicate was added.'));
    const data=JSON.parse(app.w.localStorage.getItem(notebookKey));assert.equal(data.entries.length,2);assert.deepEqual(data.entries[1],old);
    assert.equal(data.entries[0].lesson,'yes_no_ka');assert.equal(data.entries[0].activityId,'my-yes-no');assert.equal(data.entries[0].original,question);assert.equal(data.entries[0].meaning,intended);
    assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:guest:my'),null);assert.equal(app.button('Complete activity').disabled,true);
    app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (2)'));
    const entry=[...app.w.document.querySelectorAll('details')].find(el=>el.querySelector('summary')?.textContent===question);
    [...entry.querySelectorAll('button')].find(el=>el.textContent==='Revisit lesson →').click();
    await app.wait(()=>app.w.location.hash==='#yes-no-ka'&&!!activityLink(app,titles.mr));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('a due question uses the new activity context and retains the older activity review record',async()=>{
  const oldTask={id:'activity:my-negation:build',conceptId:'negation',skill:'production',answer:'မသွားဘူး။'};
  const newTask={id:'activity:my-yes-no:choice:0',conceptId:'yes_no_ka',skill:'context',answer:question};
  let data=review.record(review.empty(),oldTask,{correct:true,response:oldTask.answer});
  data=review.record(data,newTask,{correct:false,response:statement},Date.now()-2*review.DAY);
  const app=await mount({storage:{...baseStorage,[reviewKey]:JSON.stringify(data)}});
  try{
    app.click('◷My Learning');await app.wait(()=>app.has('1 checks due'));app.click('Review 1 due checks →');
    await app.wait(()=>app.buttons(question).length===1);assert.ok(app.has('तुम्ही यजमान आहात.'));
    app.click(question);await app.wait(()=>app.has('✓ Correct'));
    assert.equal(records(app)[newTask.id].retentionCorrect,1);assert.equal(records(app)[newTask.id].mistake,false);
    assert.equal(records(app)[newTask.id].lastAnswer,question);assert.deepEqual(records(app)[oldTask.id],JSON.parse(JSON.stringify(data.items[oldTask.id])));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
