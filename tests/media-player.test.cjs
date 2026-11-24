const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('saved recordings play synchronously from the user gesture; slow reuses the same URL and late failures cannot stop newer playback',async()=>{
  const calls=[],instances=[];let saved=true;
  const ctx={window:{CatalystMedia:{refresh(){},lookup:()=>saved?{url:'https://test/Catalyst/__catalyst_audio__/my/f/clip/test.mp3'}:null}},navigator:{onLine:false},TextEncoder,localStorage:{getItem:()=>null,setItem(){}},Audio:class{constructor(){instances.push(this);}addEventListener(){}pause(){}play(){calls.push({src:this.src,rate:this.playbackRate});return new Promise((resolve,reject)=>{this.reject=reject;});}},fetch:async()=>({ok:false}),setTimeout,clearTimeout,console};
  vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/catalyst-audio.js','utf8'),ctx);const audio=ctx.window.CatalystAudio;
  audio.loadManifest('my');await new Promise(r=>setImmediate(r));assert.equal(audio.source('text','my'),'saved');audio.play('text','my');assert.equal(calls.length,1);assert.equal(calls[0].rate,1);const reject=instances[0].reject;
  audio.play('text','my',{slow:true});assert.equal(calls.length,2);assert.equal(calls[1].src,calls[0].src);assert.equal(calls[1].rate,0.7);reject({name:'NotAllowedError'});await new Promise(r=>setImmediate(r));assert.equal(audio.stateOf('text','my',true),'loading');
  audio.setPrefs({voice:'m'});assert.equal(audio.stateOf('text','my',true),null);saved=false;assert.equal(audio.source('text','my'),null);
});
