const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {PGlite}=require('@electric-sql/pglite');
const {buildInstall}=require('../tools/build_backend_install.cjs');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const setup=read('tests/fixtures/backend-source.sql');
const preflight=read('sql/catalyst-preflight.sql');
const install=buildInstall();
const content=['catalyst_concepts','catalyst_entries','catalyst_examples'];

test('checked-in initial installation matches reviewed SQL sources',()=>{
  assert.equal(read('sql/catalyst-initial-install.sql'),install);
});

for(const broad of [false,true]) test(`complete first install with ${broad?'legacy broad':'explicit-only'} default grants`,async(t)=>{
  const db=new PGlite();
  try{
    await db.exec(setup);
    if(broad) await db.exec(`alter default privileges in schema public grant all on tables to anon,authenticated,service_role;
      alter default privileges in schema public grant execute on functions to anon,authenticated,service_role;`);
    const before=(await db.query(preflight)).rows;
    assert.equal(before.filter(r=>r.status==='BLOCKED').length,0);
    assert.equal(before.find(r=>r.check_name==='catalyst_tables').status,'NOT_INSTALLED');
    await db.exec(install);
    await t.test('grammar is readable with minimum grants; generation starts paused',async()=>{
      for(const role of ['anon','authenticated','service_role']){
        await db.exec(`set role ${role}`);
        for(const table of content) assert.ok((await db.query(`select count(*)::int n from public.${table}`)).rows[0].n>0);
        await assert.rejects(()=>db.query("update public.catalyst_concepts set title='rewritten'"),/permission denied/);
        await assert.rejects(()=>db.query('delete from public.catalyst_concepts'),/permission denied/);
        await assert.rejects(()=>db.query("insert into public.catalyst_concepts(id,title,group_name) values ('injected','x','x')"),/permission denied/);
        await db.exec('reset role');
      }
      await db.exec('set role service_role');
      const q=(await db.query("select public.catalyst_reserve_generation('11111111-1111-4111-8111-111111111111') q")).rows[0].q;
      assert.deepEqual(q,{allowed:false,used:0,limit:0});
      await db.exec('reset role');
      assert.equal((await db.query(preflight)).rows.find(r=>r.check_name==='quota_rpc').status,'PASS');
    });
    await t.test('schema rerun removes old column grants as well as table grants',async()=>{
      await db.exec(`grant update(title),insert(title) on public.catalyst_concepts to authenticated;
        grant update(title) on public.catalyst_concepts to public;
        create policy accidental_write on public.catalyst_concepts for all to authenticated using(true) with check(true);`);
      await db.exec(read('sql/catalyst-schema.sql'));
      await db.exec('set role authenticated');
      await assert.rejects(()=>db.query("update public.catalyst_concepts set title='rewritten'"),/permission denied/);
      await db.exec('reset role');
    });
    await t.test('rerunning first-install refuses and preserves content and saved rows',async()=>{
      await db.exec(`insert into public.catalyst_concepts(id,title,group_name) values ('custom_preserved','Custom','test');
        insert into public.catalyst_generated(user_id,concept_id,sentences) values
        ('11111111-1111-4111-8111-111111111111','custom_preserved','{"en":"keep me"}');`);
      await assert.rejects(()=>db.exec(install),/Existing Catalyst objects/);
      await db.exec('rollback');
      assert.equal((await db.query("select sentences->>'en' s from public.catalyst_generated where concept_id='custom_preserved'")).rows[0].s,'keep me');
    });
  }finally{await db.close();}
});

test('installation failures roll back; preflight detects incompatible sources',async()=>{
  const db=new PGlite();
  try{
    await db.exec(setup);
    await db.exec('alter table public.kg_chart_quiz_sessions drop column language_code');
    assert.equal((await db.query(preflight)).rows.find(r=>r.check_name==='source_columns').status,'BLOCKED');
    await assert.rejects(()=>db.exec(install),/Source preflight failed/);
    await db.exec('rollback');
    assert.equal((await db.query("select to_regclass('public.catalyst_concepts') r")).rows[0].r,null);
    await db.exec('alter table public.kg_chart_quiz_sessions add column language_code text');
    const broken=install.replace(/commit;\s*$/, "select 1/0;\ncommit;");
    await assert.rejects(()=>db.exec(broken),/division by zero/);
    await db.exec('rollback');
    assert.equal((await db.query("select to_regclass('public.catalyst_concepts') r")).rows[0].r,null);
    assert.equal((await db.query('select count(*)::int n from public.kg_chart_settings')).rows[0].n,0);
    await db.exec("insert into public.kg_chart_settings values ('catalyst_daily_limit','10')");
    await assert.rejects(()=>db.exec(install),/Existing nonzero\/invalid Catalyst limit/);
    await db.exec('rollback');
    assert.equal((await db.query('select value from public.kg_chart_settings')).rows[0].value,10);
  }finally{await db.close();}
});
