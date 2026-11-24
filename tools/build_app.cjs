// Static GitHub Pages release. No network, wall-clock timestamps, storage access,
// deployment, or deletion of earlier release assets occurs in this build.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const babel = require('@babel/standalone');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const sources = require('./app_sources.cjs');
const mediaCore = require('../js/catalyst-media-core.js');
const ROOT = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(ROOT, file));
const text = file => read(file).toString('utf8');
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
function packageRoot(name) {
  let dir = path.dirname(require.resolve(name));
  while (dir !== path.dirname(dir)) {
    const file = path.join(dir, 'package.json');
    if (fs.existsSync(file) && JSON.parse(fs.readFileSync(file, 'utf8')).name === name) return dir;
    dir = path.dirname(dir);
  }
  throw new Error('Cannot locate package: ' + name);
}

async function build(config = JSON.parse(text('release-config.json'))) {
  const workerSource = text('js/catalyst-offline-core.js') + '\n' + text('js/catalyst-media-core.js') + '\n' + text('src/sw.js');
  if (config.mode === 'recovery') return recovery(config, workerSource);
  if (config.mode !== 'normal' || typeof config.revision !== 'string') throw new Error('Invalid release configuration');
  const files = new Map();
  const assets = [];
  function asset(name, bytes, kind) {
    bytes = Buffer.from(bytes);
    const sha256 = hash(bytes);
    const ext = path.extname(name), stem = path.basename(name, ext);
    const file = 'assets/' + stem + '.' + sha256.slice(0, 16) + ext;
    if (!files.has(file)) {
      files.set(file, bytes);
      assets.push({url: './' + file, kind, bytes: bytes.length, sha256});
    }
    return './' + file;
  }

  const fonts = [
    ['@fontsource-variable/dm-sans', ['index.css']],
    ['@fontsource-variable/playfair-display', ['index.css']],
    ['@fontsource-variable/noto-sans-devanagari', ['index.css']],
    ['@fontsource-variable/noto-sans-jp', ['index.css']],
    ['@fontsource-variable/noto-sans-sc', ['index.css']],
    ['@fontsource/noto-sans-myanmar', ['400.css', '500.css', '700.css']],
  ];
  const licenses = new Map();
  const versions = {};
  function license(name, dependencies = false) {
    if (licenses.has(name)) return;
    const dir = packageRoot(name);
    const pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'));
    const licenseFile = fs.readdirSync(dir).find(file => /^licen[sc]e(?:\.md|\.txt)?$/i.test(file));
    if (!licenseFile) throw new Error('Missing license: ' + name);
    versions[name] = pkg.version;
    licenses.set(name, name + '@' + pkg.version + '\n\n' + fs.readFileSync(path.join(dir, licenseFile), 'utf8'));
    if (dependencies) for (const dependency of Object.keys(pkg.dependencies || {}).sort()) license(dependency, true);
  }
  let fontCSS = '';
  for (const [pkg, styles] of fonts) {
    license(pkg);
    for (const style of styles) {
      let css = fs.readFileSync(path.join(packageRoot(pkg), style), 'utf8');
      // WOFF2 is supported by our target browsers. Keep the full unicode-range
      // sets, including characters learners may type outside the bundled lessons.
      css = css.replace(/,\s*url\([^)]*\.woff\)\s*format\('woff'\)/g, '');
      css = css.replace(/ Variable'/g, "'");
      css = css.replace(/url\(\.\/files\/([^)]*)\)/g, (_, file) => {
        const url = asset(file, fs.readFileSync(path.join(packageRoot(pkg), 'files', file)), 'font');
        return 'url(./' + path.basename(url) + ')';
      });
      fontCSS += css + '\n';
    }
  }
  license('tailwindcss');
  const tailwindConfig = require('../tailwind.config.cjs');
  const result = await postcss([tailwind({...tailwindConfig, content: tailwindConfig.content.map(file => path.join(ROOT, file))})])
    .process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', {from: undefined});
  const styles = asset('styles.css', fontCSS + '\n' + result.css + '\n' + text('src/base.css') + '\n' + text('js/study.css') + '\n' + text('src/offline.css'), 'style');

  const dataContext={window:{}};require('node:vm').runInNewContext(text('js/catalyst-data.js'),dataContext);
  const audio={version:1,languages:{}};
  for(const language of mediaCore.LANGS){
    const entries={};
    for(const concept of dataContext.window.CATALYST_DATA.concepts)for(const example of concept.entries[language]?.ex||[]){
      const normalized=mediaCore.norm(example.t),id=mediaCore.hash(normalized),sha=hash(normalized);
      if(entries[id]&&entries[id]!==sha)throw Error('Audio text hash collision: '+language);
      entries[id]=sha;
    }
    audio.languages[language]=Object.fromEntries(Object.entries(entries).sort());
  }
  const runtime = [];
  for (const [pkg, file] of [
    ['react', 'umd/react.production.min.js'],
    ['react-dom', 'umd/react-dom.production.min.js'],
    ['@supabase/supabase-js', 'dist/umd/supabase.js'],
  ]) {
    license(pkg, true);
    runtime.push(fs.readFileSync(path.join(packageRoot(pkg), file), 'utf8').replace(/^\/\/# sourceMappingURL=.*$/gm, ''));
  }
  const provenance = JSON.parse(text('vendor/language-utils/provenance.json'));
  const converters = [];
  for (const [lang, file] of [['my', 'burmese.js'], ['zh', 'chinese.js']]) {
    const code = text('vendor/language-utils/' + file);
    if (hash(code) !== provenance.files[file]) throw new Error('Converter differs from pinned revision: ' + file);
    const compiled = babel.transform(code, {plugins: ['transform-modules-commonjs'], filename: file}).code;
    converters.push(JSON.stringify(lang) + ': (function(){\nconst module = {exports:{}}; const exports = module.exports;\n' + compiled + '\nreturn module.exports.toDev;\n})()');
  }
  runtime.push('window.CatalystConverters = {\n' + converters.join(',\n') + '\n};');
  runtime.push('window.CatalystMediaCatalog = '+JSON.stringify(audio)+';');
  for (const file of sources) runtime.push(text(file));
  const runtimeURL = asset('runtime.js', runtime.join('\n;\n'), 'script');
  const app = asset('app.js', babel.transform(text('src/offline.jsx') + '\n' + text('src/app.jsx'), {presets: ['react'], filename: 'app.jsx', compact: true}).code, 'script');
  asset('THIRD-PARTY-LICENSES.txt', [...licenses.entries()].sort(([a], [b]) => a < b ? -1 : 1).map(([, value]) => value).join('\n\n---\n\n') + '\n\n' + text('vendor/language-utils/provenance.json'), 'license');
  const icons = [180, 192, 512].map(size => ({size, url:asset('catalyst-' + size + '.png', read('src/icons/catalyst-' + size + '.png'), 'icon')}));
  const webmanifest = asset('catalyst.webmanifest', JSON.stringify({name:'Catalyst',short_name:'Catalyst',id:'../',start_url:'../',scope:'../',display:'standalone',background_color:'#f7f5fc',theme_color:'#251c48',icons:icons.filter(icon => icon.size !== 180).map(icon => ({src:'./'+path.basename(icon.url),sizes:icon.size+'x'+icon.size,type:'image/png',purpose:'any maskable'}))}, null, 2), 'manifest');

  const template = text('src/index.template.html');
  const contentVersion = hash(read('js/catalyst-data.js'));
  const buildId = hash(template + JSON.stringify(assets) + contentVersion + workerSource + JSON.stringify(config)).slice(0, 20);
  const html = template.replace('{{BUILD_ID}}', buildId).replace('{{STYLES}}', styles).replace('{{RUNTIME}}', runtimeURL).replace('{{APP}}', app).replace('{{MANIFEST}}',webmanifest).replace('{{ICON}}',icons[0].url);
  files.set('index.html', Buffer.from(html));
  const manifest = {
    schemaVersion: 1,
    buildId,
    contentVersion,
    audio,
    converterRevision: provenance.commit,
    worker: {url:'./sw.js',protocol:1,buildId},
    packages: Object.fromEntries(Object.entries(versions).sort(([a], [b]) => a < b ? -1 : 1)),
    // Readiness requires full file verification and the matching worker in control.
    assets: [{url: './index.html', kind: 'document', bytes: Buffer.byteLength(html), sha256: hash(html)}, ...assets],
  };
  manifest.totalBytes = manifest.assets.reduce((sum, file) => sum + file.bytes, 0);
  finish(files,manifest,html,workerSource);
  return {files, manifest};
}

function finish(files,manifest,html,workerSource){
  const json=JSON.stringify(manifest,null,2)+'\n';
  files.set('release-manifest.json',Buffer.from(json));
  files.set('releases/'+manifest.buildId+'.json',Buffer.from(json));
  files.set('releases/'+manifest.buildId+'.html',Buffer.from(html));
  files.set('sw.js',Buffer.from('const RELEASE = '+JSON.stringify(manifest)+';\n'+workerSource));
}
function recovery(config,workerSource){
  if(!/^[a-f0-9]{20}$/.test(config.from||'')||typeof config.revision!=='string'||!config.revision)throw Error('Recovery requires a retained release ID and a new revision.');
  const previous=JSON.parse(text('releases/'+config.from+'.json'));
  if(previous.worker?.protocol!==1)throw Error('Recovery target must support the offline protocol.');
  const previousHTML=text('releases/'+config.from+'.html');
  const document=previous.assets.find(file=>file.url==='./index.html');
  if(!document||hash(previousHTML)!==document.sha256)throw Error('Retained recovery document is damaged.');
  const buildId=hash(JSON.stringify(previous)+workerSource+JSON.stringify(config)).slice(0,20);
  const html=previousHTML.replace('name="catalyst-build" content="'+previous.buildId+'"','name="catalyst-build" content="'+buildId+'"');
  if(html===previousHTML)throw Error('Recovery document has no matching build ID.');
  const files=new Map([['index.html',Buffer.from(html)]]);
  const assets=previous.assets.map(file=>{
    if(file.kind==='document')return {...file,bytes:Buffer.byteLength(html),sha256:hash(html)};
    const bytes=read(file.url);if(hash(bytes)!==file.sha256||bytes.length!==file.bytes)throw Error('Retained recovery asset is damaged: '+file.url);
    files.set(file.url.slice(2),bytes);return file;
  });
  const manifest={...previous,buildId,recoveryOf:previous.buildId,worker:{url:'./sw.js',protocol:1,buildId},assets,totalBytes:assets.reduce((sum,file)=>sum+file.bytes,0)};
  finish(files,manifest,html,workerSource);return {files,manifest};
}

async function main() {
  const {files, manifest} = await build();
  const check = process.argv.includes('--check');
  const stale = [];
  for (const [file, bytes] of files) {
    if (check) {
      if (!fs.existsSync(path.join(ROOT, file)) || !read(file).equals(bytes)) stale.push(file);
    } else {
      fs.mkdirSync(path.dirname(path.join(ROOT, file)), {recursive: true});
      fs.writeFileSync(path.join(ROOT, file), bytes);
    }
  }
  if (stale.length) throw new Error('Static release is stale; run npm run build:app.\n' + stale.join('\n'));
  console.log((check ? 'Verified' : 'Built') + ' release ' + manifest.buildId + ': ' + manifest.assets.length + ' files, ' + manifest.totalBytes + ' bytes.');
}
if (require.main === module) main().catch(error => {console.error(error.message); process.exitCode = 1;});
module.exports = {build};
