console.log('Service Worker started');

self.addEventListener('push', function (event) {
    const data = event.data.json();
    
    // Check if this is an unregister command
    if (data.type === 'unregister') {
        event.waitUntil(handleUnregister());
        return;
    }
    
    // Normal notification handling
    const options = {
        body: data.content,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
    };
    event.waitUntil(
        self.registration.showNotification(`${data.author}: ${data.title}`, options)
    );
});

// Handle unregister command
async function handleUnregister() {
    try {
        // Get the current subscription
        const subscription = await self.registration.pushManager.getSubscription();
        
        if (subscription) {
            // Unsubscribe from push notifications
            await subscription.unsubscribe();
            console.log('Push subscription unsubscribed');
        }
        
        // Unregister the service worker
        await self.registration.unregister();
        console.log('Service worker unregistered');
        
        // Notify all clients to reload
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({ type: 'sw-unregistered' });
        });
        
    } catch (error) {
        console.error('Error during unregister:', error);
    }
}

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
