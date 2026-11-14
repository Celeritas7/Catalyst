/* Local, deterministic review scheduler. These intervals are product defaults, not a mastery estimate. */
(function(root){
 const DAY=86400000, intervals=[1,3,7,14,30];
 const states={revision:'Needs revision',misused:'Known but misused',writing:'Cannot write yet',unused:'Known but never used'};
 const skills={understanding:'Understanding',context:'Contextual selection',production:'Production'};
 const empty=()=>({version:1,items:{},states:{}});
 const storageKey=(scope,language)=>`catalyst_review_v1:${encodeURIComponent(scope)}:${language}`;
 function parse(raw){
  if(!raw)return empty();
  const data=JSON.parse(raw);
  if(data?.version!==1||!data.items||Array.isArray(data.items)||typeof data.items!=='object'||!data.states||typeof data.states!=='object'||Array.isArray(data.states))throw Error('Unsupported or damaged review data');
  for(const r of Object.values(data.items))if(!r||!Number.isFinite(r.dueAt)||!skills[r.skill]||typeof r.conceptId!=='string')throw Error('Damaged review item');
  for(const r of Object.values(data.items))for(const field of ['attempts','independent','correct','assisted','retries','retentionAttempts','retentionCorrect','streak','lastAt'])if(!Number.isFinite(r[field])||r[field]<0)throw Error('Damaged review counts');
  return data;
 }
 function record(data,task,event,now=Date.now()){
  if(!task?.id||!task.conceptId||!skills[task.skill]||!Number.isFinite(now))return data;
  const old=data.items[task.id];
  const prior=old||{id:task.id,conceptId:task.conceptId,skill:task.skill,attempts:0,independent:0,correct:0,assisted:0,retries:0,retentionAttempts:0,retentionCorrect:0,streak:0,mistake:false};
  const independent=typeof event.correct==='boolean'&&!event.assisted&&!event.retry&&(!old||now>=prior.dueAt)&&(!Number.isFinite(prior.lastAt)||now-prior.lastAt>=DAY);
  const delayed=independent&&!!old&&now>=old.dueAt;
  const failed=event.correct===false;
  let dueAt=old?.dueAt??now+DAY,streak=prior.streak,mistake=prior.mistake;
  if(independent){streak=event.correct?Math.min(prior.streak+1,intervals.length):0;dueAt=now+intervals[Math.max(0,streak-1)]*DAY;}
  if(failed){mistake=true;dueAt=Math.min(dueAt,now+DAY);}
  if(delayed&&event.correct)mistake=false;
  // A fresh exposure needs another 24-hour gap before independent recall.
  dueAt=Math.max(dueAt,now+DAY);
  const next={...prior,attempts:prior.attempts+1,independent:prior.independent+(independent?1:0),correct:prior.correct+(independent&&event.correct?1:0),assisted:prior.assisted+(event.assisted?1:0),retries:prior.retries+(!independent&&!event.assisted?1:0),retentionAttempts:prior.retentionAttempts+(delayed?1:0),retentionCorrect:prior.retentionCorrect+(delayed&&event.correct?1:0),streak,dueAt,mistake,lastAt:now,lastIndependent:independent?now:prior.lastIndependent,lastMistake:failed?{response:event.response??null,expected:task.answer??null,at:now}:prior.lastMistake,lastResponse:event.response??null,lastAnswer:task.answer??null,lastOutcome:event.correct===null?'revealed':event.correct?'correct':'incorrect',lastIndependentOutcome:independent?(event.correct?'correct':'incorrect'):prior.lastIndependentOutcome};
  return {...data,items:{...data.items,[task.id]:next}};
 }
 function setState(data,id,value){if(!id||(!states[value]&&value!==''))return data;const next={...data.states};if(value)next[id]=value;else delete next[id];return {...data,states:next};}
 function rank(tasks,data,now=Date.now()){
  return tasks.map((task,i)=>{const r=data.items[task.id];return {task,i,priority:r?.dueAt<=now?0:r?.mistake?1:!r?2:3,preferred:({revision:'understanding',misused:'context',writing:'production',unused:'production'})[data.states[task.conceptId]]===task.skill?0:1,due:r?.dueAt||0};}).sort((a,b)=>a.priority-b.priority||a.preferred-b.preferred||a.due-b.due||a.i-b.i).map(x=>x.task);
 }
 function summary(data,conceptId){
  const rows=Object.values(data.items).filter(r=>!conceptId||r.conceptId===conceptId),result={};
  for(const skill of Object.keys(skills)){const rs=rows.filter(r=>r.skill===skill);result[skill]={attempts:rs.reduce((n,r)=>n+r.independent,0),correct:rs.reduce((n,r)=>n+r.correct,0)};}
  result.retention={attempts:rows.reduce((n,r)=>n+r.retentionAttempts,0),correct:rows.reduce((n,r)=>n+r.retentionCorrect,0)};return result;
 }
 root.CatalystReview={DAY,intervals,states,skills,empty,parse,storageKey,record,setState,rank,summary};
})(typeof window==='undefined'?globalThis:window);
