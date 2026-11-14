const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = {window:{}};
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'js/catalyst-preferences.js'),'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root,'js/catalyst-meanings.js'),'utf8'), context);
vm.runInContext(fs.readFileSync(path.join(root,'js/catalyst-data.js'),'utf8'), context);
vm.runInContext(html.slice(html.indexOf('    const LANG ='),html.indexOf('    // ---- settings')) + html.slice(html.indexOf('    const GROUP_ICON'),html.indexOf('    function Practice(')) + '\nthis.questions = makeQuestions;',context);
const concepts=context.window.CATALYST_DATA.concepts;
let count=0;
for(const langs of [['ja','my','zh','mr'],['ja','en'],['my','mr'],['zh','en']]) {
  for(const kind of ['meaning','forms','connections']) {
    const qs=context.questions(concepts,langs,kind);
    assert(qs.length>0);
    for(const q of qs) {
      assert.equal(q.options.length,3);
      assert.equal(new Set(q.options).size,3);
      assert(q.options.includes(q.answer));
      assert(q.note);
      count++;
    }
    for(const c of concepts) {
      if(kind==='forms' && !langs.some(l=>['ja','my','zh'].includes(l)&&c.entries[l]&&!c.entries[l].none)) continue;
      assert(qs.some(q=>q.concept.id===c.id),`${kind} missing ${c.id}`);
    }
  }
}
assert.equal(context.questions([],['ja','mr']).length,0);
console.log(`Validated ${count} generated questions, all eligible concepts, and empty content.`);

const meanings=context.window.CatalystMeanings;
assert.equal(meanings.language({anchor:'mr'}),'mr');
assert.equal(meanings.language({anchor:'mr',meaningLanguage:'en'}),'en');
assert.equal(meanings.translate('Untranslated new sentence','mr'),null);
for(const c of concepts) for(const l of ['ja','my','zh']) for(const ex of c.entries[l].ex) {
  assert(meanings.translate(ex.e,'mr'),`Missing Marathi meaning: ${ex.e}`);
}
const mrQuestions=context.questions(concepts,['my','mr'],'meaning','mr');
for(const q of mrQuestions) {
  assert(/[\u0900-\u097f]/.test(q.answer));
  assert.equal(new Set(q.options).size,3);
  assert(q.options.includes(q.answer));
  assert(!q.options.includes(q.example.e));
}
const food=mrQuestions.find(q=>q.example.e==='I eat meat and I eat fish too.');
assert(food && food.answer.includes('मासेही'));
assert.equal(context.questions([{...concepts[0],entries:{my:{ex:[{t:'new',e:'Unknown gloss'}]}}}],['my'],'meaning','mr').length,0);
console.log(`Validated Marathi coverage and ${mrQuestions.length} Burmese-to-Marathi questions.`);

const preferences=context.window.CatalystPreferences;
const old={anchor:'mr',show:{ja:false,my:true,zh:false},dev:true,learned:['also_mo'],practice:{answers:12,correct:8},lastConcept:'also_mo'};
const migrated=preferences.normalize(old);
assert.equal(migrated.targetLanguage,'my');
assert.equal(migrated.meaningLanguage,'mr');
assert.equal(migrated.showEnglish,false);
assert.equal(migrated.dev,true);
assert.deepEqual(migrated.learned,old.learned);
assert.deepEqual(migrated.practice,old.practice);
assert.equal(migrated.lastConcept,old.lastConcept);
const switched=preferences.normalize({...migrated,anchor:'zh'});
assert.equal(switched.meaningLanguage,'mr');
assert.equal(switched.targetLanguage,'my');
assert.deepEqual(switched.practice,old.practice);
assert.deepEqual(JSON.parse(JSON.stringify(preferences.normalize(switched))),JSON.parse(JSON.stringify(switched)));
const solo=preferences.normalize({...migrated,anchor:'none',comparisonLanguages:[]});
assert.equal(preferences.languages(solo).join(','),'my');
assert.equal(context.questions(concepts,preferences.languages(solo),'connections','mr',['my']).length,0);
for(const kind of ['meaning','forms']) {
 const questions=context.questions(concepts,['my','ja','zh','mr'],kind,'mr',['my']);
 assert(questions.length>0);
 assert(questions.every(q=>q.lang==='my'));
}
const connections=context.questions(concepts,['my','ja','zh','mr'],'connections','mr',['my']);
assert(connections.every(q=>q.id.includes('-my-')||q.id.endsWith('-my')));
for(const bad of [null,[],{targetLanguage:'invalid',anchor:'unknown',comparisonLanguages:['invalid','ja','ja']}]) {
 const result=preferences.normalize(bad);
 assert(preferences.codes.includes(result.targetLanguage));
 assert(preferences.languages(result).every(l=>preferences.codes.includes(l)));
}
assert.equal(preferences.normalize({}).comparisonLanguages.length,0);
for(const target of preferences.availableTargets(concepts)) {
 assert(context.questions(concepts,[target],'meaning','en',[target]).length>0);
}
console.log('Validated legacy preference migration, independent language choices, single-target quizzes, comparison scope and all available targets.');

// Regression: Burmese form quizzes must not inherit Japanese lesson titles.
for (const meaningLanguage of ['mr','en']) {
 const forms=context.questions(concepts,['my','mr'],'forms',meaningLanguage,['my']);
 assert(forms.length>0);
 for(const q of forms) {
  assert.equal(q.lang,'my');
  assert(q.options.every(x=>!/[\u3040-\u30ff\u3400-\u9fff]/.test(x)));
  if(meaningLanguage==='mr') assert(q.options.every(x=>/[\u0900-\u097f]/.test(x)));
 }
 const negation=forms.find(q=>q.concept.id==='negation');
 assert.equal(negation.answer,meaningLanguage==='mr'?'नकार / नाही':'Negation / not');
}
assert.equal(context.questions(concepts,['my'],'forms','unsupported',['my']).length,0);
console.log('Validated Marathi/English form labels without Japanese title leakage.');
