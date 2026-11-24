const {test}=require('node:test'),assert=require('node:assert/strict');
const {IDBFactory}=require('fake-indexeddb');
const {mount}=require('./app-fixture.cjs');
function input(app,element,value){Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));}
test('compiled UI prepares account and learned words, then reopens and saves into the same notebook offline',async()=>{
  const indexedDB=new IDBFactory();let app=await mount({indexedDB});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed'));
    assert.ok(app.has('3 words · saved'));const storage=app.snapshot();assert.ok(!storage.catalyst_offline_owner_v1.includes('FAKE_TEST_TOKEN'));app.dom.window.close();
    app=await mount({storage,indexedDB,offline:true,setup:w=>{w.__mockDb.auth.getSession=async()=>{throw Error('must not need SDK refresh offline');};w.__mockDb.auth.getUser=async()=>{throw Error('must not verify offline');};}});
    await app.wait(()=>app.has('Offline study: test@example.invalid'));
    app.click('✨ Your words');await app.wait(()=>app.buttons('Make practice sentence').length===1);assert.ok(app.has('Offline · saved words'));app.click('Make practice sentence');
    await app.wait(()=>app.buttons('Save pattern to notebook').length===1);app.click('Save pattern to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    assert.equal(JSON.parse(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my')).entries.length,1);assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:guest:my'),null);
    app.click('◷My Learning');await app.wait(()=>app.w.document.querySelector('textarea'));const field=app.w.document.querySelector('textarea');input(app,field,'Offline original');await app.wait(()=>app.has('Recovery draft saved'));
    app.click('Save original sentence');await app.wait(()=>app.has('Saved sentences (2)'));assert.equal(JSON.parse(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my')).entries.length,2);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
test('compiled UI explains a missing KG permission service without claiming those sources ready',async()=>{
  const app=await mount({indexedDB:new IDBFactory(),setup:w=>{const rpc=w.__mockDb.rpc;w.__mockDb.rpc=async name=>name==='kg_chart_u3_my_access_snapshot'?{error:{code:'PGRST202'}}:rpc(name);}});
  try{app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('1/3 word sources refreshed'));assert.ok(app.has('permission service has not been deployed'));assert.ok(app.has('Notebook and reviews: ready for this account'));assert.deepEqual(app.errors,[]);}finally{app.dom.window.close();}
});
test('compiled UI clears old word choices and notebook on account switch while retaining stored originals',async()=>{
  const app=await mount({indexedDB:new IDBFactory(),storage:{'catalyst_notebook_v1:u1:my':JSON.stringify({version:1,entries:[{id:'one',original:'Only account one',meaning:'',meaningLanguage:'mr',lesson:'',createdAt:'2026-11-24',corrections:[]}]})}});
  try{
    app.click('Study offline');await app.wait(()=>app.has('Your account and words'));app.click('Prepare this account for offline study');await app.wait(()=>app.has('3/3 word sources refreshed'));app.click('Close');
    app.click('◷My Learning');await app.wait(()=>app.has('Only account one'));app.w.__changeUser('u2');await app.wait(()=>app.has('Saved sentences (0)'));assert.equal(app.has('Only account one'),false);assert.ok(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my').includes('Only account one'));
    app.w.__changeUser(null);await app.wait(()=>app.has('Guest notebook'));assert.equal(JSON.parse(app.w.localStorage.getItem('catalyst_offline_owner_v1')).enabled,false);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
