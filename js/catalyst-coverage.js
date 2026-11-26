// Read-only coverage of the content currently on screen. Counts are not mastery
// scores, linguistic approval, or proof that this device has downloaded the app.
(function(root){
  'use strict';
  const text=value=>typeof value==='string'&&value.trim().length>0;
  function summarize(concepts,language,meaningLanguage,translate,pilots=[]){
    const lessons=concepts.map(concept=>{
      const entry=concept.entries?.[language];
      const examples=(entry?.ex||[]).flatMap((example,index)=>text(example.t)?[{example,index}]:[]);
      const missing=examples.flatMap(({example,index})=>{
        const gloss=example.e||(language==='en'?example.t:'');
        return text(translate(gloss,meaningLanguage))?[]:[index+1];
      });
      return {id:concept.id,title:concept.title,examples:examples.length,
        translated:examples.length-missing.length,missing,
        sourceChecked:entry?.checked===true};
    });
    const available=lessons.filter(lesson=>lesson.examples>0);
    return {language,meaningLanguage,lessons,
      availableLessons:available.length,unavailableLessons:lessons.length-available.length,
      examples:available.reduce((total,lesson)=>total+lesson.examples,0),
      translated:available.reduce((total,lesson)=>total+lesson.translated,0),
      sourceCheckedLessons:available.filter(lesson=>lesson.sourceChecked).length,
      guidedActivities:pilots.filter(pilot=>pilot.language===language).length};
  }
  root.CatalystCoverage={summarize};
})(typeof window==='undefined'?globalThis:window);
