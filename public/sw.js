console.log('Service Worker started');

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
    console.log('Service Worker activated');
    event.waitUntil(self.clients.claim());
});

// Handle service worker installation
self.addEventListener('install', function(event) {
    console.log('Service Worker installing');
    self.skipWaiting();
});
