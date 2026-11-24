const fs=require('node:fs');
const path=require('node:path');
const babel=require('@babel/standalone');
const code=fs.readFileSync(path.join(__dirname,'../src/app.jsx'),'utf8');
babel.transform(code,{presets:['react'],filename:'app.jsx'});
console.log('Full application JSX compiles. Run check:build to verify the published release.');
