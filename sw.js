importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if(workbox) console.log("Workbox bekerja")
else console.log("Workbox tidak bekerja")

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/header.html', revision: '1' },
  { url: '/footer.html', revision: '1' },
  { url: '/liga.html', revision: '2' },
  { url: '/navbar.html', revision: '1' },
  { url: '/push.js', revision: '1' },
  { url: '/manifest.json', revision: '1' },
]);

// Caching Pages
workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages',
  })
);
  
// Caching JS
workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'js',
  })
);

// Caching CSS
workbox.routing.registerRoute(
  new RegExp('/css/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'css',
  })
);

// Caching Image
workbox.routing.registerRoute(
  new RegExp('/assets/'),

  workbox.strategies.staleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  }),
);


// Menyimpan cache dari footbal-data
workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'football-data',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      })

    ]
  })
)

//Menyimpan logo tim liga
workbox.routing.registerRoute(
  new RegExp("https://crests.football-data.org/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'crestTeam',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60,
      })

    ]
  })
)


//Menyimpan font awesome CDN
workbox.routing.registerRoute(
  new RegExp("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/"),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'font-awesome',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 60,
      })

    ]
  })
)



// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

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