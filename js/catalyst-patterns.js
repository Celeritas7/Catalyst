// Small, explicit Burmese practice bank. No model, quota or database writes.
(function(root){
  'use strict';
  const normalize=value=>typeof value==='string'?value.normalize('NFC').trim():'';
  const english=value=>normalize(value).toLowerCase();
  const patterns=[
    {id:'pattern-my-eat-food-v1',kind:'food',label:{en:'I eat [food]',mr:'मी [खाद्यपदार्थ] खातो / खाते'},verb:'စားတယ်',dev:'सादै',en:'I eat ',mr:{masculine:'खातो',feminine:'खाते'}},
    {id:'pattern-my-drink-v1',kind:'drink',label:{en:'I drink [drink]',mr:'मी [पेय] पितो / पिते'},verb:'သောက်တယ်',dev:'थाउक् तै',en:'I drink ',mr:{masculine:'पितो',feminine:'पिते'}},
    {id:'pattern-my-go-place-v1',kind:'place',label:{en:'I go to [place]',mr:'मी [ठिकाणी] जातो / जाते'},verb:'သွားတယ်',dev:'थ्वादै',en:'I go ',mr:{masculine:'जातो',feminine:'जाते'}},
  ];
  // An exact native + English pair is required. Never infer a slot from a topic
  // name or a substring (e.g. Japanese leek is not a place). These are nouns;
  // pronouns, verbs and endings belong to the lesson frame, not learned progress.
  const words=[
    {key:'apple',kind:'food',native:'ပန်းသီး',english:['apple'],en:'an apple',mr:'सफरचंद',dev:'पान्दी'},
    {key:'rice',kind:'food',native:'ထမင်း',english:['cooked rice','rice'],en:'rice',mr:'भात',dev:'थमिन'},
    {key:'bread',kind:'food',native:'ပေါင်မုန့်',english:['bread'],en:'bread',mr:'ब्रेड',dev:'पाउंमोउन्'},
    {key:'banana',kind:'food',native:'ငှက်ပျောသီး',english:['banana'],en:'a banana',mr:'केळे',dev:'न्ग्येत् प्यॉदी'},
    {key:'water',kind:'drink',native:'ရေ',english:['water'],en:'water',mr:'पाणी',dev:'ये'},
    {key:'tea',kind:'drink',native:'လက်ဖက်ရည်',english:['tea'],en:'tea',mr:'चहा',dev:'लफेये'},
    {key:'coffee',kind:'drink',native:'ကော်ဖီ',english:['coffee'],en:'coffee',mr:'कॉफी',dev:'कॉफी'},
    {key:'soft-drink',kind:'drink',native:'အချိုရည်',english:['soft drink'],en:'a soft drink',mr:'शीतपेय',dev:'अछोये'},
    // No matching place nouns were present in the 2026-11-24 KG snapshot. Keep
    // this pattern unavailable until a matching dictionary word is actually learned.
    {key:'school',kind:'place',native:'ကျောင်း',english:['school'],en:'to school',mr:'शाळेत',dev:'चाउं'},
    {key:'home',kind:'place',native:'အိမ်',english:['home','house'],en:'home',mr:'घरी',dev:'एइन'},
    {key:'market',kind:'place',native:'ဈေး',english:['market'],en:'to the market',mr:'बाजारात',dev:'झे'},
    {key:'park',kind:'place',native:'ပန်းခြံ',english:['park'],en:'to the park',mr:'उद्यानात',dev:'पान्जान'},
  ];
  const speakers={masculine:{native:'ကျွန်တော်',dev:'चनो'},feminine:{native:'ကျွန်မ',dev:'चमा'}};
  const pattern=id=>patterns.find(p=>p.id===id);
  function choices(learned,id){
    const p=pattern(id);
    if(!p)return [];
    return words.filter(w=>w.kind===p.kind).flatMap(w=>{
      const source=learned.find(row=>row.language==='my'&&normalize(row.id)&&normalize(row.native)===w.native&&w.english.includes(english(row.english)));
      return source?[{...w,sourceId:source.id}]:[];
    });
  }
  function compose(p,w,speaker){
    const s=speakers[speaker],place=p.kind==='place';
    return {patternId:p.id,language:'my',lesson:'verb_final',word:w.native,
      t:`${s.native} ${w.native}${place?'ကို':''} ${p.verb}။`,
      // Approximate stored reading; no converter download is needed for this bank.
      dev:`${s.dev} ${w.dev}${place?' गो':''} ${p.dev}।`,h:[p.verb],
      meanings:{en:p.en+w.en+'.',mr:`मी ${w.mr} ${p.mr[speaker]}.`}};
  }
  function build(id,key,speaker,learned){
    const p=pattern(id),w=choices(learned,id).find(row=>row.key===key);
    if(!p||!w||!Object.hasOwn(speakers,speaker))throw new Error('Choose a compatible learned word and speaker form.');
    return compose(p,w,speaker);
  }
  // Versioned activity IDs reuse the existing notebook format. Never relabel a
  // learner's own writing, overwrite originals, or invent a reading for edits.
  function savedReading(entry){
    const p=pattern(entry.activityId);
    if(!p)return '';
    for(const w of words.filter(w=>w.kind===p.kind))for(const speaker of Object.keys(speakers)){
      const result=compose(p,w,speaker);
      if(result.t===entry.original)return result.dev;
    }
    return '';
  }
  async function pages(makeQuery){
    const rows=[];
    for(let start=0;start<100000;start+=500){
      const {data,error,status:responseStatus}=await makeQuery().range(start,start+499);
      if(error||!Array.isArray(data))throw Object.assign(new Error('Could not read your KG Chart progress. Try again when connected.'),{code:error?.code,status:error?.status||responseStatus});
      rows.push(...data);
      if(data.length<500)return rows;
    }
    throw new Error('Your KG Chart progress could not be loaded completely. Please retry.');
  }
  async function load(client,userId,permissions){
    if(!client||!normalize(userId))throw new Error('Sign in with your KG Chart account.');
    const access=await client.rpc('kg_chart_is_allowed');
    if(access.error)throw Object.assign(new Error('Could not check KG Chart account access. Please retry.'),{code:access.error.code,status:access.error.status||access.status});
    if(access.data!==true)throw Object.assign(new Error('This account does not have KG Chart access.'),{code:'ACCESS_DENIED'});
    const completed=await pages(()=>client.from('kg_chart_topic_completions')
      .select('user_id,language_code,topic_id').eq('user_id',userId).eq('language_code','my').order('topic_id'));
    const topics=[...new Set(completed.filter(r=>r.user_id===userId&&r.language_code==='my'&&r.topic_id).map(r=>r.topic_id))];
    const learned=new Set();
    for(let i=0;i<topics.length;i+=300){
      const batch=topics.slice(i,i+300),rows=await pages(()=>client.from('kg_chart_vocabulary')
        .select('id,topic_id').in('topic_id',batch).order('id'));
      rows.filter(r=>r.id&&batch.includes(r.topic_id)).forEach(r=>learned.add(r.id));
    }
    const sessions=await pages(()=>client.from('kg_chart_quiz_sessions').select('id,user_id,language_code')
      .eq('user_id',userId).eq('language_code','my').order('id'));
    const ids=[...new Set(sessions.filter(r=>r.user_id===userId&&r.language_code==='my'&&r.id).map(r=>r.id))];
    const correct=new Map(),seen=new Set();
    for(let i=0;i<ids.length;i+=300){
      const batch=ids.slice(i,i+300),answers=await pages(()=>client.from('kg_chart_quiz_answers')
        .select('id,session_id,vocabulary_id,is_correct').in('session_id',batch).eq('is_correct',true)
        .not('vocabulary_id','is',null).order('id'));
      for(const a of answers){
        if(!a.id||seen.has(a.id)||!batch.includes(a.session_id)||a.is_correct!==true||!a.vocabulary_id)continue;
        seen.add(a.id);correct.set(a.vocabulary_id,(correct.get(a.vocabulary_id)||0)+1);
      }
    }
    for(const [id,count] of correct)if(count>=2)learned.add(id);
    const list=[...learned].sort(),out=[];
    for(let i=0;i<list.length;i+=300){
      const batch=list.slice(i,i+300),rows=await pages(()=>client.from('kg_chart_vocabulary_translations')
        .select('vocabulary_id,language_code,native_text,vocabulary:kg_chart_vocabulary(english_text,topic_id)')
        .eq('language_code','my').in('vocabulary_id',batch).order('vocabulary_id'));
      for(const r of rows){
        if(r.language_code==='my'&&batch.includes(r.vocabulary_id)&&normalize(r.native_text)&&(!permissions||permissions.allows(r.vocabulary?.topic_id)))
          out.push({id:r.vocabulary_id,language:'my',native:normalize(r.native_text),english:normalize(r.vocabulary?.english_text)});
      }
    }
    return out;
  }
  root.CatalystPatterns={patterns,words,speakers,pattern,choices,build,savedReading,load};
})(typeof window==='undefined'?globalThis:window);
