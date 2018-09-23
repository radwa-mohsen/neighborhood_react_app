var staticCacheName = 'neighborhooh-static-v1';

self.addEventListener('install', function(event) {
 
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        "/index.html",
        "/static/css/main.2ffe1a91.css",
        '/static/js/main.18072b20.js',

      ])
    .then(() => console.log('Assets added to cache'))
     .catch(err => console.log('Error while fetching assets', err))
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('neighborhooh-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.startsWith(self.location.origin)) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request);
    })
  );
}
});


//
