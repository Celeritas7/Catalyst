const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {MessageChannel}=require('node:worker_threads');
const {mount}=require('./app-fixture.cjs'),{fixture}=require('./offline-fixture.cjs');
const media=require('../js/catalyst-media-core.js');
async function appFixture({missing=false,staleStatus=false}={}){
  const f=await fixture(),bytes=fs.readFileSync(__dirname+'/fixtures/audio-tone.mp3'),hash=media.hash('ကျွန်တော် ပန်းသီး စားတယ်။'),textSha256=await media.digest(new TextEncoder().encode('ကျွန်တော် ပန်းသီး စားတယ်။'));
  const raw={version:2,lang:'my',m:[],f:[hash],voices:{f:'Synthetic voice',m:'Other voice'},files:[{voice:'f',hash,textSha256,sha256:await media.digest(bytes),bytes:bytes.length,mime:'audio/mpeg'}]};
  let notify=()=>{},manager=media.manager({base:'https://catalyst.test/',catalog:{my:{[hash]:textSha256}},caches:f.caches,db:f.db,notify:value=>notify(value),fetch:async url=>String(url).endsWith('.json')?new Response(JSON.stringify(missing?{code:'NoSuchKey'}:raw),{status:missing?400:200,headers:{'Content-Type':'application/json'}}):new Response(bytes,{headers:{'Content-Type':'audio/mpeg'}})});
  const app=await mount({setup(w){
    w.MessageChannel=MessageChannel;const listeners=[];let checked,firstStatus=true;const checkFinished=new Promise(resolve=>{checked=resolve;});
    const controller={scriptURL:'https://catalyst.test/sw.js',async postMessage(message,ports){
      const reply=value=>ports[0].postMessage(value);try{
        const {language:l,voice:v,type}=message;
        if(type==='AUDIO_STATUS'){const value=await manager.status(l,v);if(staleStatus&&firstStatus){firstStatus=false;await checkFinished;}reply({ok:true,value});}
        if(type==='AUDIO_CHECK'){reply({ok:true,value:await manager.inspect(l,v)});checked();}
        if(type==='AUDIO_DOWNLOAD'){reply({ok:true});await manager.download(l,v);}
        if(type==='AUDIO_PAUSE'){manager.pause(l,v);reply({ok:true});}
        if(type==='AUDIO_REMOVE'){await manager.remove(l,v);reply({ok:true});}
      }catch(error){reply({ok:false,error:error.message});}
    }};
    Object.defineProperty(w.navigator,'serviceWorker',{value:{controller,addEventListener:(type,fn)=>{if(type==='message')listeners.push(fn);}}});
    notify=value=>listeners.forEach(fn=>fn({source:controller,data:{catalystOffline:1,type:'AUDIO_PROGRESS',value}}));
    const state={supported:true,active:{audioProtocol:1,activeHealthy:true,activeBuild:'test',workerBuild:'test'},appBuild:'test',controlled:true};w.CatalystOffline={init(){},open(){},ready:()=>true,subscribe:()=>()=>{},getSnapshot:()=>state};
  }});return {app,manager};
}
test('compiled audio panel shows missing recordings honestly and keeps text readiness',async()=>{
  const {app}=await appFixture({missing:true});try{
    app.click('Ready offline');await app.wait(()=>app.has('Recorded lesson audio'));app.click('Check available recordings');await app.wait(()=>app.has('No recorded lesson audio has been published'));assert.ok(app.has('App and text ready offline'));assert.ok(app.has('Recorded audio not downloaded'));assert.equal(app.buttons('Download audio').length,0);assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
test('compiled audio panel downloads a verified pack, reports size and voice, and previews selective removal',async()=>{
  const {app,manager}=await appFixture({staleStatus:true});try{
    app.click('Ready offline');await app.wait(()=>app.has('Recorded lesson audio'));app.click('Check available recordings');await app.wait(()=>app.buttons('Download audio').length===1&&app.button('Download audio').disabled===false);app.click('Download audio');await app.wait(()=>app.has('Saved recordings ready offline'));assert.ok(app.has('Synthetic voice'));assert.ok(app.has('1/1 files'));
    app.click('Remove this voice’s audio');await app.wait(()=>app.has('Remove downloaded Burmese female recordings'));app.click('Keep audio');await app.wait(()=>!app.buttons('Keep audio').length);assert.equal((await manager.status('my','f')).activeHealthy,true);
    app.click('Remove this voice’s audio');await app.wait(()=>app.buttons('Remove selected audio').length===1);app.click('Remove selected audio');await app.wait(()=>app.has('Recorded audio not downloaded'));assert.equal((await manager.status('my','f')).activeHealthy,false);assert.ok(app.has('App and text ready offline'));assert.deepEqual(app.errors,[]);
  }finally{app.dom.window.close();}
});
