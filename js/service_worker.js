if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/service_worker.js').then(function () {
        console.log('Service Worker is registered');
    })
}

self.addEventListener('install', function (e) {
    console.log('Service Worker - Installing', e);
})

self.addEventListener('activated', function (e) {
    console.log('Service Worker - Activating', e)
    return self.clients.claim();
})

self.addEventListener('fetch', function (e) {
console.log('Service Worker - Fetching something', e);
})

let CACHE_STATIC_NAME = 'static_cache';
let CACHE_DYNAMIC_NAME = 'dynamic_cache';

self.addEventListener('install', function(event) {
event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
    .then(function(cache) {
        cache.addAll([
            '/js/index.js',
            '/index.html',
            '/css/css.css'
        ]);
    })
)
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_STATIC_NAME) {
                    return caches.delete(key);
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                .then(function(res) {
                    return caches.open(CACHE_DYNAMIC_NAME)
                    .then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                });
                })
                .catch(function(err) {

                });
            }
        })
    )
})
