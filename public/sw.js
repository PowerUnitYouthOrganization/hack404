// Service Worker Version: 1.0.1
const CACHE_NAME = 'hack404-v1';
const SW_VERSION = '1.0.1';

console.log(`Service Worker version ${SW_VERSION} started`);

self.addEventListener('push', function (event) {
    const data = event.data.json();
    const options = {
        body: data.content,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
    };
    event.waitUntil(
        self.registration.showNotification(`${data.author}: ${data.title}`, options)
    );
});

// Handle service worker activation
self.addEventListener('activate', function(event) {
    console.log(`Service Worker version ${SW_VERSION} activated`);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Handle service worker installation
self.addEventListener('install', function(event) {
    console.log(`Service Worker version ${SW_VERSION} installing`);
    self.skipWaiting();
});
