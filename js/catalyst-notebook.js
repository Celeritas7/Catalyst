(function(root){
  'use strict';
  function key(scope,language){
    if(!scope||scope==='loading'||!language)throw new Error('Account not ready');
    return 'catalyst_notebook_v1:'+encodeURIComponent(scope)+':'+encodeURIComponent(language);
  }
  function parse(raw){
    if(raw===null)return {version:1,entries:[]};
    const data=JSON.parse(raw);
    if(data?.version!==1||!Array.isArray(data.entries)||data.entries.some(e=>!e||typeof e.id!=='string'||typeof e.original!=='string'||!Array.isArray(e.corrections)||e.corrections.some(c=>!c||typeof c.text!=='string')))throw new Error('Unreadable notebook');
    return data;
  }
  function add(data,{id,original,lesson='',meaning='',meaningLanguage='en',createdAt}){
    if(!original.trim()||original.length>5000||meaning.length>5000||data.entries.some(e=>e.id===id))throw new Error('Invalid entry');
    return {...data,entries:[{id,original,lesson,meaning,meaningLanguage,createdAt,corrections:[]},...data.entries]};
  }
  function correct(data,id,text,createdAt){
    if(!text.trim()||text.length>5000||!data.entries.some(e=>e.id===id))throw new Error('Invalid correction');
    return {...data,entries:data.entries.map(e=>e.id===id?{...e,corrections:[...e.corrections,{text,createdAt,source:'user-entered'}]}:e)};
  }
  root.CatalystNotebook={key,parse,add,correct};
})(typeof window==='undefined'?globalThis:window);
