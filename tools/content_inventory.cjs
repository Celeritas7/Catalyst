// Deterministic inventory of public, bundled content. Never writes SQL or reads
// learner storage, live vocabulary, private source archives, or credentials.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const yaml=require('js-yaml');
const root=path.resolve(__dirname,'..');
const languages=['ja','my','zh','mr','en'];
const present=value=>typeof value==='string'&&value.trim().length>0;
const scripts={ja:/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u,my:/\p{Script=Myanmar}/u,zh:/\p{Script=Han}/u,mr:/\p{Script=Devanagari}/u,en:/\p{Script=Latin}/u};
const placeholder=/^(?:todo|tbd|placeholder|\?{2,}|\.{3,}|…|—)$/i;

function audit(concepts){
  const errors=[],scriptWarnings=[],repeated=new Map(),ids=new Set();
  for(const concept of concepts){
    if(!present(concept.id)||ids.has(concept.id))errors.push(`Missing or duplicate concept ID: ${concept.id}`);
    ids.add(concept.id);
    for(const [language,entry] of Object.entries(concept.entries||{})){
      if(!languages.includes(language)){errors.push(`${concept.id}: unknown language ${language}`);continue;}
      if(!Array.isArray(entry.ex)){errors.push(`${concept.id}:${language}: missing example list`);continue;}
      const exact=new Set();
      entry.ex.forEach((example,index)=>{
        const location=`${concept.id}:${language}:${index+1}`;
        if(!present(example.t)||placeholder.test(example.t.trim())){errors.push(`${location}: missing text or placeholder`);return;}
        // Preserve case, punctuation, spacing, reading, sense and context. A
        // repeated sentence in another lesson is a review candidate, not a deletion.
        const signature=JSON.stringify([example.t,example.e||'',example.r||'',example.h||[],example.devOverride||example.dev||'']);
        if(exact.has(signature))errors.push(`${location}: exact duplicate within one entry`);
        exact.add(signature);
        const key=JSON.stringify([language,example.t]);
        if(!repeated.has(key))repeated.set(key,{language,text:example.t,occurrences:[]});
        repeated.get(key).occurrences.push({location,english:example.e||(language==='en'?example.t:''),reading:example.r||''});
        const warnings=[];
        if(!scripts[language].test(example.t))warnings.push('Expected script not found');
        if(language==='zh'&&/[\p{Script=Hiragana}\p{Script=Katakana}]/u.test(example.t))warnings.push('Kana in a Chinese-labelled example');
        if(warnings.length)scriptWarnings.push({location,text:example.t,warnings});
      });
    }
  }
  return {errors,scriptWarnings,repeatedText:[...repeated.values()].filter(row=>row.occurrences.length>1)};
}

function compareSource(source,concepts){
  const errors=[];
  if(source.length!==concepts.length)errors.push('YAML and bundled concept counts differ');
  source.forEach((concept,index)=>{
    const built=concepts[index];
    if(!built||concept.id!==built.id){errors.push(`YAML concept order/ID differs at ${index+1}`);return;}
    for(const field of ['group','title','summary'])if(concept[field]!==built[field])errors.push(`${concept.id}: stale ${field}`);
    for(const language of languages){
      const entry=concept[language],output=built.entries[language];
      if(!entry||!output){errors.push(`${concept.id}:${language}: source or bundle entry missing`);continue;}
      const projection=e=>({form:e.form,note:e.note,none:!!e.none,checked:e.checked===true,
        ex:(e.ex||[]).map(x=>({t:x.t,e:x.e||'',r:x.r||'',h:x.h==null?[]:Array.isArray(x.h)?x.h:[x.h]}))});
      if(JSON.stringify(projection(entry))!==JSON.stringify(projection(output)))errors.push(`${concept.id}:${language}: bundle differs from YAML; run npm run build`);
    }
  });
  return errors;
}

function auditActivities(pilots,concepts){
  const errors=[],ids=new Set(),bilingual=value=>['mr','en'].every(language=>present(value?.[language]));
  for(const pilot of pilots){
    const at=`activity ${pilot.id}`;
    if(!present(pilot.id)||ids.has(pilot.id))errors.push(`${at}: missing or duplicate ID`);
    ids.add(pilot.id);
    if(!languages.includes(pilot.language))errors.push(`${at}: unknown language`);
    if(pilot.concept&&!concepts.some(concept=>concept.id===pilot.concept))errors.push(`${at}: missing linked concept`);
    for(const field of ['title','summary','situation','meaning','notice','comparison','use','checklist'])if(!bilingual(pilot[field]))errors.push(`${at}: missing bilingual ${field}`);
    if((pilot.deeperTitle&&!bilingual(pilot.deeperTitle))||(pilot.deeper&&!bilingual(pilot.deeper)))errors.push(`${at}: missing bilingual detail`);
    for(const field of ['prompt','hint','explanation'])if(!bilingual(pilot.build?.[field]))errors.push(`${at}: missing bilingual build ${field}`);
    if(![' ', ''].includes(pilot.build?.joiner??' '))errors.push(`${at}: unsupported chunk joiner`);
    const chunks=pilot.build?.chunks;
    if(!Array.isArray(chunks)||!chunks.length||chunks.some(chunk=>!present(chunk)))errors.push(`${at}: missing build chunks`);
    else if(!Array.isArray(pilot.build.orders)||!pilot.build.orders.length||pilot.build.orders.some(order=>!Array.isArray(order)||order.length!==chunks.length||new Set(order).size!==chunks.length||order.some(index=>!Number.isInteger(index)||index<0||index>=chunks.length)))errors.push(`${at}: invalid accepted chunk order`);
    if(!Array.isArray(pilot.choices)||!pilot.choices.length)errors.push(`${at}: missing context choices`);
    for(const question of Array.isArray(pilot.choices)?pilot.choices:[]){
      if(!bilingual(question.prompt)||!bilingual(question.explanation))errors.push(`${at}: missing bilingual choice guidance`);
      if(!Array.isArray(question.options)||question.options.length<2||question.options.some(option=>!present(option))||new Set(question.options).size!==question.options.length||!Array.isArray(question.accepted)||!question.accepted.length||question.accepted.some(index=>!Number.isInteger(index)||index<0||index>=question.options.length))errors.push(`${at}: invalid choice answers`);
    }
    if(!Array.isArray(pilot.sources)||!pilot.sources.length||pilot.sources.some(source=>!present(source.label)||!/^https:\/\//.test(source.url)))errors.push(`${at}: missing source reference`);
    if(pilot.content){
      const content=pilot.content;
      if(content.version!==1||content.language!==pilot.language||!present(content.script)||content.reviewStatus!=='draft')errors.push(`${at}: invalid draft metadata; approval needs a documented review workflow`);
      for(const field of ['register','sense','provenance'])if(!bilingual(content[field]))errors.push(`${at}: missing bilingual ${field}`);
      if(!/^[a-f0-9]{40}$/.test(content.sourceRevision)||!Array.isArray(content.exampleRefs)||!content.exampleRefs.length)errors.push(`${at}: missing pinned example provenance`);
      for(const ref of Array.isArray(content.exampleRefs)?content.exampleRefs:[]){
        const example=concepts.find(concept=>concept.id===ref.conceptId)?.entries?.[ref.language]?.ex?.[ref.index-1];
        if(ref.language!==pilot.language||!Number.isInteger(ref.index)||ref.index<1||!present(ref.text)||example?.t!==ref.text)errors.push(`${at}: linked example changed; review the source reference`);
      }
    }
  }
  return errors;
}

function generate(){
  const context={window:{}};vm.createContext(context);
  const inputs=['data/grammar.yaml','js/catalyst-data.js','js/catalyst-meanings.js','js/catalyst-activities.js','js/catalyst-patterns.js','js/catalyst-coverage.js'];
  for(const file of inputs.filter(file=>file.endsWith('.js')))vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
  const {CATALYST_DATA:data,CatalystMeanings:meanings,CatalystActivities:activities,CatalystPatterns:patterns,CatalystCoverage:coverage}=context.window;
  const findings=audit(data.concepts);
  findings.errors.push(...compareSource(yaml.load(fs.readFileSync(path.join(root,'data/grammar.yaml'),'utf8')),data.concepts));
  findings.errors.push(...auditActivities(activities.pilots,data.concepts));
  const report={version:1,
    scope:'Bundled lesson examples, meaning availability, guided-activity counts/metadata and fixed-pattern counts. Excludes online overrides, learned-word eligibility, personal writing and private source archives.',
    sources:inputs.map(file=>({file,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')})),
    review:{status:'Awaiting documented linguistic review',legacyCheckedMeaning:'A source boolean, not reviewer identity, evidence, date or proof of approval.',language:'Declared language; script checks cannot establish actual language or translation quality.',register:'Not recorded consistently as structured metadata; existing notes are retained.',sense:'Exact English glosses and readings are retained; no normalization or automatic deduplication.',provenance:'Existing repository lesson pack; individual original references and reviewer records are not recorded. Pilot references are described in docs/PHASE3_CONTENT.md. Pattern limitations are in docs/PHASE5G_PATTERN_PRACTICE.md.'},
    languages:languages.map(language=>{
      const summary=coverage.summarize(data.concepts,language,'en',meanings.translate,activities.pilots);
      return {language,lessons:summary.availableLessons,examples:summary.examples,sourceCheckedLessons:summary.sourceCheckedLessons,guidedActivities:summary.guidedActivities,
        fixedPatterns:language==='my'?patterns.patterns.length:0,
        meanings:['mr','en'].map(meaningLanguage=>{
          const translated=coverage.summarize(data.concepts,language,meaningLanguage,meanings.translate);
          return {language:meaningLanguage,available:translated.translated,missing:translated.examples-translated.translated,
            gaps:translated.lessons.flatMap(lesson=>lesson.missing.map(index=>({location:`${lesson.id}:${language}:${index}`,english:data.concepts.find(c=>c.id===lesson.id).entries[language].ex[index-1].e||(language==='en'?data.concepts.find(c=>c.id===lesson.id).entries[language].ex[index-1].t:'')})))};
        })};
    }),guidedActivities:activities.pilots.map(pilot=>({id:pilot.id,language:pilot.language,concept:pilot.concept||null,content:pilot.content||null,sources:pilot.sources})),...findings};
  return report;
}

if(require.main===module){
  const report=generate(),output=JSON.stringify(report,null,2)+'\n',file=path.join(root,'docs/content-coverage.json');
  if(report.errors.length){console.error(report.errors.join('\n'));process.exitCode=1;}
  else if(process.argv.includes('--write')){fs.writeFileSync(file,output);console.log('Updated docs/content-coverage.json');}
  else if(!fs.existsSync(file)||fs.readFileSync(file,'utf8')!==output){console.error('Content inventory is stale. Run npm run inventory:content and review the changes.');process.exitCode=1;}
  else console.log(`Content inventory verified: ${report.languages.reduce((n,l)=>n+l.examples,0)} examples; ${report.repeatedText.length} repeated-text group(s); ${report.scriptWarnings.length} script warning(s). Availability is not linguistic approval.`);
}
module.exports={audit,compareSource,auditActivities,generate};
