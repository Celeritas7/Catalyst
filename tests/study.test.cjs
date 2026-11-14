const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = {window:{}};
vm.createContext(context);
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
