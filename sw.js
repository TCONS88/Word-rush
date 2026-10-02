// Word Rush offline cache. Change VERSION whenever index.html is updated so players get the new build.
const VERSION = 'word-rush-v2';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', event => {
  // Each file is cached on its own so one missing file cannot stop the app installing.
  event.waitUntil(caches.open(VERSION).then(cache => Promise.all(SHELL.map(url => cache.add(url).catch(() => {})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

// Serve from the cache first, refresh it in the background, and fall back to the game page when offline.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      const fresh = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(VERSION).then(cache => cache.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()));
      return cached || fresh;
    })
  );
});
