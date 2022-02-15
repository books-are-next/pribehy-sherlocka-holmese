/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-aaace41';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./pribehy_sherlocka_holmese_split_000.html","./pribehy_sherlocka_holmese_split_001.html","./pribehy_sherlocka_holmese_split_003.html","./pribehy_sherlocka_holmese_split_004.html","./pribehy_sherlocka_holmese_split_005.html","./pribehy_sherlocka_holmese_split_006.html","./pribehy_sherlocka_holmese_split_007.html","./pribehy_sherlocka_holmese_split_008.html","./pribehy_sherlocka_holmese_split_009.html","./pribehy_sherlocka_holmese_split_010.html","./pribehy_sherlocka_holmese_split_011.html","./pribehy_sherlocka_holmese_split_012.html","./pribehy_sherlocka_holmese_split_013.html","./pribehy_sherlocka_holmese_split_014.html","./pribehy_sherlocka_holmese_split_015.html","./pribehy_sherlocka_holmese_split_016.html","./pribehy_sherlocka_holmese_split_017.html","./pribehy_sherlocka_holmese_split_018.html","./pribehy_sherlocka_holmese_split_019.html","./pribehy_sherlocka_holmese_split_020.html","./pribehy_sherlocka_holmese_split_021.html","./pribehy_sherlocka_holmese_split_022.html","./pribehy_sherlocka_holmese_split_023.html","./pribehy_sherlocka_holmese_split_024.html","./pribehy_sherlocka_holmese_split_025.html","./pribehy_sherlocka_holmese_split_026.html","./pribehy_sherlocka_holmese_split_027.html","./pribehy_sherlocka_holmese_split_028.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.jpg","./resources/image002.jpg","./resources/image003.gif","./resources/image004.gif","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
