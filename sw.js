const C='pv-v22', F=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
const put=(req,res)=>{if(req.method==='GET'&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(req,cp))}return res};
self.addEventListener('fetch',e=>{
  const nav=e.request.mode==='navigate'||e.request.url.endsWith('index.html');
  if(nav){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>put(e.request,r)).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));return}
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>put(e.request,res)).catch(()=>caches.match('index.html'))));
});
