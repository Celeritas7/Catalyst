// Local study ownership is separate from Supabase authentication. No tokens are copied.
(function(root){
  'use strict';
  const KEY='catalyst_offline_owner_v1';
  const denied=e=>[401,403].includes(Number(e?.status))||['42501','PGRST301','PGRST302','bad_jwt','session_not_found','refresh_token_not_found'].includes(e?.code);
  function create({client,storage,authKey,events=root,online=()=>root.navigator?.onLine!==false,now=()=>new Date().toISOString(),timeout=12000}){
    let state={scope:'loading',owner:null,session:null,online:false,prepared:false,message:'',epoch:0},epoch=0,stopped=false,started=false,subscription;
    const listeners=new Set();
    const emit=patch=>{state={...state,...patch,epoch};listeners.forEach(fn=>fn());};
    function saved(){
      const raw=storage.getItem(KEY);if(!raw)return null;
      const value=JSON.parse(raw);
      if(value.version!==1||typeof value.enabled!=='boolean'||typeof value.revision!=='string'||(value.enabled&&(!value.owner||typeof value.owner.id!=='string'||!value.owner.id||typeof value.owner.label!=='string'||!Number.isFinite(Date.parse(value.verifiedAt)))))throw Error('Offline account settings are unreadable. Existing records are preserved.');
      return value;
    }
    // Read only this SDK key, never enumerate other accounts or copy credentials.
    function sdkOwner(){try{const raw=storage.getItem(authKey);return raw?JSON.parse(raw)?.user?.id||'?':null;}catch{return '?';}}
    function marker(){try{return saved();}catch{return {error:'Offline account settings are unreadable. Existing records are preserved.'};}}
    function revoke(){
      const old=marker();
      if(old?.error)return old.error;
      try{storage.setItem(KEY,JSON.stringify({version:1,enabled:false,revision:root.crypto.randomUUID()}));return '';}
      catch{try{storage.removeItem(KEY);return '';}catch{return 'Offline access could not be disabled in storage. Close this app on a shared device and retry sign-out when storage works.';}}
    }
    function local(message=''){
      const stored=marker(),id=sdkOwner(),prepared=stored?.enabled===true&&stored.owner.id===id;
      if(stored?.enabled&&!prepared)revoke();
      emit({scope:prepared?id:id?'loading':'guest',owner:prepared?stored.owner:null,session:null,online:false,prepared,
        message:stored?.error||message||(prepared?'Offline study · sign-in and source refresh pending.':id?'Connect to verify this account before opening its notebook.':'')});
    }
    async function bounded(promise){let timer;try{return await Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Sign-in verification timed out.')),timeout);})]);}finally{clearTimeout(timer);}}
    function valid(ticket){
      if(stopped||ticket.epoch!==epoch||ticket.owner!==state.owner?.id||sdkOwner()!==ticket.owner)return false;
      return state.online||marker()?.enabled===true&&marker()?.owner?.id===ticket.owner;
    }
    async function verify(){
      if(stopped)return false;
      const run=++epoch;
      // Preserve the current notebook while a same-owner network verification runs.
      if(state.owner?.id!==sdkOwner()||!online())local();
      if(!client||!online()){if(!client)local();return false;}
      try{
        const result=await bounded(client.auth.getSession());if(run!==epoch||stopped)return false;
        if(result.error)throw result.error;
        const session=result.data?.session;
        if(!session){local();return false;}
        if(sdkOwner()!==session.user?.id){local();return false;}
        const checked=await bounded(client.auth.getUser(session.access_token));if(run!==epoch||stopped)return false;
        if(checked.error)throw checked.error;
        const user=checked.data?.user;
        if(!user?.id||user.id!==session.user.id||sdkOwner()!==user.id)throw Object.assign(Error('Account changed. Sign in again.'),{status:401});
        const m=marker();if(m?.enabled&&m.owner.id!==user.id)revoke();
        emit({scope:user.id,owner:{id:user.id,label:user.email||user.id},session,online:true,prepared:m?.enabled===true&&m.owner.id===user.id,message:m?.error||''});return true;
      }catch(error){
        if(run!==epoch||stopped)return false;
        if(denied(error)){const message=revoke();emit({scope:'loading',owner:null,session:null,online:false,prepared:false,message:message||'Sign-in is no longer valid. Sign in again to open your account records.'});}
        else local('Could not verify sign-in. '+(marker()?.enabled?'Using the prepared account offline.':'Connect and retry; account records have not been opened as guest.'));
        return false;
      }
    }
    async function prepare(){
      if(!await verify())throw Error('Connect and verify your sign-in before preparing this account.');
      const m=marker();if(m?.error)throw Error(m.error);
      const value={version:1,enabled:true,owner:state.owner,verifiedAt:now(),revision:root.crypto.randomUUID()};
      storage.setItem(KEY,JSON.stringify(value));emit({prepared:true,message:'Account prepared for offline notebooks and reviews.'});return ticket();
    }
    function ticket(){return {owner:state.owner?.id,epoch};}
    async function signOut(){
      ++epoch;const message=revoke();emit({scope:'guest',owner:null,session:null,online:false,prepared:false,message});
      try{const result=await bounded(client.auth.signOut({scope:'local'}));if(result?.error)throw result.error;}
      catch{emit({message:message||'Signed out on this device. Server sign-out could not be confirmed; reconnect to retry.'});}
    }
    function authChanged(event,session){
      if(event==='SIGNED_OUT'){++epoch;const message=revoke();emit({scope:'guest',owner:null,session:null,online:false,prepared:false,message});return;}
      if(session?.user?.id&&session.user.id!==state.owner?.id){++epoch;local();}
      // Never await another SDK call inside its auth callback (SDK lock).
      if(event!=='INITIAL_SESSION')setTimeout(()=>{if(!stopped)verify();},0);
    }
    function storageChanged(event){
      if(event.key!==KEY&&event.key!==authKey&&event.key!==null)return;
      if(event.key===authKey&&sdkOwner()===state.owner?.id)return; // same-owner token rotation
      ++epoch;local();if(online())setTimeout(()=>verify(),0);
    }
    function disconnected(){++epoch;local();}
    const connected=()=>verify();
    function start(){
      if(started)return;started=true;stopped=false;local();
      subscription=client?.auth.onAuthStateChange(authChanged)?.data?.subscription;
      events.addEventListener?.('storage',storageChanged);events.addEventListener?.('offline',disconnected);events.addEventListener?.('online',connected);events.addEventListener?.('focus',connected);verify();
    }
    function stop(){stopped=true;++epoch;subscription?.unsubscribe();for(const [name,fn] of [['storage',storageChanged],['offline',disconnected],['online',connected],['focus',connected]])events.removeEventListener?.(name,fn);started=false;}
    function disable(message){++epoch;const error=revoke();emit({prepared:false,message:error||message});}
    return {start,stop,verify,prepare,signOut,disable,ticket,valid,getSnapshot:()=>state,subscribe:fn=>{listeners.add(fn);return()=>listeners.delete(fn);}};
  }
  root.CatalystAccount={KEY,create,denied};
})(typeof window==='undefined'?globalThis:window);
