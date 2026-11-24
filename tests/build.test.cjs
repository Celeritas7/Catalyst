const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {JSDOM, requestInterceptor, VirtualConsole} = require('jsdom');
const {build} = require('../tools/build_app.cjs');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file));
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const wait = async predicate => {
  for (let i = 0; i < 200; i++) { if (predicate()) return; await new Promise(resolve => setTimeout(resolve, 10)); }
  throw new Error('Compiled UI did not reach expected state');
};

test('release reproduces exactly, inventories every local dependency, and keeps full font coverage', async () => {
  const first = await build(), second = await build();
  assert.deepEqual([...first.files.keys()], [...second.files.keys()]);
  for (const [file, bytes] of first.files) {
    assert.ok(bytes.equals(second.files.get(file)), 'Non-deterministic: ' + file);
    assert.ok(bytes.equals(read(file)), 'Stale checked-in release: ' + file);
  }
  const manifest = JSON.parse(read('release-manifest.json'));
  const byURL = new Map(manifest.assets.map(file => [file.url, file]));
  assert.equal(byURL.size, manifest.assets.length);
  assert.equal(manifest.totalBytes, manifest.assets.reduce((sum, file) => sum + file.bytes, 0));
  for (const file of manifest.assets) {
    assert.match(file.url, /^\.\/(?:index\.html|assets\/[a-z0-9.-]+)$/i);
    const bytes = read(file.url);
    assert.equal(bytes.length, file.bytes);
    assert.equal(hash(bytes), file.sha256);
  }
  const html = read('index.html').toString();
  assert.ok(html.includes(manifest.buildId));
  assert.ok(!/text\/babel|unpkg|cdn\.tailwind|fonts\.google/.test(html));
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) assert.ok(byURL.has(match[1]), match[1]);
  const cssFile = manifest.assets.find(file => file.kind === 'style');
  const css = read(cssFile.url).toString();
  for (const match of css.matchAll(/url\(([^)]+)\)/g)) {
    const relative = './assets/' + match[1].replace(/^\.\//, '');
    assert.ok(byURL.has(relative), 'Unlisted CSS dependency: ' + relative);
  }
  for (const family of ['DM Sans', 'Playfair Display', 'Noto Sans Devanagari', 'Noto Sans Myanmar', 'Noto Sans JP', 'Noto Sans SC']) assert.ok(css.includes("font-family: '" + family + "'"));
  // Full CJK subsets are retained; this is not a font limited to current lesson text.
  assert.ok(manifest.assets.filter(file => file.kind === 'font').length > 200);
  for (const file of manifest.assets.filter(file => file.kind === 'script')) assert.doesNotMatch(read(file.url).toString(), /https:\/\/celeritas7\.github\.io\/language-utils/);
  assert.equal(manifest.packages.react, '18.3.1');
  assert.equal(manifest.packages['@supabase/supabase-js'], '2.119.2');
});

async function openRelease({storage = {}, suffix = '#verb-final', beforeApp} = {}) {
  const resources = [], requests = [], errors = [];
  const origin = 'https://release.test';
  const localOnly = requestInterceptor(request => {
    const url = request.url;
    resources.push(url);
    const parsed = new URL(url);
    assert.equal(parsed.origin, origin, 'External bootstrap request');
    assert.ok(parsed.pathname.startsWith('/Catalyst/'), 'Asset escaped application path');
    const file = parsed.pathname.slice('/Catalyst/'.length);
    return new Response(read(file), {headers:{'Content-Type': file.endsWith('.css') ? 'text/css' : 'application/javascript'}});
  });
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => errors.push(error.message));
  let html = read('index.html').toString();
  if (beforeApp) {
    // A synthetic callback probe runs after the unmodified SDK/runtime, before
    // the unmodified compiled app. No real token or real account is used.
    const scripts = [...html.matchAll(/<script defer src="([^"]+)"><\/script>/g)];
    html = html.replace(scripts[0][0], scripts[0][0].replace(' defer', ''));
    html = html.replace(scripts[1][0], '<script>(' + beforeApp.toString() + ')()</script>' + scripts[1][0]);
  }
  const dom = new JSDOM(html, {
    url: origin + '/Catalyst/' + suffix, runScripts: 'dangerously', resources: {interceptors:[localOnly]},
    pretendToBeVisual: true, virtualConsole,
    beforeParse(w) {
      w.structuredClone = structuredClone; w.TextEncoder = TextEncoder; w.TextDecoder = TextDecoder;
      w.scrollTo = () => {}; w.HTMLMediaElement.prototype.pause = () => {};
      w.fetch = async url => { requests.push(String(url)); throw new TypeError('Network deliberately blocked'); };
      for (const [key, value] of Object.entries(storage)) w.localStorage.setItem(key, value);
    },
  });
  await wait(() => dom.window.document.querySelector('[aria-label="Settings"]'));
  return {dom, resources, requests, errors};
}

test('actual SDK and compiled release start at a nested path without external bootstrap; saved study survives reload', async () => {
  const settings = {targetLanguage:'my',anchor:'mr',meaningLanguage:'mr',comparisonLanguages:[],learned:['negation'],practice:{answers:12,correct:8},activities:{'my:pilot':{draft:'Keep this guided draft'}}};
  const notebook = {version:1,entries:[{id:'old',original:'မင်္ဂလာပါ',meaning:'नमस्कार',meaningLanguage:'mr',lesson:'',createdAt:'2026-11-22',corrections:[{text:'Keep this correction',createdAt:'2026-11-23',source:'user-entered'}]}]};
  require('../js/catalyst-review.js');
  const review = globalThis.CatalystReview.record(globalThis.CatalystReview.empty(), {id:'q',conceptId:'negation',skill:'understanding'}, {correct:false}, 1700000000000);
  let storage = {'catalyst_settings':JSON.stringify(settings), 'catalyst_notebook_v1:guest:my':JSON.stringify(notebook), 'catalyst_notebook_v1:other:my':JSON.stringify({...notebook,entries:[{...notebook.entries[0],original:'Private other account'}]}), 'catalyst_review_v1:guest:my':JSON.stringify(review), 'sibling-sentinel':'retain me'};
  for (let attempt = 0; attempt < 2; attempt++) {
    const {dom, resources, requests, errors} = await openRelease({storage});
    try {
      const w = dom.window;
      assert.equal(w.location.hash, '#verb-final');
      assert.ok(w.document.body.textContent.includes('Verb at the end'));
      assert.equal(typeof w.CatalystScripts.converters.my, 'function');
      assert.equal(typeof w.CatalystScripts.converters.zh, 'function');
      assert.match(w.CatalystScripts.devanagari({t:'မင်္ဂလာပါ'}, 'my'), /[\u0900-\u097f]/);
      assert.match(w.CatalystScripts.devanagari({r:'nǐ hǎo'}, 'zh'), /[\u0900-\u097f]/);
      assert.equal(resources.length, 3); // local stylesheet, runtime, compiled UI
      assert.ok(requests.every(url => url.startsWith('https://') && !/unpkg|tailwind|googleapis|language-utils/.test(url)));
      const learning = [...w.document.querySelectorAll('nav button')].find(button => button.textContent.includes('My Learning'));
      learning.click();
      await wait(() => w.document.body.textContent.includes('Saved sentences (1)'));
      assert.ok(w.document.body.textContent.includes('Keep this correction'));
      assert.ok(!w.document.body.textContent.includes('Private other account'));
      for (const key of Object.keys(storage).filter(key => key !== 'catalyst_settings')) assert.equal(w.localStorage.getItem(key), storage[key]);
      const after = JSON.parse(w.localStorage.getItem('catalyst_settings'));
      for (const key of ['learned','practice','activities','targetLanguage','anchor','meaningLanguage']) assert.deepEqual(after[key], settings[key]);
      w.history.back();
      await wait(() => w.location.hash === '#verb-final');
      assert.deepEqual(errors, []);
      storage = Object.fromEntries(Array.from({length:w.localStorage.length}, (_, i) => {const key = w.localStorage.key(i); return [key, w.localStorage.getItem(key)];}));
    } finally {dom.window.close();}
  }
});

test('compiled bootstrap hands both synthetic OAuth callback formats intact to the SDK', async () => {
  for (const suffix of ['?code=SYNTHETIC_CODE', '#access_token=SYNTHETIC_TOKEN&refresh_token=SYNTHETIC_REFRESH&expires_in=3600&token_type=bearer']) {
    const {dom, errors} = await openRelease({suffix, beforeApp: function () {
      window.supabase.createClient = function () {
        window.__callbackSeen = location.href;
        return {auth:{getSession:async()=>({data:{session:null}}),onAuthStateChange:()=>({data:{subscription:{unsubscribe(){}}}})},from:()=>({select(){return this;},limit:async()=>({data:null,error:{message:'Fixture has no server'}})})};
      };
    }});
    try {
      assert.equal(dom.window.__callbackSeen, 'https://release.test/Catalyst/' + suffix);
      assert.deepEqual(errors, []);
    } finally {dom.window.close();}
  }
});
