/* Versioned learning preferences. Legacy fields/history are retained for compatibility. */
(function(root) {
  const registry = {
    ja: {name:'Japanese',native:'日本語',font:'font-japanese',dot:'bg-red-500',dir:'ltr'},
    my: {name:'Burmese',native:'မြန်မာ',font:'font-burmese',dot:'bg-amber-500',dir:'ltr'},
    zh: {name:'Chinese',native:'中文',font:'font-chinese',dot:'bg-rose-700',dir:'ltr'},
    mr: {name:'Marathi',native:'मराठी',font:'font-devanagari',dot:'bg-orange-500',dir:'ltr'},
    en: {name:'English',native:'English',font:'font-body',dot:'bg-slate-500',dir:'ltr'}
  };
  const codes=Object.keys(registry), meaningLanguages=['mr','en'], interfaceLanguages=['en'];
  function normalize(value) {
    const v=value && typeof value==='object' && !Array.isArray(value)?value:{};
    const legacy=['ja','my','zh'].filter(l=>v.show?.[l]!==false);
    const targetLanguage=codes.includes(v.targetLanguage)?v.targetLanguage:(legacy[0]||'ja');
    const anchor=[...codes,'none'].includes(v.anchor)?v.anchor:'mr';
    const meaningLanguage=meaningLanguages.includes(v.meaningLanguage)?v.meaningLanguage:(meaningLanguages.includes(anchor)?anchor:'mr');
    const comparisons=Array.isArray(v.comparisonLanguages)?v.comparisonLanguages:(v.show?legacy:[]);
    return {...v,preferencesVersion:2,targetLanguage,anchor,meaningLanguage,
      interfaceLanguage:interfaceLanguages.includes(v.interfaceLanguage)?v.interfaceLanguage:'en',
      comparisonLanguages:[...new Set(comparisons.filter(l=>codes.includes(l)))],
      showEnglish:typeof v.showEnglish==='boolean'?v.showEnglish:false,
      dev:typeof v.dev==='boolean'?v.dev:false,reading:v.reading!==false,view:v.view==='sentence'?'sentence':'lang',
      learned:Array.isArray(v.learned)?v.learned:[]};
  }
  const languages=s=>[...new Set([s.targetLanguage,s.anchor,...s.comparisonLanguages])].filter(l=>codes.includes(l));
  const availableTargets=concepts=>codes.filter(l=>concepts.some(c=>c.entries[l]?.ex?.length));
  root.CatalystPreferences={registry,codes,meaningLanguages,interfaceLanguages,normalize,languages,availableTargets};
})(typeof window==='undefined'?globalThis:window);
