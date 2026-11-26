const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
const notebookKey='catalyst_notebook_v1:u1:my';
const sentence=(id,original,notes=[])=>({id,original,meaning:'सराव',meaningLanguage:'mr',lesson:'',createdAt:'2026-11-27',corrections:notes.map(text=>({text,source:'user-entered',createdAt:'2026-11-27'}))});
const local={version:1,entries:[sentence('one','Original',['Local note'])]};
const backup={format:'catalyst-recovery',version:1,owner:{kind:'account',id:'u1'},records:[{type:'notebook',owner:'current',language:'my',raw:JSON.stringify({version:1,entries:[sentence('one','Original',['Incoming note']),sentence('two','Restored original')]})}],copies:null,journal:null};
async function open(app){app.click('Study offline');await app.wait(()=>app.has('Protect your saved work'));}
function choose(app,value){
  const input=[...app.w.document.querySelectorAll('input[type=file]')].find(el=>el.closest('label').textContent.includes('Choose recovery file'));
  const raw=JSON.stringify(value),file={size:Buffer.byteLength(raw),text:async()=>raw};
  Object.defineProperty(input,'files',{configurable:true,value:[file]});input.dispatchEvent(new app.w.Event('change',{bubbles:true}));
}
test('compiled recovery preview/cancel/merge and exported round trips preserve originals without growing history',async()=>{
  let app=await mount({storage:{[notebookKey]:JSON.stringify(local)}});
  try{
    app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (1)'));await open(app);
    choose(app,backup);await app.wait(()=>app.buttons('Merge recovery').length===1);assert.ok(app.has('1 sentences and 1 correction notes to add'));
    app.click('Cancel restore');assert.equal(app.w.localStorage.getItem(notebookKey),JSON.stringify(local));
    choose(app,backup);await app.wait(()=>app.buttons('Merge recovery').length===1);app.click('Merge recovery');await app.wait(()=>app.has('Recovery merged.'));
    const stable=app.snapshot();assert.equal(JSON.parse(stable[notebookKey]).entries.length,2);
    const capture=()=>{let exported;app.w.URL.createObjectURL=blob=>{exported=blob;return 'blob:synthetic';};app.w.HTMLAnchorElement.prototype.click=function(){};app.w.URL.revokeObjectURL=()=>{};app.click('Preview recovery export');return async()=>{await app.wait(()=>app.buttons('Download recovery file').length===1);app.click('Download recovery file');return await new Promise((resolve,reject)=>{const r=new app.w.FileReader();r.onload=()=>resolve(JSON.parse(r.result));r.onerror=reject;r.readAsText(exported);});};};
    for(let i=0;i<4;i++){
      const exported=await capture()();choose(app,exported);await app.wait(()=>app.buttons('Merge recovery').length===1);
      assert.ok(app.has('0 records to merge · 0 sentences and 0 correction notes to add · 0 recovery copies'));
      app.click('Merge recovery');await app.wait(()=>app.has('Recovery merged.'));assert.deepEqual(app.snapshot(),stable);
    }
    app.click('Close');await app.wait(()=>app.has('Saved sentences (2)'));assert.ok(app.has('Local note'));assert.ok(app.has('Incoming note'));
    assert.deepEqual(app.errors,[]);app.dom.window.close();
    app=await mount({storage:stable});app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (2)'));assert.ok(app.has('Original'));assert.ok(app.has('Restored original'));assert.ok(app.has('Incoming note'));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('account switching during recovery file reading drops the late preview and rejects another account backup',async()=>{
  const app=await mount({storage:{[notebookKey]:JSON.stringify(local)}});let release;
  try{
    await open(app);const input=app.w.document.querySelector('input[type=file]');
    Object.defineProperty(input,'files',{configurable:true,value:[{size:100,text:()=>new Promise(resolve=>{release=resolve;})}]});input.dispatchEvent(new app.w.Event('change',{bubbles:true}));await app.wait(()=>app.has('Reading recovery file…'));
    app.w.__changeUser('u2');await app.wait(()=>app.has('Protect your saved work')&&!app.has('Reading recovery file…'));
    release(JSON.stringify(backup));await new Promise(resolve=>setTimeout(resolve,25));assert.equal(app.buttons('Merge recovery').length,0);
    choose(app,backup);await app.wait(()=>app.has('Sign in to the same account that created this recovery file'));
    assert.equal(app.buttons('Merge recovery').length,0);assert.equal(app.w.localStorage.getItem(notebookKey),JSON.stringify(local));assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:u2:my'),null);assert.deepEqual(app.errors,[]);
  }finally{release?.(JSON.stringify(backup));app.dom.window.close();}
});
