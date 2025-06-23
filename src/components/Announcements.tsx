'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Bell, X } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

/**
 * NotificationHandler component handles the display of a dialog to ask users for permission to send notifications.
 * @example 
 * <>
 *   <NotificationHandler />
 *   {children}
 * </>
 */
export default function NotificationHandler() {
  const { data: session, status } = useSession();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [permissionAsked, setPermissionAsked] = useState(false);
  useEffect(() => {
    // Check if we've already asked for permission in this session
    const hasAskedBefore = sessionStorage.getItem('notificationPermissionAsked');
    const hasDeclined = sessionStorage.getItem('notificationPermissionDeclined');
    
    if (hasAskedBefore) {
      setPermissionAsked(true);
    }
  }, []);  useEffect(() => {

    let cleanup: (() => void) | undefined;

    if (status === 'authenticated' && !permissionAsked) {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        // Check if browser notification permission is already denied
        if (Notification.permission === 'denied') {
          // Don't show dialog if permission was already denied by the browser
          setPermissionAsked(true);
          sessionStorage.setItem('notificationPermissionAsked', 'true');
          sessionStorage.setItem('notificationPermissionDeclined', 'true');
          console.log('Notification permission already denied by browser');
          return;
        }
        
        // Show dialog first before registering service worker
        setShowPermissionDialog(true);
      }
    } else if (status === 'authenticated' && permissionAsked) {
      // Only proceed with service worker registration if user didn't decline
      const hasDeclined = sessionStorage.getItem('notificationPermissionDeclined');
      if (!hasDeclined) {
        registerServiceWorker();
      }
    }

    function registerServiceWorker() {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((swReg) => {
            console.log('Service Worker is registered', swReg);

            // Check for service worker updates and store cleanup function
            cleanup = checkForServiceWorkerUpdate(swReg);

            swReg.pushManager.getSubscription().then((subscription) => {
              if (subscription === null) {
                // subscribe
                subscribeUser(swReg);
              } else {
                // already subscribed
                console.log('User is already subscribed.');
              }
            });
          })
          .catch((error) => {
            console.error('Service Worker Error', error);
          });
      }
    }

    // Cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [status, permissionAsked]);

  const handleAllowNotifications = () => {
    setShowPermissionDialog(false);
    setPermissionAsked(true);
    sessionStorage.setItem('notificationPermissionAsked', 'true');
    
    // Now register the service worker and request permissions
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((swReg) => {
          console.log('Service Worker is registered', swReg);

          const cleanup = checkForServiceWorkerUpdate(swReg);

          swReg.pushManager.getSubscription().then((subscription) => {
            if (subscription === null) {
              subscribeUser(swReg);
            } else {
              console.log('User is already subscribed.');
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker Error', error);
        });
    }
  };
  const handleDeclineNotifications = () => {
    setShowPermissionDialog(false);
    setPermissionAsked(true);
    sessionStorage.setItem('notificationPermissionAsked', 'true');
    sessionStorage.setItem('notificationPermissionDeclined', 'true');
    console.log('User declined notifications');
  };

  async function subscribeUser(swReg: ServiceWorkerRegistration) {
    const response = await fetch('/api/vapid-public-key');
    const vapidPublicKey = await response.text();

    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    swReg.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      })
      .then((subscription) => {
        if (subscription) {
          console.log('User is subscribed.');
          fetch('/api/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } else {
          console.error('Failed to get subscription object.');
        }
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
      });
  }
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function checkForServiceWorkerUpdate(swReg: ServiceWorkerRegistration) {
    // Check for updates every 30 seconds when the page is active
    const checkForUpdates = () => {
      swReg.update().then(() => {
        console.log('Checked for service worker updates');
      }).catch((error) => {
        console.error('Error checking for service worker updates:', error);
      });
    };

    // Initial check
    checkForUpdates();

    // Set up periodic checking
    const updateInterval = setInterval(checkForUpdates, 30000);

    // Listen for when a new service worker is found
    swReg.addEventListener('updatefound', () => {
      const newWorker = swReg.installing;
      if (newWorker) {
        console.log('New service worker found, installing...');
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker is installed and ready
            console.log('New service worker installed and ready');
          }
        });
      }
    });

    // Listen for controlling service worker changes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service worker controller changed');
      // Optionally reload the page when the controller changes
      if (navigator.serviceWorker.controller) {
        window.location.reload();
      }
    });

    // Clean up interval when component unmounts
    return () => {
      clearInterval(updateInterval);
    };
  }  return (
    <div>
      <Dialog open={showPermissionDialog && status == 'authenticated'} onOpenChange={setShowPermissionDialog}>
        <DialogContent className="sm:max-w-md bg-[#0c0f14] border-white/10 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="h-6 w-6 text-[#C3F73A]" />
              <DialogTitle className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                Enable Live Announcements
              </DialogTitle>
            </div>
            <DialogDescription asChild>
              <div className="text-left space-y-4">
                <p className="text-base text-white/90">
                  Stay up to date with the latest announcements from Hack404!
                </p>
                <div>
                  <p className="mb-3 text-base text-white/90">We'll send you notifications for:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-sm text-white/80">
                    <li>Important event updates</li>
                    <li>Schedule changes</li>
                    <li>Deadline reminders</li>
                    <li>Live announcements during the event</li>
                  </ul>
                </div>
                <p className="text-sm text-white/60">
                  You can disable these notifications at any time in your browser settings.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleDeclineNotifications}
              className="w-full sm:w-auto px-6 py-3 text-base border border-white/20 rounded-md text-white/80 hover:text-white hover:border-white/40 transition-colors bg-transparent"
            >
              <X className="w-4 h-4 mr-2 inline" />
              Not Now
            </button>
            <button
              onClick={handleAllowNotifications}
              className="w-full sm:w-auto px-6 py-3 text-base bg-[#C3F73A] text-black rounded-md hover:bg-[#b8ec35] transition-colors font-medium"
            >
              <Bell className="w-4 h-4 mr-2 inline" />
              Enable Notifications
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
