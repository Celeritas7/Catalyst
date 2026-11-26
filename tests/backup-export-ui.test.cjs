const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
const key='catalyst_notebook_v1:u1:my';
const saved={version:1,entries:[{id:'original',original:'စာ',meaning:'सराव',meaningLanguage:'mr',lesson:'',createdAt:'2026-11-26',corrections:[]}]};
function downloads(w){
  const blobs=[],clicks=[],revoked=[],timers=[];let fail=false;
  w.URL.createObjectURL=blob=>{if(fail)throw Error('Unavailable');blobs.push(blob);return 'blob:backup-'+blobs.length;};
  w.URL.revokeObjectURL=url=>revoked.push(url);
  const timeout=w.setTimeout.bind(w);w.setTimeout=(fn,ms,...args)=>{if(ms===60000){timers.push(fn);return 1;}return timeout(fn,ms,...args);};
  w.HTMLAnchorElement.prototype.click=function(){assert.equal(this.isConnected,true);clicks.push({name:this.download,url:this.href});};
  const read=blob=>new Promise((resolve,reject)=>{const r=new w.FileReader();r.onload=()=>resolve(JSON.parse(r.result));r.onerror=reject;r.readAsText(blob);});
  return {blobs,clicks,revoked,timers,read,fail:value=>{fail=value;}};
}
async function notebook(app){app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (1)'));}

test('notebook export retries failures, reads current saved notes, and gives distinct backup names without altering writing',async()=>{
 const app=await mount({storage:{[key]:JSON.stringify(saved)}});
 try{
  const d=downloads(app.w);await notebook(app);const before=app.snapshot();
  d.fail(true);app.click('Export notebook');await app.wait(()=>app.has('Notebook export could not start'));
  assert.deepEqual(app.snapshot(),before);assert.equal(d.clicks.length,0);
  d.fail(false);
  const latest=structuredClone(saved);latest.entries[0].corrections.push({text:'New note from another tab',createdAt:'2026-11-26',source:'user-entered'});
  app.w.localStorage.setItem(key,JSON.stringify(latest)); // Storage event has not yet updated rendered state.
  app.click('Export notebook');await app.wait(()=>app.has('Download requested:'));
  app.click('Export notebook');await app.wait(()=>d.clicks.length===2);
  assert.notEqual(d.clicks[0].name,d.clicks[1].name);
  assert.match(d.clicks[0].name,/^catalyst-notebook-my-\d{4}-.*Z-[a-f0-9]{8}\.json$/);
  assert.deepEqual(await d.read(d.blobs[0]),{language:'my',...latest});
  assert.equal(app.w.localStorage.getItem(key),JSON.stringify(latest));
  assert.equal(d.revoked.length,0);d.timers.forEach(fn=>fn());assert.equal(d.revoked.length,2);
  assert.equal(app.w.document.querySelectorAll('a[download]').length,0);
  assert.ok(app.has('Confirm this file is in Files or Downloads'));assert.deepEqual(app.errors,[]);
 }finally{app.dom.window.close();}
});

test('unreadable notebook is not exported from an outdated rendered copy',async()=>{
 const app=await mount({storage:{[key]:JSON.stringify(saved)}});
 try{
  const d=downloads(app.w);await notebook(app);app.w.localStorage.setItem(key,'{damaged');
  app.click('Export notebook');await app.wait(()=>app.has('Notebook export could not start'));
  assert.equal(d.blobs.length,0);assert.equal(app.w.localStorage.getItem(key),'{damaged');assert.deepEqual(app.errors,[]);
 }finally{app.dom.window.close();}
});

test('recovery download failure preserves preview and cleanup permits retry without including credentials',async()=>{
 const app=await mount({storage:{[key]:JSON.stringify(saved)}});
 try{
  const d=downloads(app.w);app.click('Study offline');await app.wait(()=>app.has('Protect your saved work'));
  app.click('Preview recovery export');await app.wait(()=>app.buttons('Download recovery file').length===1);
  const before=app.snapshot();const click=app.w.HTMLAnchorElement.prototype.click;
  app.w.HTMLAnchorElement.prototype.click=function(){throw Error('Download blocked');};
  app.click('Download recovery file');await app.wait(()=>app.has('Recovery download could not start'));
  assert.equal(d.revoked.length,1);assert.equal(app.w.document.querySelectorAll('a[download]').length,0);
  assert.equal(app.buttons('Download recovery file').length,1);assert.deepEqual(app.snapshot(),before);
  app.w.HTMLAnchorElement.prototype.click=click;
  app.click('Download recovery file');await app.wait(()=>app.has('Download requested:'));
  app.click('Download recovery file');assert.notEqual(d.clicks[0].name,d.clicks[1].name);
  const exported=await d.read(d.blobs[1]);assert.ok(exported.records.some(r=>r.type==='notebook'));
  assert.doesNotMatch(JSON.stringify(exported),/FAKE_TEST_TOKEN|test@example.invalid/);
  assert.deepEqual(app.snapshot(),before);assert.deepEqual(app.errors,[]);
 }finally{app.dom.window.close();}
});
