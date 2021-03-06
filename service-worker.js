const CACHE_NAME = "kabarliga-v2";

const urlsToCache = [
  "/",
  "/manifest.json",
  "/index.html",
  "/navbar.html",
  "/header.html",
  "/footer.html",
  "/liga.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/saved.html",

  "/css/materialize.min.css",
  "/css/style.css",

  "/js/api.js",
  "/js/materialize.min.js",
  "/js/liga.js",
  "/js/index.js",
  "/js/idb.js",
  "/js/db.js",

  "/assets/iconx/192x192_maskable_icon.png",
  "/assets/iconx/512x512_maskable_icon.png",
  "/assets/iconx/android-192x192.png",
  "/assets/iconx/apple-touch-icon-180x180.png",
  "/assets/iconx/browserconfig.xml",
  "/assets/iconx/favicon-16x16.png",
  "/assets/iconx/favicon-32x32.png",
  "/assets/iconx/favicon.ico",
  "/assets/img/bg-jumbotron.jpg",
  "/assets/img/about-edited.jpg",
  "/assets/img/liga/liga-belanda.jpg",
  "/assets/img/liga/liga-spanyol.jpg",
  "/assets/img/liga/liga-jerman.jpg",
  "/assets/img/liga/liga-inggris.jpg",
  "/assets/img/liga/liga-eropa.jpg",
  "/assets/img/liga/liga-prancis.jpg",

  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Righteous&display=swap",

  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
  "https://fonts.gstatic.com/s/quicksand/v21/6xKtdSZaM9iE8KbpRA_hK1QN.woff2",
  "https://fonts.gstatic.com/s/righteous/v9/1cXxaUPXBpj2rGoU7C9WhnGFucE.woff2",
  "https://fonts.gstatic.com/s/righteous/v9/1cXxaUPXBpj2rGoU7C9WiHGF.woff2",

  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff2",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.woff",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/webfonts/fa-solid-900.ttf",
];

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  const base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
            cache.put(event.request.url, response.clone());
            return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {'ignoreSearch': true}).then(function(response) {
          return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'assets/iconx/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});