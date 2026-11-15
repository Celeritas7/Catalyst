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
    for(const w of [...words].sort((a,b)=>b.text.length-a.text.length||a.id-b.id)){
      let at=t.indexOf(w.text),hit=false;
      while(at>=0){const end=at+w.text.length;
        if(!spans.some(([s,e])=>at<e&&end>s)){spans.push([at,end]);hit=true;}
        at=t.indexOf(w.text,at+1);
      }
      if(hit)found.push(w);
    }
    return found;
  }
  async function pages(client,table,columns,uid){
    const rows=[];
    for(let offset=0;offset<100000;offset+=500){
      let q=client.from(table).select(columns).order('id',{ascending:true}).range(offset,offset+499);
      if(uid)q=q.eq('user_id',uid).eq('word_type','word');
      const {data,error}=await q;
      if(error)throw new Error('Vocabulary connection unavailable. Please retry.');
      rows.push(...(data||[]));
      if(!data||data.length<500)return rows;
    }
    throw new Error('Vocabulary is too large to load completely. No partial ratings shown.');
  }
  async function load(client,uid){
    if(!uid)throw new Error('Sign in to read your word progress.');
    const [words,states]=await Promise.all([
      pages(client,'burmese_app_words','id,burmese_word,english_meaning'),
      pages(client,'burmese_app_user_state','id,user_id,word_id,word_type,mastery_level,last_practiced_at',uid)
    ]);
    return join(words,states,uid);
  }
  root.CatalystVocabulary={normalize,status,join,matches,load};
})(typeof window==='undefined'?globalThis:window);
