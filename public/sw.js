console.log("Service Worker started");

self.addEventListener("push", function (event) {
  const data = event.data.json();

  // Check if this is an unregister command
  if (data.type === "unregister") {
    event.waitUntil(handleUnregister());
    return;
  }

  // Normal notification handling
  const options = {
    body: data.content,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: { url: "https://hack404.dev/launchpad" }, // Store target URL in notification data
  };
  event.waitUntil(
    self.registration.showNotification(
      `${data.author}: ${data.title}`,
      options,
    ),
  );
});

// Add notification click handler
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const targetUrl =
    event.notification.data?.url || "https://hack404.dev/launchpad";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then(function (clientList) {
        // Check if a window with the target URL is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }

        // If no window found, open a new one
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      }),
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
      console.log("Push subscription unsubscribed");
    }

    // Unregister the service worker
    await self.registration.unregister();
    console.log("Service worker unregistered");

    // Notify all clients to reload
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({ type: "sw-unregistered" });
    });
  } catch (error) {
    console.error("Error during unregister:", error);
  }
}

// Handle service worker activation
self.addEventListener("activate", function (event) {
  console.log("Service Worker activated");
  event.waitUntil(self.clients.claim());
});

// Handle service worker installation
self.addEventListener("install", function (event) {
  console.log("Service Worker installing");
  self.skipWaiting();
});

// Handle messages from clients
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "mockPush") {
    try {
      const pushData = JSON.parse(event.data.data);

      // Instead of creating an ExtendableEvent, create a custom mock event object
      // that properly implements waitUntil
      const mockPushEvent = {
        data: {
          json: function () {
            return pushData;
          },
          text: function () {
            return event.data.data;
          },
        },
        waitUntil: function (promise) {
          // Store the promise so it doesn't get garbage collected
          this._extendLifetimePromise = promise;
          return promise;
        },
      };

      // Find all push event listeners
      const listeners = self.__pushListeners;

      if (listeners && listeners.length) {
        // Call the first push handler directly with our mock event
        listeners[0](mockPushEvent);
        event.ports[0].postMessage({
          status: "success",
          message: "Mock push processed",
        });
      } else {
        // Store the original addEventListener to capture push event handlers
        if (!self.__originalAddEventListener) {
          self.__pushListeners = [];
          self.__originalAddEventListener = self.addEventListener;

          // Override addEventListener to capture push listeners
          self.addEventListener = function (type, listener, options) {
            if (type === "push") {
              self.__pushListeners.push(listener);
            }
            return self.__originalAddEventListener.call(
              this,
              type,
              listener,
              options,
            );
          };
        }

        // Try calling the event handler we set up earlier in the code
        try {
          self.__pushListeners = self.__pushListeners || [];
          const handler = findPushEventHandler();
          if (handler) {
            handler(mockPushEvent);
            event.ports[0].postMessage({
              status: "success",
              message: "Mock push processed",
            });
          } else {
            event.ports[0].postMessage({
              status: "error",
              message: "No push event handler found",
            });
          }
        } catch (innerError) {
          event.ports[0].postMessage({
            status: "error",
            message: innerError.toString(),
          });
        }
      }
    } catch (error) {
      event.ports[0].postMessage({
        status: "error",
        message: error.toString(),
      });
      console.error("Error processing mock push:", error);
    }
  }
});

// Helper function to find the push event handler in the service worker
function findPushEventHandler() {
  // Get a reference to the first push event handler
  // The push handler is defined earlier in this file
  const pushHandlerStr = self.addEventListener.toString();

  // Directly call the handler we know exists at the top of this file
  return function (mockEvent) {
    const data = mockEvent.data.json();

    // Check if this is an unregister command
    if (data.type === "unregister") {
      return; // Skip unregister for mock events
    }

    // Normal notification handling
    const options = {
      body: data.content,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: { url: "https://hack404.dev/launchpad" },
    };

    // Show the notification directly instead of using waitUntil
    self.registration.showNotification(
      `${data.author}: ${data.title}`,
      options,
    );
  };
}

// Script for mocking push notifications in the browser console

/* 

// Console script to mock a push notification - run this in the browser's DevTools console

(async () => {
  try {
    // Check if service worker is registered
    const registration = await navigator.serviceWorker.ready;
    
    if (!registration.active) {
      console.error('No active service worker found');
      return;
    }
    
    console.log('Found active service worker, sending mock push...');
    
    // Create mock push data
    const mockPushData = {
      title: 'Test Notification',
      author: 'DevTools',
      content: 'This is a test notification. Click to open the launchpad!',
    };
    
    // Convert data to string
    const dataStr = JSON.stringify(mockPushData);
    
    // Create a MessageChannel for communication
    const messageChannel = new MessageChannel();
    
    // Listen for responses
    messageChannel.port1.onmessage = (event) => {
      console.log('Response from service worker:', event.data);
    };
    
    // Send the mock push message to the service worker
    registration.active.postMessage({
      type: 'mockPush',
      data: dataStr
    }, [messageChannel.port2]);
    
  } catch (error) {
    console.error('Error sending mock push:', error);
  }
})();

*/
