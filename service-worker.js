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

  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap",
  "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",

  "https://api.football-data.org/v2/competitions/2001/standings",
  "https://api.football-data.org/v2/competitions/2002/standings",
  "https://api.football-data.org/v2/competitions/2003/standings",
  "https://api.football-data.org/v2/competitions/2015/standings",
  "https://api.football-data.org/v2/competitions/2014/standings",
  "https://api.football-data.org/v2/competitions/2021/standings",

  "https://api.football-data.org/v2/competitions/2001/teams",
  "https://api.football-data.org/v2/competitions/2002/teams",
  "https://api.football-data.org/v2/competitions/2003/teams",
  "https://api.football-data.org/v2/competitions/2015/teams",
  "https://api.football-data.org/v2/competitions/2014/teams",
  "https://api.football-data.org/v2/competitions/2021/teams",

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