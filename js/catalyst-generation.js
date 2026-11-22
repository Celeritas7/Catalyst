/* Selected-target generated examples; old multilingual JSON stays readable. */
(function(root) {
  const targets=['ja','my','zh','mr'], meanings=['en','mr'];
  function request(concept,target,meaning) {
    if(!targets.includes(target)||!meanings.includes(meaning))throw new Error('Unsupported generation language.');
    return {concept_id:concept,target_language:target,meaning_language:meaning};
  }
  function visible(row,user,target) {
    return row?.user_id===user&&!row.flagged&&(!row.target_language||row.target_language===target)&&typeof row.sentences?.[target]?.t==='string';
  }
  function meaning(row,language) {
    const sentences=row?.sentences||{};
    // Legacy Marathi was a parallel sentence; do not run AI meanings through the
    // bundled course translation lookup (which only knows fixed course examples).
    return sentences.meanings?.[language] || (language==='en'?sentences.en:language==='mr'?sentences.mr?.t:'') || '';
  }
  async function load(client,user,concept,target) {
    if(!user||!targets.includes(target))return [];
    const {data,error}=await client.from('catalyst_generated').select('*').eq('user_id',user)
      .eq('concept_id',concept).eq('flagged',false).not('sentences->'+target,'is',null)
      .order('created_at',{ascending:false}).limit(30);
    if(error)throw new Error('Saved AI sentences could not be loaded. Please retry.');
    return (data||[]).filter(row=>visible(row,user,target));
  }
  function compatible(info,target) {
    return info?.ok===true&&info.api_version===2&&info.configured===true&&Array.isArray(info.targets)&&info.targets.includes(target);
  }
  root.CatalystGeneration={targets,request,visible,meaning,load,compatible};
})(typeof window==='undefined'?globalThis:window);
