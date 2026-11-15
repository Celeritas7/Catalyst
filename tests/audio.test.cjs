const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let cancelled=0,spoken=0,paused=0;
const ctx={window:{},TextEncoder,localStorage:{getItem(){return null},setItem(){}},Audio:class{addEventListener(){}pause(){paused++}play(){return Promise.resolve()}},speechSynthesis:{getVoices(){return [{lang:'ja-JP'}]},cancel(){cancelled++},speak(){spoken++}},SpeechSynthesisUtterance:class{},fetch:async()=>({ok:false}),setTimeout,clearTimeout,console};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('js/catalyst-audio.js','utf8'),ctx);
const audio=ctx.window.CatalystAudio;
(async()=>{
 audio.loadManifest('ja');audio.loadManifest('my');await new Promise(r=>setImmediate(r));
 assert.equal(audio.source('こんにちは','ja'),'tts');assert.equal(audio.source('မင်္ဂလာပါ','my'),null);
 audio.play('こんにちは','ja',{slow:false});assert.equal(spoken,1);assert.equal(audio.stateOf('こんにちは','ja',false),'playing');
 audio.play('こんにちは','ja',{slow:false});assert.equal(spoken,1);assert.equal(audio.stateOf('こんにちは','ja',false),null);
 audio.play('こんにちは','ja',{slow:true});assert.equal(audio.stateOf('こんにちは','ja',true),'playing');
 audio.stop();assert.equal(audio.stateOf('こんにちは','ja',true),null);assert(cancelled>=3);assert(paused>=3);
 console.log('Audio: exact language fallback, unavailable Burmese, same-button stop, slow state and cleanup passed.');
})();
