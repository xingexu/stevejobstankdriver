import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.mjs':'text/javascript','.wasm':'application/wasm','.task':'application/octet-stream','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer(async(req,res)=>{try{if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end();}const url=new URL(req.url,'http://localhost');let file;if(url.pathname==='/')file=path.join(root,'public/index.html');else if(['/app.js','/game-rules.js','/style.css','/duck.png','/camouflage.jpg','/vendor/face_landmarker.task'].includes(url.pathname))file=path.join(root,'public',url.pathname);else if(url.pathname==='/vendor/vision_bundle.mjs')file=path.join(root,'node_modules/@mediapipe/tasks-vision/vision_bundle.mjs');else if(/^\/vendor\/wasm\/vision_wasm_(internal|nosimd_internal|module_internal)\.(js|wasm)$/.test(url.pathname))file=path.join(root,'node_modules/@mediapipe/tasks-vision/wasm',path.basename(url.pathname));else{res.writeHead(404);return res.end('Not found');}const content=await readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','Content-Length':content.length,'X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:content);}catch(e){res.writeHead(e.code==='ENOENT'?404:500);res.end('Asset unavailable');}});
server.on('error',error=>{console.error(error.message);process.exitCode=1;});
server.listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log(`Tank Face Dashboard: http://localhost:${server.address().port}`));
