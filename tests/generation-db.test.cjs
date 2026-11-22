// Isolated PostgreSQL (PGlite); no production credentials or Supabase writes.
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {PGlite}=require('@electric-sql/pglite');
const root=path.resolve(__dirname,'..');
const user='11111111-1111-4111-8111-111111111111',other='22222222-2222-4222-8222-222222222222';
const rowId='33333333-3333-4333-8333-333333333333';
test('generation migration: legacy preservation, grants/RLS, quota and rerun',async(t)=>{
  const db=new PGlite();
  try{
    await db.exec(`create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth; create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
      grant usage on schema public,auth to anon,authenticated,service_role;
      grant execute on function auth.uid() to anon,authenticated,service_role;
      create table public.kg_chart_settings(key text primary key,value jsonb);
      grant select on public.kg_chart_settings to service_role;
      alter default privileges in schema public grant all on tables to anon,authenticated,service_role;
      alter default privileges in schema public grant execute on functions to anon,authenticated,service_role;`);
    for(const file of ['catalyst-schema.sql','catalyst-generated.sql'])await db.exec(fs.readFileSync(path.join(root,'sql',file),'utf8'));
    await db.exec(`insert into public.catalyst_concepts(id,title,group_name) values ('want_tai','Want to','test');
      insert into public.catalyst_generated(id,user_id,concept_id,sentences) values
      ('${rowId}','${user}','want_tai','{"en":"water","my":{"t":"ရေ"},"mr":{"t":"पाणी"}}'),
      (gen_random_uuid(),'${other}','want_tai','{"en":"other","my":{"t":"ရေ"}}');`);
    const old=(await db.query('select sentences from public.catalyst_generated where id=$1',[rowId])).rows[0].sentences;
    await db.exec('grant update (sentences), insert (sentences) on public.catalyst_generated to authenticated; grant select (sentences) on public.catalyst_generated to anon;');
    const migration=fs.readFileSync(path.join(root,'sql','catalyst-generation-v2.sql'),'utf8');
    await db.exec(migration);await db.exec(migration);
    await t.test('migration is additive/idempotent and preserves old JSON',async()=>{
      const row=(await db.query('select * from public.catalyst_generated where id=$1',[rowId])).rows[0];
      assert.deepEqual(row.sentences,old);assert.equal(row.target_language,null);
      assert.equal((await db.query('select count(*)::int n from public.catalyst_generated')).rows[0].n,2);
    });
    await t.test('anonymous has no sentence access or quota access',async()=>{
      await db.exec('set role anon');
      await assert.rejects(()=>db.query('select * from public.catalyst_generated'),/permission denied/);
      await assert.rejects(()=>db.query('select public.catalyst_reserve_generation($1)',[user]),/permission denied/);
      await db.exec('reset role');
    });
    await t.test('authenticated owner can read/flag only own rows, cannot rewrite or reserve',async()=>{
      await db.query("select set_config('request.jwt.claim.sub',$1,false)",[user]);await db.exec('set role authenticated');
      const own=(await db.query('select * from public.catalyst_generated')).rows;assert.equal(own.length,1);assert.equal(own[0].user_id,user);
      assert.equal((await db.query('update public.catalyst_generated set flagged=true where user_id=$1 returning id',[other])).rows.length,0);
      assert.equal((await db.query('update public.catalyst_generated set flagged=true where id=$1 returning id',[rowId])).rows.length,1);
      await assert.rejects(()=>db.query("update public.catalyst_generated set sentences='{}' where id=$1",[rowId]),/permission denied/);
      await assert.rejects(()=>db.query('update public.catalyst_generated set target_language=\'ja\' where id=$1',[rowId]),/permission denied/);
      await assert.rejects(()=>db.query("insert into public.catalyst_generated(user_id,concept_id,sentences) values ($1,'want_tai','{}')",[user]),/permission denied/);
      await assert.rejects(()=>db.query('select * from public.catalyst_generation_daily'),/permission denied/);
      await assert.rejects(()=>db.query('select public.catalyst_reserve_generation($1)',[user]),/permission denied/);
      await db.exec('reset role');
    });
    const reserve=async(uid=user)=>(await db.query('select public.catalyst_reserve_generation($1) q',[uid])).rows[0].q;
    await t.test('legacy usage is counted; only remaining slots can be reserved',async()=>{
      await db.exec("insert into public.kg_chart_settings values ('catalyst_daily_limit','3')");
      await db.exec('set role service_role');
      // PGlite queues these on one PostgreSQL backend. This checks the cap;
      // real multi-connection contention remains an isolated-staging gate.
      const replies=await Promise.all(Array.from({length:10},()=>reserve()));
      assert.equal(replies.filter(r=>r.allowed).length,2);
      assert.deepEqual(replies.filter(r=>r.allowed).map(r=>r.used),[2,3]);
      assert.ok(replies.filter(r=>!r.allowed).every(r=>r.used===3&&r.limit===3));
      await db.exec('reset role');
    });
    await t.test('deleting own saved row does not refund reserved attempts',async()=>{
      await db.exec('set role authenticated');await db.query('delete from public.catalyst_generated where id=$1',[rowId]);await db.exec('reset role');
      await db.exec('set role service_role');assert.deepEqual(await reserve(),{allowed:false,used:3,limit:3});await db.exec('reset role');
    });
    await t.test('independent users, previous UTC day and disabled limit',async()=>{
      await db.exec('set role service_role');assert.deepEqual(await reserve(other),{allowed:true,used:2,limit:3});await db.exec('reset role');
      const third='44444444-4444-4444-8444-444444444444';
      await db.query("insert into public.catalyst_generation_daily values ($1,(now() at time zone 'UTC')::date-1,999)",[third]);
      await db.exec('set role service_role');assert.deepEqual(await reserve(third),{allowed:true,used:1,limit:3});await db.exec('reset role');
      await db.exec("update public.kg_chart_settings set value='0' where key='catalyst_daily_limit';set role service_role");
      assert.deepEqual(await reserve(third),{allowed:false,used:1,limit:0});await db.exec('reset role');
    });
    await t.test('malformed settings fail closed and unsupported languages are rejected',async()=>{
      await db.exec(`update public.kg_chart_settings set value='"oops"' where key='catalyst_daily_limit';set role service_role`);
      await assert.rejects(()=>reserve(),/invalid generation limit/);await db.exec('reset role');
      await assert.rejects(()=>db.query("insert into public.catalyst_generated(user_id,concept_id,sentences,target_language) values ($1,'want_tai','{}','xx')",[user]),/check constraint/);
    });
  }finally{await db.close();}
});
