const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
const {IDBFactory}=require('fake-indexeddb');
const id='my-word-order',title='बर्मी वाक्य तयार करा',draftId='#draft-'+id;
const progressKey='catalyst_activity_v1:u1:my';
const link=app=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===title);
async function open(app){await app.wait(()=>!!link(app));link(app).click();await app.wait(()=>!!app.w.document.querySelector('.activity-panel'));}
async function use(app){[...app.w.document.querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith('Use')).click();await app.wait(()=>!!app.w.document.querySelector(draftId));}
function input(app,el,value){Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(el,value);el.dispatchEvent(new app.w.Event('input',{bubbles:true}));}
async function switchAccount(app,user){app.w.__changeUser(user);await app.wait(()=>!!link(app));}

test('saving and completing an activity never gives another account or guest that writing or completion',async()=>{
  const app=await mount();
  try{
    await open(app);await use(app);input(app,app.w.document.querySelector(draftId),'First account writing');
    input(app,app.w.document.querySelector('.notebook-transfer textarea'),'First account meaning');
    app.w.document.querySelector('.activity-body input[type="checkbox"]').click();app.click('Complete activity');
    await app.wait(()=>app.has('Activity completed and draft saved.'));
    await switchAccount(app,'u2');assert.equal(link(app).textContent.includes('Completed activity'),false);
    await open(app);await use(app);assert.equal(app.w.document.querySelector(draftId).value,'');assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'');
    assert.equal(app.has('First account writing'),false);assert.equal(app.has('Recovered writing'),false);
    input(app,app.w.document.querySelector(draftId),'Second account writing');app.click('Save draft');await app.wait(()=>app.has('Draft saved on this device.'));
    await switchAccount(app,null);assert.equal(link(app).textContent.includes('Completed activity'),false);
    await open(app);await use(app);assert.equal(app.w.document.querySelector(draftId).value,'');
    await switchAccount(app,'u1');assert.ok(link(app).textContent.includes('Completed activity'));
    await open(app);assert.equal(app.w.document.querySelector(draftId).value,'First account writing');
    assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'First account meaning');
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('legacy device writing requires explicit review and copying, never replaces current writing or claims completion',async()=>{
  const legacy={['my:'+id]:{step:4,draft:'Older writing with no owner',completed:true}};
  const app=await mount({storage:{catalyst_settings:JSON.stringify({targetLanguage:'my',meaningLanguage:'mr',activities:legacy})}});
  try{
    assert.equal(link(app).textContent.includes('Completed activity'),false);await open(app);await use(app);
    assert.equal(app.w.document.querySelector(draftId).value,'');assert.equal(app.has('Older writing with no owner'),false);
    input(app,app.w.document.querySelector(draftId),'Current unfinished work');app.click('Review older writing');await app.wait(()=>app.has('Older writing with no owner'));
    assert.equal(app.button('Copy this writing into my draft').disabled,true);app.click('Keep draft for later');await app.wait(()=>app.w.document.querySelector(draftId).value==='');
    app.click('Copy this writing into my draft');await app.wait(()=>app.w.document.querySelector(draftId).value==='Older writing with no owner');
    app.click('Save draft');await app.wait(()=>app.has('Draft saved on this device.'));
    const progress=JSON.parse(app.w.localStorage.getItem(progressKey));assert.equal(progress.items[id].completed,false);assert.equal(progress.items[id].writing.mr.draft,'Older writing with no owner');
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem('catalyst_settings')).activities,legacy);
    assert.ok(app.w.CatalystSafety.listDrafts(app.w.localStorage,'u1','my','activity',id+':mr').some(d=>d.fields.draft==='Current unfinished work'));
    assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my'),null);
    await switchAccount(app,'u2');await open(app);await use(app);assert.equal(app.w.document.querySelector(draftId).value,'');assert.equal(app.has('Older writing with no owner'),false);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('a save action from the previous account view is refused during an account change',async()=>{
  const app=await mount();
  try{
    await open(app);await use(app);input(app,app.w.document.querySelector(draftId),'Pending first-account writing');
    const button=app.button('Save draft'),before=app.w.localStorage.getItem(progressKey);
    app.w.__changeUser('u2');button.click();await app.wait(()=>!!link(app));
    assert.equal(app.w.localStorage.getItem(progressKey),before);assert.equal(app.w.localStorage.getItem('catalyst_activity_v1:u2:my'),null);
    await open(app);await use(app);assert.equal(app.w.document.querySelector(draftId).value,'');assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('activity or recovery-draft write failure cannot announce completion and keeps writing for retry',async()=>{
  for(const failDraft of [false,true]){
    const app=await mount();
    try{
      await open(app);await use(app);input(app,app.w.document.querySelector(draftId),'Keep this unsaved writing');
      input(app,app.w.document.querySelector('.notebook-transfer textarea'),'Keep its meaning');
      const before=app.w.localStorage.getItem(progressKey),set=app.w.Storage.prototype.setItem;
      app.w.Storage.prototype.setItem=function(key,value){if(failDraft?key.startsWith('catalyst_drafts_v1:'):key===progressKey)throw Error('Synthetic full storage');return set.call(this,key,value);};
      app.w.document.querySelector('.activity-body input[type="checkbox"]').click();app.click('Complete activity');await app.wait(()=>app.has('Could not save. Keep this page open'));
      assert.equal(app.has('Activity completed and draft saved.'),false);assert.equal(app.w.localStorage.getItem(progressKey),before);
      assert.equal(app.w.document.querySelector(draftId).value,'Keep this unsaved writing');assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'Keep its meaning');
      app.w.Storage.prototype.setItem=set;app.click('Complete activity');await app.wait(()=>app.has('Activity completed and draft saved.'));
      assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).items[id].completed,true);assert.deepEqual(app.errors,[]);
    }finally{app.dom.window.close();}
  }
});

test('another view updating activity progress cannot silently replace either saved or in-progress writing',async()=>{
  const app=await mount();
  try{
    await open(app);await use(app);input(app,app.w.document.querySelector(draftId),'Local unfinished work');
    const api=app.w.CatalystActivityProgress,previous=JSON.parse(app.w.localStorage.getItem(progressKey)).items[id];
    api.commit(app.w.localStorage,'u1','my',id,{writing:{mr:{draft:'Writing saved in another view',meaning:'Its meaning'}}},previous);
    app.w.dispatchEvent(new app.w.StorageEvent('storage',{key:progressKey}));
    const before=app.w.localStorage.getItem(progressKey);app.click('Save draft');await app.wait(()=>app.has('This activity changed in another view.'));
    assert.equal(app.w.localStorage.getItem(progressKey),before);assert.equal(app.w.document.querySelector(draftId).value,'Local unfinished work');
    app.click('Keep draft for later');await app.wait(()=>app.w.document.querySelector(draftId).value==='');app.click('Close activity');await open(app);
    assert.equal(app.w.document.querySelector(draftId).value,'Writing saved in another view');
    assert.ok(app.w.CatalystSafety.listDrafts(app.w.localStorage,'u1','my','activity',id+':mr').some(d=>d.fields.draft==='Local unfinished work'));
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('meaning-language switches retain their own writing and meanings without reinterpreting a saved meaning',async()=>{
  const app=await mount();
  async function language(value){
    app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
    app.select('Meaning language',value);await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings')).meaningLanguage===value);
    app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));
    const name=value==='mr'?title:'Build a Burmese sentence';const button=[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===name);button.click();await app.wait(()=>!!app.w.document.querySelector(draftId));
  }
  try{
    await open(app);await use(app);input(app,app.w.document.querySelector(draftId),'Marathi-context writing');input(app,app.w.document.querySelector('.notebook-transfer textarea'),'मराठी अर्थ');
    app.click('Save draft');await app.wait(()=>app.has('Draft saved on this device.'));await language('en');assert.equal(app.w.document.querySelector(draftId).value,'');assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'');
    input(app,app.w.document.querySelector(draftId),'English-context writing');input(app,app.w.document.querySelector('.notebook-transfer textarea'),'English meaning');app.click('Save draft');await app.wait(()=>app.has('Draft saved on this device.'));
    await language('mr');assert.equal(app.w.document.querySelector(draftId).value,'Marathi-context writing');assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'मराठी अर्थ');
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('prepared account reopens its saved activity offline and recovery preview includes the new activity record',async()=>{
  const indexedDB=new IDBFactory();let app=await mount({indexedDB});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed'));
    app.w.document.querySelector('[aria-label="Close offline settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close offline settings"]'));
    await open(app);await use(app);input(app,app.w.document.querySelector(draftId),'Keep for offline study');input(app,app.w.document.querySelector('.notebook-transfer textarea'),'Meaning kept offline');app.click('Save draft');await app.wait(()=>app.has('Draft saved on this device.'));
    const storage=app.snapshot();app.dom.window.close();app=await mount({indexedDB,storage,offline:true,setup(w){
      w.__mockDb.auth.getSession=async()=>{throw Error('Offline auth');};w.__mockDb.auth.getUser=async()=>{throw Error('Offline auth');};
      w.__mockDb.from=()=>({select(){return this;},limit:async()=>{throw Error('Offline content');}});w.fetch=async()=>{throw Error('Offline');};
    }});
    await open(app);assert.equal(app.w.document.querySelector(draftId).value,'Keep for offline study');assert.equal(app.w.document.querySelector('.notebook-transfer textarea').value,'Meaning kept offline');
    app.click('Study offline');await app.wait(()=>app.has('Protect your saved work'));app.click('Preview recovery export');await app.wait(()=>app.has('1 activity sets'));
    const exported=app.w.CatalystSafety.exportRecovery(app.w.localStorage,'u1',{device:false});assert.equal(exported.records.filter(r=>r.type==='activity').length,1);
    assert.equal(app.w.localStorage.getItem('catalyst_activity_v1:guest:my'),null);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
