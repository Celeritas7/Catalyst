// Mounted real React app in JSDOM with synthetic accounts and intercepted fetch.
// These are interaction checks, not a browser/device layout test.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const babel=require('@babel/standalone');
const root=path.resolve(__dirname,'..');
function initializeFixture(){

      localStorage.setItem('catalyst_settings',JSON.stringify({targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',showEnglish:false,comparisonLanguages:[]}));
      const legacy={id:'legacy',user_id:'u1',concept_id:'want_tai',flagged:false,sentences:{en:'Old English meaning',my:{t:'ရေ သောက်ချင်တယ်။',h:['ချင်'],words:['ရေ','သောက်']},ja:{t:'水が飲みたい。',r:'みず が のみたい',h:['たい']},mr:{t:'जुना अर्थ'}}};
      window.__qa={user:'u1',rows:[legacy],flagError:false,readError:false,postMode:'success',capability:'new',requests:[]};
      let listener;
      const session=()=>window.__qa.user?{user:{id:window.__qa.user,email:'test@example.invalid'},access_token:'FAKE_TEST_TOKEN'}:null;
      window.__changeUser=user=>{window.__qa.user=user;listener?.('SIGNED_IN',session());};
      window.__mockDb={
        auth:{getSession:async()=>({data:{session:session()}}),onAuthStateChange:fn=>{listener=fn;return {data:{subscription:{unsubscribe(){}}}};},signOut:async()=>window.__changeUser(null)},
        from(table){
          const filters=[];let update;
          const result=()=>{
            if(table!=='catalyst_generated')return {data:[],error:null};
            if(window.__qa.readError&&!update)return {data:null,error:{message:'test read failed'}};
            let rows=window.__qa.rows.filter(row=>filters.every(([col,v])=>row[col]===v));
            if(update){if(window.__qa.flagError)return {data:null,error:{message:'test flag failed'}};rows.forEach(row=>Object.assign(row,update));}
            return {data:structuredClone(rows),error:null};
          };
          const q={select(){return q;},eq(col,v){filters.push([col,v]);return q;},not(){return q;},order(){return q;},range(){return q;},limit(){return q;},update(v){update=v;return q;},then(ok,bad){return Promise.resolve(result()).then(ok,bad);}};return q;
        },
      };
}
test('mounted generation UI: meanings, recovery, compatibility and account/language switches',async(t)=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>',{url:'https://catalyst.test/#want-tai',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
  const w=dom.window;w.scrollTo=()=>{};w.structuredClone=structuredClone;w.HTMLMediaElement.prototype.pause=()=>{}; // audio playback is outside JSDOM scope
  const wait=async(predicate)=>{for(let i=0;i<200;i++){if(predicate())return;await new Promise(resolve=>setTimeout(resolve,10));}throw new Error('UI condition timed out: '+w.document.body.textContent.slice(-1500));};
  const buttons=label=>[...w.document.querySelectorAll('button')].filter(el=>el.textContent===label);
  const button=label=>{const matches=buttons(label);assert.equal(matches.length,1,'unique button: '+label);return matches[0];};
  const has=text=>w.document.body.textContent.includes(text);
  const click=label=>button(label).click();
  let release;
  try{
    w.eval('('+initializeFixture.toString()+')()');
    w.supabase={createClient:()=>w.__mockDb};
    w.fetch=async(url,options={})=>{
      if(!String(url).includes('/functions/v1/catalyst-sentence'))return new Response('{}',{status:404});
      if(options.method!=='POST')return new Response(JSON.stringify(w.__qa.capability==='new'?{ok:true,configured:true,api_version:2,targets:['ja','my','zh','mr']}:{ok:true,configured:true}));
      const body=JSON.parse(options.body),owner=w.__qa.user,mode=w.__qa.postMode;w.__qa.requests.push(body);
      if(mode==='pending')await new Promise(resolve=>{release=resolve;}); // deliberately ignore abort: exercise stale-result protection
      if(mode==='failure')return new Response(JSON.stringify({ok:false,message:'A sentence was generated, but saving could not be confirmed.'}),{status:503});
      const target=body.target_language,row={id:'generated-'+w.__qa.requests.length,user_id:owner,concept_id:body.concept_id,flagged:false,target_language:target,meaning_language:body.meaning_language,
        sentences:{en:'Fresh English meaning',meanings:{en:'Fresh English meaning',mr:'नवीन मराठी अर्थ'},[target]:target==='my'?{t:'စာအုပ် ဖတ်ချင်တယ်။',h:['ချင်'],words:['စာအုပ်','ဖတ်']}:{t:'本が読みたい。',r:'ほん が よみたい',h:['たい'],words:['本','読む']}}};
      w.__qa.rows.unshift(row);return new Response(JSON.stringify({ok:true,row,known:{[target]:10},used:1,limit:30}));
    };
    for(const pkg of ['react','react-dom'])w.eval(fs.readFileSync(path.join(path.dirname(require.resolve(pkg+'/package.json')),'umd',pkg+'.production.min.js'),'utf8'));
    for(const match of html.matchAll(/<script src="\.\/(js\/[^"]+)"/g))w.eval(fs.readFileSync(path.join(root,match[1]),'utf8'));
    const jsx=html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/)[1];
    w.eval(babel.transform(jsx,{presets:['react'],filename:'app.jsx'}).code);
    await wait(()=>buttons('✨ Your words').length===1);
    w.document.querySelector('[aria-label="Settings"]').click();await wait(()=>has('Signed in as'));
    w.document.querySelector('[aria-label="Close settings"]').click();await wait(()=>!w.document.querySelector('[aria-label="Close settings"]'));
    click('✨ Your words');
    await t.test('legacy Marathi renders; selected target and meaning are sent',async()=>{
      await wait(()=>has('जुना अर्थ')&&buttons('✨ New Burmese sentence').length&&!button('✨ New Burmese sentence').disabled);
      assert.ok(!has('Old English meaning'));click('✨ New Burmese sentence');await wait(()=>has('नवीन मराठी अर्थ'));
      assert.deepEqual(JSON.parse(JSON.stringify(w.__qa.requests[0])),{concept_id:'want_tai',target_language:'my',meaning_language:'mr'});
      assert.ok(!has('Fresh English meaning'));
    });
    await t.test('failed flag retains the example; confirmed flag hides it',async()=>{
      w.__qa.flagError=true;buttons('🚩 Wrong')[0].click();await wait(()=>has('Could not save the flag.'));
      assert.ok(has('नवीन मराठी अर्थ'));w.__qa.flagError=false;buttons('🚩 Wrong')[0].click();
      await wait(()=>has('Sentence hidden and kept for review.'));assert.ok(!has('नवीन मराठी अर्थ'));
    });
    await t.test('failed generation save keeps earlier sentences',async()=>{
      w.__qa.postMode='failure';click('✨ New Burmese sentence');await wait(()=>has('saving could not be confirmed'));
      assert.ok(has('जुना अर्थ'));
    });
    await t.test('old service is disabled while legacy saved sentences remain readable',async()=>{
      w.__qa.capability='old';click('Reload saved sentences');await wait(()=>has('Sentence generation is not available yet.'));
      assert.ok(button('✨ New Burmese sentence').disabled);assert.ok(has('जुना अर्थ'));
    });
    await t.test('late model response cannot enter a different account view',async()=>{
      w.__qa.capability='new';w.__qa.postMode='pending';click('Reload saved sentences');
      await wait(()=>!button('✨ New Burmese sentence').disabled);const make=button('✨ New Burmese sentence');make.click();make.click();await wait(()=>w.__qa.requests.length===3);
      // Both synchronous clicks above must reserve only one UI request.
      assert.equal(w.__qa.requests.length,3);
      w.__changeUser('u2');await wait(()=>!buttons('Reload saved sentences').length);click('✨ Your words');await wait(()=>has('No saved examples loaded for this lesson and learning language.'));
      release();await wait(()=>w.__qa.rows.length===3);await new Promise(resolve=>setTimeout(resolve,20));
      assert.ok(!has('नवीन मराठी अर्थ'));assert.ok(!has('जुना अर्थ'));
    });
    await t.test('changing target and meaning uses fresh state and preserves legacy examples',async()=>{
      w.__qa.postMode='success';w.__changeUser('u1');await wait(()=>!buttons('Reload saved sentences').length);click('✨ Your words');await wait(()=>has('जुना अर्थ'));
      w.document.querySelector('[aria-label="Settings"]').click();await wait(()=>w.document.querySelector('[aria-label="Close settings"]'));
      const select=label=>[...w.document.querySelectorAll('label')].find(el=>el.textContent.startsWith(label)).querySelector('select');
      select('I’m learning').value='ja';select('I’m learning').dispatchEvent(new w.Event('change',{bubbles:true}));
      await wait(()=>has('Learning Japanese'));
      select('Meaning language').value='en';select('Meaning language').dispatchEvent(new w.Event('change',{bubbles:true}));
      await wait(()=>has('Meanings: English'));w.document.querySelector('[aria-label="Close settings"]').click();
      click('✨ Your words');await wait(()=>buttons('✨ New Japanese sentence').length&&!button('✨ New Japanese sentence').disabled);
      assert.ok(has('Old English meaning'));click('✨ New Japanese sentence');await wait(()=>has('Fresh English meaning'));
      assert.deepEqual(JSON.parse(JSON.stringify(w.__qa.requests.at(-1))),{concept_id:'want_tai',target_language:'ja',meaning_language:'en'});
      assert.ok(!has('စာအုပ် ဖတ်ချင်တယ်။'));
    });
    await t.test('sign out clears the private sentence view',async()=>{
      w.__changeUser(null);await wait(()=>!buttons('Reload saved sentences').length);click('✨ Your words');await wait(()=>buttons('Sign in').length===1);assert.ok(!has('Fresh English meaning'));assert.ok(!has('Old English meaning'));
    });
    assert.deepEqual(errors,[]);
  }finally{w.close();}
});
