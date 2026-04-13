/* Service Worker DISABLED — cache was serving stale models */
/* Will re-enable after model issues are resolved */
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  /* Delete ALL caches on activate */
  e.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(names.map(function(n) { return caches.delete(n); }));
    }).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener('fetch', function(e) { /* pass through — no caching */ });
