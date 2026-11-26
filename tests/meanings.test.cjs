const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const context={window:{}};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/catalyst-meanings.js'),'utf8'),context);
const {translate,note}=context.window.CatalystMeanings;

test('unknown glosses, inherited property names and non-text inputs never masquerade as Marathi translations',()=>{
  for(const text of ['constructor','toString','__proto__','hasOwnProperty','Unknown gloss','I ate.','Where are you going? (new context)',' I know him.','I know him',null,undefined,42,{},['I know him.']]){
    assert.equal(translate(text,'mr'),null);assert.equal(note(text,'mr'),null);
  }
  for(const text of [null,undefined,42,{},[],true,'','  '])assert.equal(translate(text,'en'),null);
  assert.equal(translate('A new English gloss','en'),'A new English gloss');
  assert.equal(translate('I know him.','unsupported'),null);
  assert.equal(note('I ate. (male)','en'),null);
});

test('gender, tense, agency and request register retain their intended distinctions',()=>{
  assert.equal(translate('I eat an apple. (male; a woman says खाते)','mr'),'मी सफरचंद खातो.');
  assert.equal(translate('I eat an apple.','mr'),'मी सफरचंद खातो / खाते.');
  assert.match(note('I eat an apple. (male; a woman says खाते)','mr'),/स्त्री.*खाते/);
  assert.equal(translate('My brother went to school.','mr'),'माझा भाऊ शाळेत गेला.');
  assert.match(translate('My younger brother went to school.','mr'),/धाकटा/);
  assert.equal(translate('the book bought yesterday','mr'),'काल विकत घेतलेलं पुस्तक');
  assert.equal(translate('the book that I bought yesterday','mr'),'मी काल विकत घेतलेलं पुस्तक');
  assert.equal(translate('I ate. (male)','mr'),'मी जेवलो.');
  assert.equal(translate("I've already eaten.",'mr'),'माझं आधीच जेवण झालं आहे.');
  assert.match(translate('Where are you going? (polite)','mr'),/^तुम्ही/);
  assert.match(translate('Where are you going? (to a friend)','mr'),/^तू /);
  assert.equal(translate('Could you sit down, please?','mr'),'कृपया बसाल का?');
  assert.equal(translate('Please sit.','mr'),'कृपया बसा.');
  assert.match(note("I'm not going because it's raining.",'mr'),/पाऊस.*कारण/);
  assert.equal(translate("I'm not going because it's raining.",'mr'),translate("Because it's raining, I'm not going.",'mr'));
});
