// Mount the checked-in compiled release. No real account or network requests.
const fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..');
function initialize(){
  window.__qa={user:'u1',rows:[{id:'legacy',user_id:'u1',concept_id:'verb_final',flagged:false,sentences:{en:'Old English meaning',my:{t:'ကျွန်တော် ပန်းသီး စားတယ်။'},ja:{t:'りんごを食べます。',r:'りんご お たべます'},mr:{t:'जुना अर्थ'}}}],flagError:false,readError:false,progressError:false,allowed:true,requests:[]};
  const datasets={
    kg_chart_topic_completions:[{user_id:'u1',language_code:'my',topic_id:'food'},{user_id:'u1',language_code:'my',topic_id:'drink'}],
    kg_chart_vocabulary:[{id:'apple',topic_id:'food'},{id:'rice',topic_id:'food'},{id:'water',topic_id:'drink'}],
    kg_chart_vocabulary_translations:[{vocabulary_id:'apple',language_code:'my',native_text:'ပန်းသီး',vocabulary:{english_text:'Apple',topic_id:'food'}},{vocabulary_id:'rice',language_code:'my',native_text:'ထမင်း',vocabulary:{english_text:'cooked rice',topic_id:'food'}},{vocabulary_id:'water',language_code:'my',native_text:'ရေ',vocabulary:{english_text:'Water',topic_id:'drink'}}],
  };
  let listener;
  const session=()=>window.__qa.user?{user:{id:window.__qa.user,email:'test@example.invalid'},access_token:'FAKE_TEST_TOKEN'}:null;
  const persist=()=>{const key='sb-ulgrfumbwjovbjzjiems-auth-token';if(session())localStorage.setItem(key,JSON.stringify(session()));else localStorage.removeItem(key);};persist();
  window.__changeUser=user=>{window.__qa.user=user;persist();listener?.(user?'SIGNED_IN':'SIGNED_OUT',session());};
  window.__mockDb={
    auth:{getUser:async()=>({data:{user:session()?.user}}),getSession:async()=>({data:{session:session()}}),onAuthStateChange:fn=>{listener=fn;return {data:{subscription:{unsubscribe(){}}}};},signOut:async()=>window.__changeUser(null)},
    rpc:async(name)=>({data:name==='kg_chart_u3_my_access_snapshot'?{contract:1,mode:'legacy',revision:0,languages:null,topics:null,features:null,server_enforced:false}:name==='kg_chart_my_private_lesson_visibility'?{contract:1,topics:[],groups:[]}:window.__qa.allowed,error:null}),
    from(table){
      const filters=[];let update,start=0,end=Infinity;
      const result=()=>{
        if((table==='catalyst_generated'&&window.__qa.readError&&!update)||(table==='kg_chart_topic_completions'&&window.__qa.progressError))return {data:null,error:{message:'test read failed'}};
        let rows=(table==='catalyst_generated'?window.__qa.rows:datasets[table]||[]).filter(row=>filters.every(f=>f(row))).slice(start,end+1);
        if(update){if(window.__qa.flagError)return {data:null,error:{message:'test flag failed'}};rows.forEach(row=>Object.assign(row,update));}
        return {data:structuredClone(rows),error:null};
      };
      const q={select(){return q;},eq(k,v){filters.push(row=>row[k]===v);return q;},in(k,values){filters.push(row=>values.includes(row[k]));return q;},not(k,op,v){filters.push(row=>k.startsWith('sentences->')?row.sentences?.[k.split('->')[1]]!=null:row[k]!==v);return q;},order(){return q;},range(a,b){start=a;end=b;return q;},limit(n){end=n-1;return q;},update(v){update=v;return q;},then(ok,bad){return Promise.resolve(result()).then(ok,bad);}};return q;
    },
  };
}
async function mount({storage={},setup,offline=false,indexedDB}={}){
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://catalyst.test/#verb-final',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
  const w=dom.window;w.scrollTo=()=>{};w.structuredClone=structuredClone;w.TextEncoder=TextEncoder;w.HTMLMediaElement.prototype.pause=()=>{};
  w.localStorage.setItem('catalyst_settings',JSON.stringify({targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[]}));for(const [k,v] of Object.entries(storage))w.localStorage.setItem(k,v);
  w.eval('('+initialize.toString()+')()');
  w.fetch=async(url,options={})=>{w.__qa.requests.push({url:String(url),method:options.method||'GET'});return new Response('{}',{status:404});};
  const scripts=[...html.matchAll(/<script defer src="\.\/([^"]+)"/g)].map(match=>match[1]);
  if(scripts.length!==2)throw new Error('Expected compiled runtime and app scripts');
  w.eval(fs.readFileSync(path.join(root,scripts[0]),'utf8'));
  w.supabase={createClient:()=>w.__mockDb};
  if(indexedDB)w.indexedDB=indexedDB;
  if(offline)Object.defineProperty(w.navigator,'onLine',{get:()=>false});
  if(setup)setup(w);
  w.eval(fs.readFileSync(path.join(root,scripts[1]),'utf8'));
  const has=text=>w.document.body.textContent.includes(text),buttons=label=>[...w.document.querySelectorAll('button')].filter(el=>el.textContent===label);
  const button=label=>{const found=buttons(label);if(found.length!==1)throw new Error('Expected one button: '+label+', got '+found.length);return found[0];};
  const wait=async(predicate)=>{for(let i=0;i<200;i++){if(predicate())return;await new Promise(resolve=>setTimeout(resolve,10));}throw new Error('UI condition timed out: '+w.document.body.textContent.slice(-2500));};
  const select=(label,value)=>{const el=[...w.document.querySelectorAll('label')].find(el=>el.textContent.startsWith(label))?.querySelector('select');if(!el)throw new Error('No select '+label);el.value=value;el.dispatchEvent(new w.Event('change',{bubbles:true}));};
  const snapshot=()=>Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return [k,w.localStorage.getItem(k)];}));
  await wait(()=>buttons('✨ Your words').length===1);
  w.document.querySelector('[aria-label="Settings"]').click();await wait(()=>has(offline?'Offline study account:':'Signed in as'));
  w.document.querySelector('[aria-label="Close settings"]').click();await wait(()=>!w.document.querySelector('[aria-label="Close settings"]'));
  return {w,dom,errors,has,buttons,button,wait,select,snapshot,click:label=>button(label).click()};
}
module.exports={mount,initialize};
