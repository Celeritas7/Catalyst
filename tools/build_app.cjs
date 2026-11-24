// Static GitHub Pages release. No network, wall-clock timestamps, storage access,
// deployment, or deletion of earlier release assets occurs in this build.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const babel = require('@babel/standalone');
const postcss = require('postcss');
const tailwind = require('tailwindcss');
const sources = require('./app_sources.cjs');
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

async function build() {
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
  const config = require('../tailwind.config.cjs');
  const result = await postcss([tailwind({...config, content: config.content.map(file => path.join(ROOT, file))})])
    .process('@tailwind base;\n@tailwind components;\n@tailwind utilities;', {from: undefined});
  const styles = asset('styles.css', fontCSS + '\n' + result.css + '\n' + text('src/base.css') + '\n' + text('js/study.css'), 'style');

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
  for (const file of sources) runtime.push(text(file));
  const runtimeURL = asset('runtime.js', runtime.join('\n;\n'), 'script');
  const app = asset('app.js', babel.transform(text('src/app.jsx'), {presets: ['react'], filename: 'app.jsx', compact: true}).code, 'script');
  asset('THIRD-PARTY-LICENSES.txt', [...licenses.entries()].sort(([a], [b]) => a < b ? -1 : 1).map(([, value]) => value).join('\n\n---\n\n') + '\n\n' + text('vendor/language-utils/provenance.json'), 'license');

  const template = text('src/index.template.html');
  const contentVersion = hash(read('js/catalyst-data.js'));
  const buildId = hash(template + JSON.stringify(assets) + contentVersion).slice(0, 20);
  const html = template.replace('{{BUILD_ID}}', buildId).replace('{{STYLES}}', styles).replace('{{RUNTIME}}', runtimeURL).replace('{{APP}}', app);
  files.set('index.html', Buffer.from(html));
  const manifest = {
    schemaVersion: 1,
    buildId,
    contentVersion,
    converterRevision: provenance.commit,
    packages: Object.fromEntries(Object.entries(versions).sort(([a], [b]) => a < b ? -1 : 1)),
    // A release inventory, not a claim of downloaded/ready-offline state.
    assets: [{url: './index.html', kind: 'document', bytes: Buffer.byteLength(html), sha256: hash(html)}, ...assets],
  };
  manifest.totalBytes = manifest.assets.reduce((sum, file) => sum + file.bytes, 0);
  files.set('release-manifest.json', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'));
  return {files, manifest};
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
