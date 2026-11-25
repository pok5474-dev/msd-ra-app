// 오프라인 실행용 (버전 1e67e6778f) — 웹앱 파일이 바뀌면 이 번호가 바뀌어 새 버전 알림이 뜹니다
const V="msdra-1e67e6778f", ASSETS=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./apple-touch-icon.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(ASSETS))); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("message",e=>{ if(e.data==="skip")self.skipWaiting(); });
self.addEventListener("fetch",e=>{ const r=e.request; if(r.method!=="GET")return; const u=new URL(r.url); if(u.origin!==location.origin)return;
 e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(hit=>hit||(r.mode==="navigate"?c.match("./index.html"):null)).then(hit=>hit||fetch(r)))); });
