const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const context = {window:{}};
vm.createContext(context);
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
