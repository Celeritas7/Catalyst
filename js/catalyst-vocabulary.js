// Read-only adapter. Never imports another account's or unassigned progress.
(function(root){
  const normalize=t=>(t||'').normalize('NFC').trim();
  function status(state){return !state?'unrated':Number(state.mastery_level)>=4?'known':'learning';}
  function join(words,states,uid){
    const own=new Map();
    for(const s of states){
      if(s.user_id!==uid||s.word_type!=='word')continue;
      const old=own.get(s.word_id);
      if(!old||String(s.last_practiced_at||'')>String(old.last_practiced_at||''))own.set(s.word_id,s);
    }
    return words.filter(w=>normalize(w.burmese_word)).map(w=>{
      const s=own.get(w.id);
      return {id:w.id,text:normalize(w.burmese_word),english:w.english_meaning||'',status:status(s),level:s?Math.min(5,Math.max(0,Number(s.mastery_level)||0)):null};
    });
  }
  // Exact dictionary substrings, longest first; this is not Burmese tokenisation.
  function matches(text,words){
    const t=normalize(text),spans=[],found=[];
    for(const w of [...words].sort((a,b)=>b.text.length-a.text.length||String(a.id).localeCompare(String(b.id)))){
      let at=t.indexOf(w.text),hit=false;
      while(at>=0){const end=at+w.text.length;
        if(!spans.some(([s,e])=>at<e&&end>s)){spans.push([at,end]);hit=true;}
        at=t.indexOf(w.text,at+1);
      }
      if(hit)found.push(w);
    }
    return found;
  }
  const labels={0:'Not rated',1:'Monthly Review',2:"Can’t converse",3:"Can’t write",4:"Understand but can’t use",5:"Don’t know"};
  const providers={
    burmese:{name:'Burmese Study · practice levels',languages:['my'],note:'Regular Study currently saves legacy progress without an account identity. Those records cannot be attributed to you automatically. Song reviews are a separate source and are not included.'},
    japanese:{name:'Japanese Study · word markings',languages:['ja'],note:'Original marking categories, including custom labels. Markings are keyed by written word in the Japanese app; words sharing that spelling share the marking.'},
    kg:{name:'KG Chart · word ratings',languages:['ja','my','zh','mr','ms','ko','kn','fil','si','ta','te','th'],note:'Original KG Chart word ratings for this language. Quiz scores and completed topics are separate and are not converted into ratings.'}
  };
  const sources=language=>Object.entries(providers).filter(([,p])=>p.languages.includes(language)).map(([id,p])=>({id,...p}));
  async function pages(client,table,columns,filters={},order='id'){
    const rows=[];
    for(let offset=0;offset<100000;offset+=500){
      let q=client.from(table).select(columns).order(order,{ascending:true}).range(offset,offset+499);
      for(const [k,v] of Object.entries(filters))q=q.eq(k,v);
      const {data,error,status:responseStatus}=await q;
      if(error)throw Object.assign(new Error('Vocabulary connection unavailable. Please retry.'),{code:error.code,status:error.status||responseStatus});
      if(!Array.isArray(data))throw new Error('Vocabulary response was incomplete. Previous snapshot retained.');
      rows.push(...(data||[]));
      if(!data||data.length<500)return rows;
    }
    throw new Error('Vocabulary is too large to load completely. No partial ratings shown.');
  }
  function rated(words,ratings,uid,language,source,custom={}){
    const mine=new Map(ratings.filter(r=>r.user_id===uid&&(source!=='kg'||r.language_code===language)).map(r=>[source==='kg'?r.vocabulary_id:r.kanji,r]));
    return words.filter(w=>source!=='kg'||w.language_code===language).map(w=>{
      const id=source==='kg'?w.vocabulary_id:w.id, text=normalize(source==='kg'?w.native_text:w.kanji||w.hiragana);
      const r=mine.get(source==='kg'?id:w.kanji||w.hiragana), value=r?(source==='kg'?r.rating:r.marking):0;
      return {id:source+':'+language+':'+id,text,english:w.meaning_en||'',status:value?'rated':'unrated',rating:value,label:custom[value]||labels[value]||'Unrecognised rating',source,language};
    }).filter(w=>w.text);
  }
  async function loadSource(client,uid,language,source,access){
    if(!uid)throw new Error('Sign in to read your word progress.');
    if(!providers[source]?.languages.includes(language))throw new Error('Source unavailable for this language.');
    let words;
    if(source==='burmese'){
      const [dictionary,states]=await Promise.all([
        pages(client,'burmese_app_words','id,burmese_word,english_meaning'),
        pages(client,'burmese_app_user_state','id,user_id,word_id,word_type,mastery_level,last_practiced_at',{user_id:uid,word_type:'word'})
      ]);
      words=join(dictionary,states,uid).map(w=>({...w,label:w.level===null?'No account-linked rating':`Practice level ${w.level}/5`,source,language}));
    }else if(source==='kg'){
      const [dictionary,ratings]=await Promise.all([
        pages(client,'kg_chart_vocabulary_translations','vocabulary_id,language_code,native_text'+(access?',vocabulary:kg_chart_vocabulary(topic_id)':''),{language_code:language},'vocabulary_id'),
        pages(client,'kg_chart_user_ratings','id,user_id,vocabulary_id,language_code,rating',{user_id:uid,language_code:language})
      ]);words=rated(access?dictionary.filter(w=>access.allows(w.vocabulary?.topic_id)):dictionary,ratings,uid,language,source);
    }else{
      const [dictionary,ratings,categories]=await Promise.all([
        pages(client,'japanese_unified_words','id,kanji,hiragana,meaning_en'),
        pages(client,'japanese_user_markings','id,user_id,kanji,marking',{user_id:uid}),
        pages(client,'japanese_marking_categories','category_id,label',{user_id:uid},'category_id').then(data=>({data})).catch(error=>({error}))
      ]);
      // The source app permits this optional table to be absent; other failures must remain errors.
      if(categories.error&&!['PGRST205','42P01'].includes(categories.error.code))throw Object.assign(new Error('Category labels unavailable.'),{code:categories.error.code,status:categories.error.status});
      if(!categories.error&&!Array.isArray(categories.data))throw new Error('Category labels were incomplete.');
      words=rated(dictionary,ratings,uid,language,source,Object.fromEntries((categories.data||[]).map(c=>[c.category_id,c.label])));
    }
    return {words,linked:words.filter(w=>w.status!=='unrated').length,source,language};
  }
  async function load(client,uid){return (await loadSource(client,uid,'my','burmese')).words;}
  root.CatalystVocabulary={normalize,status,join,matches,load,loadSource,rated,providers,sources,labels};
})(typeof window==='undefined'?globalThis:window);
