const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
function input(app,element,value){Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(element,value);element.dispatchEvent(new app.w.Event('input',{bubbles:true}));}
async function notebook(app){app.click('◷My Learning');await app.wait(()=>app.has('My sentence notebook'));return [...app.w.document.querySelectorAll('textarea')];}

test('mounted notebook recovers original, meaning and correction drafts after reload without saving a duplicate original',async()=>{
  const saved={version:1,entries:[{id:'old',original:'Saved original',meaning:'Saved meaning',meaningLanguage:'mr',lesson:'',createdAt:'2026-11-24',corrections:[]}]};
  let app=await mount({storage:{'catalyst_notebook_v1:u1:my':JSON.stringify(saved)}});
  try{
    await notebook(app);await app.wait(()=>app.has('Saved sentences (1)'));let fields=[...app.w.document.querySelectorAll('textarea')];assert.equal(fields.length,3);
    input(app,fields[0],'Unfinished original');input(app,fields[1],'Unfinished meaning');input(app,fields[2],'Unfinished correction');
    await app.wait(()=>app.has('Recovery draft saved'));assert.equal(app.w.CatalystSafety.hasDirty(),true);
    const storage=app.snapshot();assert.deepEqual(JSON.parse(storage['catalyst_notebook_v1:u1:my']),saved);app.dom.window.close();
    app=await mount({storage});await notebook(app);await app.wait(()=>app.has('Recovered writing (1)')&&app.has('Saved sentences (1)'));fields=[...app.w.document.querySelectorAll('textarea')];
    app.click('Resume draft');await app.wait(()=>fields[0].value==='Unfinished original');assert.equal(fields[1].value,'Unfinished meaning');assert.equal(fields[2].value,'Unfinished correction');
    app.click('Keep draft for later');await app.wait(()=>fields[0].value==='');assert.equal(fields[2].value,'');assert.equal(app.w.CatalystSafety.hasDirty(),false);assert.deepEqual(JSON.parse(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my')),saved);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('mounted draft save failure remains visible and settings corruption cannot silently reset history',async()=>{
  const app=await mount();
  try{
    const fields=await notebook(app);const set=app.w.Storage.prototype.setItem;
    app.w.Storage.prototype.setItem=function(key,value){if(key.startsWith('catalyst_drafts_'))throw Error('Storage full');return set.call(this,key,value);};
    input(app,fields[0],'Keep this text');await app.wait(()=>app.has('Recovery draft could not be saved'));assert.equal(fields[0].value,'Keep this text');assert.equal(app.w.CatalystSafety.hasDirty(),true);
    app.w.localStorage.setItem('catalyst_settings','{damaged');app.w.dispatchEvent(new app.w.StorageEvent('storage',{key:'catalyst_settings'}));await app.wait(()=>app.has('Settings or history could not be read'));
    assert.equal(app.w.document.querySelector('textarea').value,'Keep this text','A bad settings event must not remount and hide unfinished writing');
    app.click('Retry settings');await app.wait(()=>app.has('Settings or history could not be read'));assert.equal(app.w.localStorage.getItem('catalyst_settings'),'{damaged');
    app.click('Study offline');await app.wait(()=>app.has('Protect your saved work'));app.click('Preview recovery export');await app.wait(()=>app.buttons('Download recovery file').length===1);assert.equal(app.w.localStorage.getItem('catalyst_settings'),'{damaged');assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
