var cacheName = 'fe-ims-intelligence-v1';
var filesToCache = [
    '/',
    'index.html',
    'manifest.json',
    'js/libs.min.js',
    'js/scripts.min.js',
    'css/styles.min.css',
    'tags/clothes.js',
    'tags/home.js',
    'tags/incident.js',
    'tags/offline.js',
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});


self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
        .catch(function() {
            console.log('404');
            return caches.match('/tags/offline.js');
        })
    )
});
