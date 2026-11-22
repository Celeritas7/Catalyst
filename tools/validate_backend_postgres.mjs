// Real multi-session PostgreSQL rehearsal using a disposable local cluster.
// Accepts no database URL or production credentials. Does not create OS users.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import EmbeddedPostgres from 'embedded-postgres';
import pg from 'pg';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const scratch=await fs.mkdtemp(path.join(os.tmpdir(),'catalyst-pg-rehearsal-'));
const socket=net.createServer();
await new Promise((resolve,reject)=>{socket.once('error',reject);socket.listen(0,'127.0.0.1',resolve);});
const port=socket.address().port;
await new Promise(resolve=>socket.close(resolve));
const password=crypto.randomBytes(24).toString('hex');
const log=[];
const cluster=new EmbeddedPostgres({databaseDir:path.join(scratch,'db'),port,user:'postgres',password,
  persistent:false,createPostgresUser:false,authMethod:'scram-sha-256',
  initdbFlags:['--locale=C','--encoding=UTF8'],
  postgresFlags:['-c','listen_addresses=127.0.0.1','-c',"unix_socket_directories="],
  onLog:message=>log.push(String(message)),onError:message=>log.push(String(message))});
const clients=[];
const connect=async()=>{
  const client=new pg.Client({host:'127.0.0.1',port,user:'postgres',password,database:'postgres',
    connectionTimeoutMillis:5000,query_timeout:15000});
  clients.push(client);await client.connect();return client;
};
const user='11111111-1111-4111-8111-111111111111';
const other='22222222-2222-4222-8222-222222222222';
const reserve=(client,uid)=>client.query('select public.catalyst_reserve_generation($1) q',[uid]).then(r=>r.rows[0].q);
try{
  await cluster.initialise();await cluster.start();
  const admin=await connect();
  const version=(await admin.query('show server_version')).rows[0].server_version;
  assert.match(version,/^17\./,'Rehearsal expects PostgreSQL major 17');
  await admin.query(await fs.readFile(path.join(root,'tests/fixtures/backend-source.sql'),'utf8'));
  await admin.query(await fs.readFile(path.join(root,'sql/catalyst-initial-install.sql'),'utf8'));
  await admin.query("update public.kg_chart_settings set value='5' where key='catalyst_daily_limit'");
  await admin.query(`insert into public.catalyst_generated(user_id,concept_id,sentences)
    select $1,id,'{"en":"synthetic legacy row"}'::jsonb from public.catalyst_concepts order by id limit 3`,[user]);
  const workers=await Promise.all(Array.from({length:20},()=>connect()));
  const pids=await Promise.all(workers.map(c=>c.query('select pg_backend_pid() pid').then(r=>r.rows[0].pid)));
  assert.equal(new Set(pids).size,20,'Each request must use a separate backend');
  await Promise.all(workers.map(c=>c.query('set role service_role')));
  const first=await Promise.all(workers.map(c=>reserve(c,user)));
  assert.deepEqual(first.filter(r=>r.allowed).map(r=>r.used).sort(),[4,5]);
  assert.ok(first.filter(r=>!r.allowed).every(r=>r.used===5&&r.limit===5));
  const second=await Promise.all(workers.map(c=>reserve(c,other)));
  assert.deepEqual(second.filter(r=>r.allowed).map(r=>r.used).sort(),[1,2,3,4,5]);
  await admin.query('delete from public.catalyst_generated where user_id=$1',[user]);
  assert.deepEqual(await reserve(workers[0],user),{allowed:false,used:5,limit:5});
  await admin.query("update public.kg_chart_settings set value='0' where key='catalyst_daily_limit'");
  assert.deepEqual(await reserve(workers[0],other),{allowed:false,used:5,limit:0});
  await admin.query('update public.kg_chart_settings set value=$1::jsonb where key=$2',['"invalid"','catalyst_daily_limit']);
  await assert.rejects(()=>reserve(workers[0],other),/invalid generation limit/);
  await workers[0].query('set role authenticated');
  await assert.rejects(()=>reserve(workers[0],user),/permission denied/);
  await workers[0].query('set role anon');
  await assert.rejects(()=>reserve(workers[0],user),/permission denied/);
  const ledger=(await admin.query('select attempts from public.catalyst_generation_daily order by user_id')).rows;
  assert.deepEqual(ledger,[{attempts:5},{attempts:5}]);
  console.log(JSON.stringify({postgres:version,separateSessions:20,
    legacyRows:3,legacyUserAllowed:2,newUserAllowed:5,finalAttempts:[5,5],
    deletionDoesNotRefund:true,pauseAndMalformedLimit:true,browserRpcDenied:true},null,2));
}catch(error){
  console.error(log.slice(-6).join('').trim());
  throw error;
}finally{
  await Promise.allSettled(clients.map(c=>c.end()));
  await cluster.stop();
  await fs.rm(scratch,{recursive:true,force:true});
}
