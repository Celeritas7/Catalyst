const fs=require('node:fs');
const path=require('node:path');
const babel=require('@babel/standalone');
const code=['offline.jsx','app.jsx'].map(file=>fs.readFileSync(path.join(__dirname,'../src',file),'utf8')).join('\n');
babel.transform(code,{presets:['react'],filename:'app.jsx'});
console.log('Full application JSX compiles. Run check:build to verify the published release.');
