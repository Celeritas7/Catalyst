const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
const settings={targetLanguage:'my',meaningLanguage:'en',comparisonLanguages:[]};
const storage={catalyst_settings:JSON.stringify(settings)};
const panel=app=>app.w.document.querySelector('.activity-panel');
const focus=app=>app.w.document.activeElement;
const same=(actual,expected,message)=>assert.ok(actual===expected,message||'Expected the same DOM node');
const stepHeading=app=>app.w.document.querySelector('.activity-body h3');
const linked=(app,el,attr)=>el.getAttribute(attr)?.split(/\s+/).map(id=>app.w.document.getElementById(id));
const input=(app,el,value)=>{Object.getOwnPropertyDescriptor(app.w.HTMLTextAreaElement.prototype,'value').set.call(el,value);el.dispatchEvent(new app.w.Event('input',{bubbles:true}));};
async function open(app,id='my-word-order'){
  app.w.location.hash='#explore';
  await app.wait(()=>!!app.w.document.querySelector('[aria-labelledby="coverage-title"]'));
  const pilot=app.w.CatalystActivities.pilots.find(p=>p.id===id);
  const launcher=()=>[...app.w.document.querySelectorAll('.lesson-link')].find(el=>el.querySelector('strong')?.textContent===pilot.title.en);
  await app.wait(()=>!!launcher());launcher().focus();launcher().click();await app.wait(()=>!!panel(app));return pilot;
}
async function step(app,name){
  const button=[...panel(app).querySelectorAll('.activity-steps button')].find(el=>el.textContent.endsWith(name));
  button.focus();button.click();await app.wait(()=>stepHeading(app)?.textContent.includes(name==='Use'?'Use it yourself':name));
}

test('guided navigation focuses its title and each requested step, then returns to the matching activity card',async()=>{
  for(const language of ['my','ja']){
    const app=await mount({storage:{catalyst_settings:JSON.stringify({...settings,targetLanguage:language})}});
    try{
      for(const pilot of app.w.CatalystActivities.pilots.filter(p=>p.language===language)){
        await open(app,pilot.id);
        same(focus(app),panel(app).querySelector('h2'),'opening must orient the keyboard learner');
        assert.equal(focus(app).lang,'en');same(linked(app,panel(app),'aria-labelledby')[0],focus(app));
        for(const name of ['Build','Choose','Use','Notice','Situation']){
          await step(app,name);same(focus(app),stepHeading(app));
          const current=panel(app).querySelectorAll('.activity-steps [aria-current="step"]');assert.equal(current.length,1);
          same(linked(app,current[0],'aria-controls')[0],panel(app).querySelector('.activity-body'));
        }
        app.click('Next: Notice →');await app.wait(()=>stepHeading(app).textContent.includes('Notice'));same(focus(app),stepHeading(app));
        app.click('← Previous step');await app.wait(()=>stepHeading(app).textContent.includes('Situation'));same(focus(app),stepHeading(app));
        app.click('Close activity');await app.wait(()=>!panel(app));
        assert.equal(focus(app).querySelector('strong')?.textContent,pilot.title.en);
      }
      assert.deepEqual(app.errors,[]);
    }finally{app.dom.window.close();}
  }
});

test('chunk actions keep a usable focus destination and announce changes without replacing the live regions',async()=>{
  const app=await mount({storage});
  try{
    const pilot=await open(app);await step(app,'Build');
    const bank=panel(app).querySelector('.chunk-bank'),answer=panel(app).querySelector('.chunk-answer');
    assert.equal(bank.getAttribute('role'),'group');assert.equal(answer.getAttribute('role'),'group');
    const status=panel(app).querySelector('[data-chunk-status]');assert.equal(status.getAttribute('role'),'status');assert.equal(status.textContent,'');
    const feedback=panel(app).querySelector('[data-build-feedback]');assert.equal(feedback.getAttribute('role'),'status');assert.equal(feedback.textContent,'');
    const first=bank.querySelector('button');assert.match(first.getAttribute('aria-label'),/^Add chunk:/);first.focus();first.click();
    await app.wait(()=>answer.querySelectorAll('button').length===1);
    same(focus(app),bank.querySelector('button:not(:disabled)'));assert.ok(status.textContent.includes('1 of '+pilot.build.chunks.length));
    const selected=answer.querySelector('button');selected.focus();selected.click();await app.wait(()=>answer.querySelectorAll('button').length===0);
    same(focus(app),first);assert.match(status.textContent,/removed/i);same(status,panel(app).querySelector('[data-chunk-status]'));
    for(const id of pilot.build.orders[0]){
      const button=[...bank.querySelectorAll('button')].find(el=>el.textContent===pilot.build.chunks[id]);button.focus();button.click();
      await app.wait(()=>button.disabled);
    }
    same(focus(app),app.button('Check order'));app.click('Check order');await app.wait(()=>feedback.textContent.includes('Accepted order'));
    same(feedback,panel(app).querySelector('[data-build-feedback]'));same(focus(app),app.button('Check order'));
    const hint=app.button('Hint'),hintRegion=linked(app,hint,'aria-controls')[0];assert.ok(hintRegion);assert.equal(hintRegion.textContent,'');
    hint.focus();hint.click();await app.wait(()=>hint.getAttribute('aria-expanded')==='true');assert.ok(hintRegion.textContent);same(focus(app),hint);
    const clear=app.button('Clear');clear.focus();clear.click();await app.wait(()=>answer.querySelectorAll('button').length===0);same(focus(app),clear);
    assert.equal(status.textContent,'Sentence cleared. Choose chunks to start again.');
    const reveal=app.button('Reveal one answer');reveal.focus();reveal.click();await app.wait(()=>feedback.textContent.includes('revealed'));same(focus(app),reveal);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('choice groups identify their question and update existing feedback without moving focus',async()=>{
  const app=await mount({storage});
  try{
    const pilot=await open(app);await step(app,'Choose');
    const groups=[...panel(app).querySelectorAll('.activity-choice')];
    for(let i=0;i<groups.length;i++){
      const group=groups[i],question=pilot.choices[i],region=group.querySelector('[role="status"]');
      assert.equal(group.getAttribute('role'),'group');assert.ok(linked(app,group,'aria-labelledby')[0].textContent.includes(question.prompt.en));assert.equal(region.textContent,'');
      const reveal=group.querySelector('.quiet-btn');same(linked(app,reveal,'aria-controls')[0],region);reveal.focus();reveal.click();
      await app.wait(()=>region.textContent.includes('Accepted answer:'));same(focus(app),reveal);assert.equal(reveal.getAttribute('aria-expanded'),'true');
      reveal.click();await app.wait(()=>region.textContent==='');assert.equal(reveal.getAttribute('aria-expanded'),'false');
      const answer=group.querySelectorAll('.answer-btn')[question.accepted[0]];answer.focus();answer.click();await app.wait(()=>region.textContent.includes('Fits this intention'));
      same(focus(app),answer);same(region,group.querySelector('[role="status"]'));assert.equal(answer.getAttribute('aria-pressed'),'true');
      assert.equal(reveal.hasAttribute('aria-expanded'),false,'a result that stays visible is no longer a disclosure');
    }
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('writing actions keep errors discoverable, preserve input and focus the draft after recovery controls disappear',async()=>{
  const app=await mount({storage});
  try{
    await open(app);await step(app,'Use');
    const draft=panel(app).querySelector('.activity-draft'),meaning=panel(app).querySelector('.notebook-transfer textarea');
    assert.ok(linked(app,draft,'aria-describedby')[0].textContent.includes('No automatic grammar grading'));
    input(app,draft,'Keep this writing');input(app,meaning,'Keep its meaning');await app.wait(()=>app.has('Recovery draft saved'));
    const set=app.w.Storage.prototype.setItem;
    app.w.Storage.prototype.setItem=function(key,value){if(key==='catalyst_activity_v1:u1:my')throw Error('Synthetic quota');return set.call(this,key,value);};
    const save=app.button('Save draft');save.focus();save.click();await app.wait(()=>app.has('Could not save. Keep this page open'));
    same(focus(app),save);assert.equal(draft.value,'Keep this writing');assert.ok(panel(app).querySelector('[data-save-status]').textContent.includes('Could not save.'));
    app.w.Storage.prototype.setItem=set;save.click();await app.wait(()=>app.has('Draft saved on this device.'));
    input(app,meaning,'Changed meaning');await app.wait(()=>panel(app).querySelector('[data-save-status]').textContent==='Unsaved changes');
    const keep=app.button('Keep draft for later');keep.focus();keep.click();await app.wait(()=>draft.value==='');same(focus(app),draft);
    const recovery=panel(app).querySelector('.draft-recovery details');assert.ok(recovery);recovery.querySelector('summary').click();assert.equal(recovery.open,true);
    const resume=app.buttons('Resume draft')[0];assert.ok(resume);resume.focus();resume.click();await app.wait(()=>draft.value==='Keep this writing');same(focus(app),draft);
    app.w.confirm=()=>false;const close=app.button('Close activity');close.focus();close.click();same(focus(app),close);assert.equal(draft.value,'Keep this writing');assert.ok(panel(app));
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
