const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
async function explore(app){
  [...app.w.document.querySelectorAll('nav[aria-label="Main navigation"] button')].find(button=>button.textContent.includes('Explore')).click();
  await app.wait(()=>app.has('Content coverage'));
}
const panel=app=>app.w.document.querySelector('[aria-labelledby="coverage-title"]');
const metric=(app,label)=>[...panel(app).querySelectorAll('dl div')].find(row=>row.querySelector('dt')?.textContent===label)?.querySelector('dd').textContent;
async function preference(app,label,value){
  app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
  app.select(label,value);await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings'))[label==='I’m learning'?'targetLanguage':'meaningLanguage']===value);
  app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));
}

test('Explore counts switch with target/meaning preferences without claiming review or changing saved work',async()=>{
  const sentinel='retained notebook bytes',app=await mount({storage:{'catalyst_notebook_v1:u1:my':sentinel}});
  try{
    await explore(app);assert.equal(metric(app,'Examples'),'50');assert.equal(metric(app,'Marathi meanings'),'50 / 50');assert.equal(metric(app,'Guided activities'),'3');
    assert.match(panel(app).textContent,/No lessons are marked as checked/);
    await preference(app,'I’m learning','en');await app.wait(()=>metric(app,'Examples')==='24');
    assert.equal(metric(app,'Marathi meanings'),'24 / 24');assert.equal(metric(app,'Guided activities'),'0');
    assert.match(panel(app).textContent,/Every example/);assert.match(panel(app).textContent,/await native-speaker review/);
    await preference(app,'I’m learning','mr');await app.wait(()=>metric(app,'Examples')==='48');
    assert.equal(metric(app,'Marathi meanings'),'48 / 48');
    await preference(app,'I’m learning','en');await app.wait(()=>metric(app,'Examples')==='24');
    await preference(app,'Meaning language','en');await app.wait(()=>metric(app,'English meanings')==='24 / 24');
    assert.match(panel(app).textContent,/Every example/);
    await preference(app,'Meaning language','mr');await app.wait(()=>metric(app,'Marathi meanings')==='24 / 24');
    assert.equal(panel(app).querySelector('details button'),null);
    assert.equal(app.w.localStorage.getItem('catalyst_notebook_v1:u1:my'),sentinel);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('coverage reflects late online content and never upgrades a legacy checked flag into approval',async()=>{
  let deliver;
  const app=await mount({setup(w){
    const from=w.__mockDb.from.bind(w.__mockDb),gate=new Promise(resolve=>{deliver=resolve;});
    const c=w.CATALYST_DATA.concepts[0];
    const rows={catalyst_concepts:[{id:c.id,sort_order:1,group_name:c.group,title:c.title,summary:c.summary,levels:c.levels,pair_notes:c.pairNotes}],catalyst_entries:[{id:'entry',concept_id:c.id,language_code:'my',form:'က',note:'Synthetic online content',has_equivalent:true,checked:true}],catalyst_examples:[{entry_id:'entry',sort_order:1,native_text:'က',english_text:'A new, untranslated gloss',highlight:[]}]};
    w.__mockDb.from=table=>rows[table]?{select(){return this;},limit:()=>gate.then(()=>({data:rows[table]}))}:from(table);
  }});
  try{
    await explore(app);assert.equal(metric(app,'Examples'),'50');
    deliver();await app.wait(()=>metric(app,'Examples')==='1');
    assert.equal(metric(app,'Marathi meanings'),'0 / 1');assert.equal(metric(app,'Lessons with examples'),'1');
    assert.match(panel(app).textContent,/Showing online lessons/);assert.match(panel(app).textContent,/Reviewer details and evidence are not available/);
    assert.equal(panel(app).textContent.includes('native-speaker approved'),false);
    assert.match(panel(app).textContent,/1 example in 1 lesson/);
    const details=panel(app).querySelector('details');details.querySelector('summary').click();
    details.querySelector('button').click();
    await app.wait(()=>!app.has('Content coverage'));assert.ok(app.w.document.querySelector('[aria-label="Lesson mode"]'));
    app.click('Think of the meaning, then tap to reveal');await app.wait(()=>app.has('Translation not available in your meaning language yet.'));
    assert.equal(app.has('A new, untranslated gloss'),false);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
