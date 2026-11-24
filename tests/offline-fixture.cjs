const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {IDBFactory}=require('fake-indexeddb');
const core=require('../js/catalyst-offline-core.js');
const base='https://offline.test/Catalyst/';
class CacheStorage {
  constructor(){this.values=new Map();this.fail=false;}
  async open(name){
    if(!this.values.has(name))this.values.set(name,new Map());
    const values=this.values.get(name),address=value=>typeof value==='string'?value:value.url;
    return {match:async url=>values.get(address(url))?.clone(),put:async(url,response)=>{if(this.fail)throw new DOMException('Full','QuotaExceededError');values.set(address(url),response.clone());},delete:async url=>values.delete(address(url)),keys:async()=>[...values.keys()]};
  }
}
async function fixture(id='a'.repeat(20),shared={}){
  const bodies=new Map([
    ['./index.html',['document','text/html','<!doctype html><title>'+id+'</title>']],
    ['./assets/script-'+id+'.js',['script','application/javascript','window.release="'+id+'";']],
    ['./assets/shared.css',['style','text/css','body { color: purple; }']],
  ]);
  const assets=[];
  for(const [url,[kind,mime,body]] of bodies)assets.push({url,kind,bytes:Buffer.byteLength(body),sha256:await core.digest(Buffer.from(body))});
  const release={schemaVersion:1,buildId:id,worker:{protocol:1,buildId:id,url:'./sw.js'},assets,totalBytes:assets.reduce((n,f)=>n+f.bytes,0)};
  const requests=[],notifications=[];
  const caches=shared.caches||new CacheStorage(),indexedDB=shared.indexedDB||new IDBFactory(),db=shared.db||core.database(indexedDB);
  const network=async(url,options)=>{
    requests.push({url:String(url),options});const data=bodies.get('./'+new URL(typeof url==='string'?url:url.url).pathname.slice('/Catalyst/'.length));
    return data?new Response(data[2],{headers:{'Content-Type':data[1]}}):new Response('missing',{status:404});
  };
  const options={base,release,caches,indexedDB,db,fetch:network,notify:value=>notifications.push(value)};
  return {release,requests,notifications,caches,indexedDB,db,network,options,manager:core.manager(options)};
}
function worker(f,{clients=[{id:'one',clean:true},{id:'two',clean:true}],network=f.network}={}){
  const handlers={},messages=[],pending=new Set();let skips=0,claims=0;
  const context={URL,Response,Request,AbortController,DOMException,crypto,console,Date,Uint8Array,TextEncoder,clearTimeout,setTimeout:(fn,ms)=>setTimeout(fn,ms===5000?70:ms),RELEASE:f.release};
  const send=(type,source='one',extra={})=>{
    let reply;const promise=new Promise(resolve=>{reply=resolve;});
    const event={data:{catalystOffline:1,type,...extra},source:{id:source},ports:[{postMessage:reply}],waitUntil(value){pending.add(value);value.finally(()=>pending.delete(value));}};
    handlers.message(event);return {reply:promise,done:Promise.all([...pending])};
  };
  const list=clients.map(value=>({...value,url:base,postMessage(message){
    messages.push({id:this.id,...message});
    if(message.type==='PREPARE_UPDATE'&&this.clean!==undefined)queueMicrotask(()=>send('UPDATE_VOTE',this.id,{nonce:message.nonce,clean:this.clean}));
  }}));
  Object.assign(context,{location:{href:base+'sw.js'},indexedDB:f.indexedDB,caches:f.caches,fetch:network,clients:{matchAll:async()=>list,claim:async()=>{claims++;}},skipWaiting:async()=>{skips++;},addEventListener:(type,fn)=>{handlers[type]=fn;}});
  context.self=context;vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(__dirname,'../js/catalyst-offline-core.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../js/catalyst-media-core.js'),'utf8')+'\n'+fs.readFileSync(path.join(__dirname,'../src/sw.js'),'utf8'),context);
  return {send,messages,clients:list,get skips(){return skips;},get claims(){return claims;},
    async lifecycle(type){let value;handlers[type]({waitUntil:p=>value=p});await value;},
    async fetch(request){let value;handlers.fetch({request,respondWith:p=>value=p});return value===undefined?undefined:await value;},
  };
}
module.exports={base,core,CacheStorage,fixture,worker};
