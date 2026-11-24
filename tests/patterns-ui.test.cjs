const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
test('mounted pattern practice: real selections, saving, duplicate protection and reload persistence',async()=>{
  const original={version:1,entries:[{id:'old-note',original:'Keep my writing',lesson:'',meaning:'Keep my meaning',meaningLanguage:'en',createdAt:'2026-11-23',corrections:[{text:'Keep my correction',createdAt:'2026-11-24',source:'user-entered'}]}]};
  let app=await mount({storage:{'catalyst_notebook_v1:u1:my':JSON.stringify(original)}});
  try{
    app.click('✨ Your words');await app.wait(()=>app.buttons('Make practice sentence').length===1);app.click('Make practice sentence');await app.wait(()=>app.has('मी सफरचंद खातो.'));
    assert.ok(!app.has('I eat an apple.'));assert.ok(app.has('Approximate Devanagari reading'));
    app.click('Save pattern to notebook');await app.wait(()=>app.has('Saved to My Learning'));app.click('Save pattern to notebook');await app.wait(()=>app.has('No duplicate was added.'));
    let entries=JSON.parse(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my')).entries;assert.equal(entries.length,2);assert.deepEqual(entries[1],original.entries[0]);
    app.click('Next word');await app.wait(()=>app.has('मी भात खातो.'));app.select('Speaker form','feminine');await app.wait(()=>!app.buttons('Save pattern to notebook').length);app.click('Make practice sentence');await app.wait(()=>app.has('मी भात खाते.'));
    app.select('Sentence pattern','pattern-my-go-place-v1');await app.wait(()=>app.has('No matching learned place word yet.'));assert.equal(app.buttons('Make practice sentence').length,0);
    app.select('Sentence pattern','pattern-my-drink-v1');await app.wait(()=>app.buttons('Make practice sentence').length===1);app.click('Make practice sentence');await app.wait(()=>app.has('मी पाणी पिते.'));app.click('Save pattern to notebook');await app.wait(()=>app.has('Saved to My Learning'));
    const state=app.snapshot();assert.equal(app.w.__qa.requests.filter(r=>r.url.includes('/functions/v1/')).length,0);assert.deepEqual(app.errors,[]);
    app.dom.window.close();app=await mount({storage:state});app.click('◷My Learning');await app.wait(()=>app.has('Saved sentences (3)'));
    assert.ok(app.has('Keep my correction'));assert.ok(app.has('मी पाणी पिते.'));assert.ok(app.has('From pattern practice:'));assert.ok(app.has('Saved pattern sentence'));assert.ok(app.has('Approximate Devanagari reading'));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
test('source error recovery and notebook write failure preserve data and displayed work',async()=>{
  const app=await mount({setup:w=>{w.__qa.progressError=true;}});
  try{
    app.click('✨ Your words');await app.wait(()=>app.has('Could not read your KG Chart progress.'));assert.equal(app.buttons('Make practice sentence').length,0);
    app.w.__qa.progressError=false;app.click('Refresh learned words');await app.wait(()=>app.buttons('Make practice sentence').length===1);app.click('Make practice sentence');await app.wait(()=>app.buttons('Save pattern to notebook').length===1);
    const before=app.w.localStorage.getItem('catalyst_notebook_v1:u1:my');app.w.Storage.prototype.setItem=function(){throw new Error('quota exceeded');};
    app.click('Save pattern to notebook');await app.wait(()=>app.has('Could not save to the notebook.'));assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my'),before);assert.ok(app.has('मी सफरचंद खातो.'));assert.equal(app.buttons('Open notebook').length,0);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
test('late progress cannot cross accounts; sign-out removes private choices',async()=>{
  let release;
  const app=await mount({setup:w=>{const load=w.CatalystPatterns.load;w.CatalystPatterns.load=async(client,user)=>{if(user==='u1')return new Promise(resolve=>{release=resolve;});return load(client,user);};}});
  try{
    app.click('✨ Your words');await app.wait(()=>typeof release==='function');app.w.__changeUser('u2');await app.wait(()=>!app.buttons('Refresh learned words').length);
    app.click('✨ Your words');await app.wait(()=>app.has('No compatible learned food word yet.'));release([{id:'apple',language:'my',native:'ပန်းသီး',english:'Apple'}]);await new Promise(resolve=>setTimeout(resolve,30));
    assert.equal(app.buttons('Make practice sentence').length,0);assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:u2:my'),null);
    app.w.__changeUser(null);await app.wait(()=>!app.buttons('Refresh learned words').length);app.click('✨ Your words');await app.wait(()=>app.buttons('Sign in').length===1);assert.equal(app.buttons('Make practice sentence').length,0);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
