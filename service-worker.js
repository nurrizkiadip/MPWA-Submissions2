const CACHE_NAME = "ligabola-v1";
const urlsToCache = [
  "/css/materialize.min.css",
  "/css/style.css",
  
  "/js/materialize.min.css",
  "/js/idb.css",
  "/js/db.css",
  "/js/script.css",

  "/footer.html",
  "/index.html",
  "/navbar.html",
  "/pages/jadwal-tanding.html",
  "/pages/skor-tanding.html",

  "/manifest.json",
];


self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        return cache.addAll(urlsToCache);
      })
  )
})

self.addEventListener('active', function(e){
  e.waitUntil(
    caches.keys()
      .then(function(cacheNames){
        return Promise.all(
          cacheNames.map(function(cacheName){
            if(cacheName !== CACHE_NAME) return caches.delete(cacheName);
          })
        )
      })
  )
})

self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.open(CACHE_NAME)
      .then(function(cache){
        return cache.match(e.request)
          .then(function(response){
            var fetchPromise = fetch(e.request).then(function(networkResponse){
              cache.put(e.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
      })
  )
})

self.addEventListener('push', function(e){
  
})