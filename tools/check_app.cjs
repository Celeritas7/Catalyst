const fs=require('node:fs');
const path=require('node:path');
const babel=require('@babel/standalone');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const code=html.match(/<script type="text\/babel"[^>]*>([\s\S]*?)<\/script>/)?.[1];
if(!code)throw new Error('Application JSX not found');
babel.transform(code,{presets:['react'],filename:'index.jsx'});
console.log('Full application JSX compiles.');
