// Existing AI examples stay readable; the practice UI cannot start paid generation.
const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
test('saved AI history: meanings, failed reads/flags, account/target changes and no model endpoint',async()=>{
  const a=await mount();
  try{
    a.click('✨ Your words');await a.wait(()=>a.buttons('Show earlier AI sentences').length===1);
    assert.equal(a.w.__qa.requests.filter(r=>r.url.includes('/functions/v1/')).length,0);
    a.click('Show earlier AI sentences');await a.wait(()=>a.has('जुना अर्थ'));
    assert.ok(!a.has('Old English meaning'));assert.equal(a.buttons('✨ New Burmese sentence').length,0);
    a.w.__qa.flagError=true;a.click('🚩 Wrong');await a.wait(()=>a.has('Could not save the flag.'));assert.ok(a.has('जुना अर्थ'));
    a.w.__qa.readError=true;a.click('Reload saved sentences');await a.wait(()=>a.has('Saved AI sentences could not be loaded.'));
    a.w.__qa.readError=false;a.click('Reload saved sentences');await a.wait(()=>a.has('जुना अर्थ'));
    a.w.__changeUser('u2');await a.wait(()=>!a.buttons('Reload saved sentences').length);a.click('✨ Your words');await a.wait(()=>a.buttons('Show earlier AI sentences').length===1);a.click('Show earlier AI sentences');await a.wait(()=>a.has('No saved examples loaded for this lesson and learning language.'));assert.ok(!a.has('जुना अर्थ'));
    a.w.__changeUser('u1');await a.wait(()=>!a.buttons('Reload saved sentences').length);
    a.w.document.querySelector('[aria-label="Settings"]').click();await a.wait(()=>a.w.document.querySelector('[aria-label="Close settings"]'));
    a.select('I’m learning','ja');await a.wait(()=>a.has('Learning Japanese'));a.select('Meaning language','en');await a.wait(()=>a.has('Meanings: English'));
    a.w.document.querySelector('[aria-label="Close settings"]').click();a.click('✨ Your words');await a.wait(()=>a.buttons('Show earlier AI sentences').length===1);a.click('Show earlier AI sentences');await a.wait(()=>a.has('Old English meaning'));
    assert.ok(!a.has('जुना अर्थ'));assert.equal(a.buttons('Make practice sentence').length,0);
    a.w.__qa.flagError=false;a.click('🚩 Wrong');await a.wait(()=>a.has('Sentence hidden and kept for review.'));assert.ok(!a.has('Old English meaning'));
    a.w.__changeUser(null);await a.wait(()=>!a.buttons('Reload saved sentences').length);a.click('✨ Your words');await a.wait(()=>a.has('Pattern practice currently supports Burmese'));
    assert.equal(a.buttons('Show earlier AI sentences').length,0);
    assert.equal(a.w.__qa.requests.filter(r=>r.url.includes('/functions/v1/')).length,0);assert.deepEqual(a.errors,[]);
  }finally{a.dom.window.close();}
});
