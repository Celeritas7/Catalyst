const {test}=require('node:test'),assert=require('node:assert/strict');
const {mount}=require('./app-fixture.cjs');
require('../js/catalyst-review.js');
const review=globalThis.CatalystReview;
const settings={targetLanguage:'en',anchor:'none',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[],learned:['because'],practice:{answers:4,correct:2}};
const baseStorage={catalyst_settings:JSON.stringify(settings)};
const gloss='Could you sit down, please?',meaning='कृपया बसाल का?';
const taskId='quiz:meaning:politeness-en-'+gloss,reviewKey='catalyst_review_v1:u1:en';
async function lesson(app){app.w.location.hash='#politeness';await app.wait(()=>app.has(gloss));}
const notes=app=>[...app.w.document.querySelectorAll('p[lang="mr"]')].filter(el=>el.textContent.startsWith('अर्थाची नोंद:'));

test('new meaning and note stay behind reveal/answer, options contain natural meanings, and notebook bytes survive',async()=>{
  const notebookKey='catalyst_notebook_v1:u1:en',saved=JSON.stringify({version:1,entries:[{id:'old',original:'My original sentence.',meaning:'माझा अर्थ',meaningLanguage:'mr',lesson:'politeness',createdAt:'2026-11-22',corrections:[{text:'My separate correction',source:'user-entered',createdAt:'2026-11-23'}]}]});
  const app=await mount({storage:{...baseStorage,[notebookKey]:saved}});
  try{
    await lesson(app);assert.equal(app.has(meaning),false);assert.equal(notes(app).length,0);
    app.click('Think of the meaning, then tap to reveal');await app.wait(()=>notes(app).length===1);
    assert.ok(app.has(meaning));assert.match(notes(app)[0].textContent,/नम्र विनंती/);
    assert.equal(app.has('Translation not available in your meaning language yet.'),false);
    app.click('Hide meaning');await app.wait(()=>notes(app).length===0);assert.equal(app.has(meaning),false);
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem('catalyst_settings')).learned,['because']);
    app.click('02 / Try it yourself →');await app.wait(()=>app.buttons('Start 1 questions →').length===1);
    app.click('Start 1 questions →');await app.wait(()=>app.w.document.querySelectorAll('.answer-btn').length===3);
    assert.equal(notes(app).length,0);
    const options=[...app.w.document.querySelectorAll('.answer-btn')];
    assert.equal(options.some(el=>el.textContent.includes('अर्थाची नोंद')),false);
    assert.ok(options.every(el=>/[\u0900-\u097f]/.test(el.textContent)));
    options.find(el=>el.textContent.includes(meaning)).click();await app.wait(()=>app.has('✓ That’s right!'));
    assert.equal(notes(app).length,1);assert.match(notes(app)[0].textContent,/नम्र विनंती/);
    assert.equal(app.has('English: '+gloss),false);
    const row=JSON.parse(app.w.localStorage.getItem(reviewKey)).items[taskId];
    assert.equal(row.lastAnswer,meaning);assert.equal(row.lastResponse,meaning);
    assert.equal(app.w.localStorage.getItem(notebookKey),saved);
    assert.equal(JSON.parse(app.w.localStorage.getItem('catalyst_settings')).practice.answers,5);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('an existing due question keeps its ID/history and receives the separate Marathi note only after recall',async()=>{
  // This question was already available with English meanings before Phase 6I.
  const task={id:taskId,conceptId:'politeness',skill:'understanding',answer:gloss};
  const data=review.record(review.empty(),task,{correct:false,response:'wrong'},Date.now()-2*review.DAY);
  const app=await mount({storage:{...baseStorage,[reviewKey]:JSON.stringify(data)}});
  try{
    assert.deepEqual(JSON.parse(app.w.localStorage.getItem(reviewKey)),data);
    app.click('◷My Learning');await app.wait(()=>app.has('1 checks due'));
    app.click('Review 1 due checks →');await app.wait(()=>app.buttons(meaning).length===1);
    assert.equal(notes(app).length,0);app.click(meaning);await app.wait(()=>app.has('✓ Correct'));
    assert.equal(notes(app).length,1);assert.match(notes(app)[0].textContent,/क्षमता विचारलेली नाही/);
    const saved=JSON.parse(app.w.localStorage.getItem(reviewKey));
    assert.deepEqual(Object.keys(saved.items),[taskId]);assert.equal(saved.items[taskId].attempts,2);
    assert.equal(saved.items[taskId].lastMistake.expected,gloss);assert.equal(saved.items[taskId].lastAnswer,meaning);
    assert.equal(saved.items[taskId].retentionCorrect,1);assert.equal(saved.items[taskId].mistake,false);
    assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});

test('Marathi polite/familiar lessons retain separate notes and switching to English removes Marathi guidance',async()=>{
  const app=await mount({storage:{catalyst_settings:JSON.stringify({...settings,targetLanguage:'mr'})}});
  try{
    app.w.location.hash='#politeness';await app.wait(()=>app.has('तुम्ही कुठे जाता?'));
    app.click('Think of the meaning, then tap to reveal');await app.wait(()=>notes(app).length===1);
    assert.ok(app.has('तुम्ही कुठे जात आहात?'));assert.match(notes(app)[0].textContent,/आदराने/);
    assert.equal(app.has('Where are you going? (polite)'),false);
    app.click('Next example →');await app.wait(()=>app.has('तू कुठे जातोस?'));assert.equal(notes(app).length,0);
    app.click('Think of the meaning, then tap to reveal');await app.wait(()=>notes(app).length===1);
    assert.ok(app.has('तू कुठे जात आहेस?'));assert.match(notes(app)[0].textContent,/मित्राशी/);
    app.w.document.querySelector('[aria-label="Settings"]').click();await app.wait(()=>!!app.w.document.querySelector('[aria-label="Close settings"]'));
    assert.ok(app.has('Marathi meanings and usage notes are drafts.'));app.select('Meaning language','en');
    await app.wait(()=>JSON.parse(app.w.localStorage.getItem('catalyst_settings')).meaningLanguage==='en');
    app.w.document.querySelector('[aria-label="Close settings"]').click();await app.wait(()=>!app.w.document.querySelector('[aria-label="Close settings"]'));
    assert.equal(notes(app).length,0);
    if(app.buttons('Think of the meaning, then tap to reveal').length)app.click('Think of the meaning, then tap to reveal');
    await app.wait(()=>app.has('Where are you going? (to a friend)')||app.has('Where are you going? (polite)'));
    assert.equal(notes(app).length,0);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
