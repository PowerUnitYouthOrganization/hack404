'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Announcement {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export default function Announcements() {
  const [latestAnnouncement, setLatestAnnouncement] = useState<Announcement | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchLatestAnnouncement() {
      const res = await fetch('/api/announcements');
      const announcements: Announcement[] = await res.json();
      if (announcements.length > 0) {
        setLatestAnnouncement(announcements[0]);
      }
    }

    fetchLatestAnnouncement();

    if (status === 'authenticated') {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((swReg) => {
            console.log('Service Worker is registered', swReg);

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
  }, [status]);

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

  if (!latestAnnouncement) {
    return <div>Loading announcements...</div>;
  }

  return (
    <div>
      <h2>{latestAnnouncement.title}</h2>
      <p>{latestAnnouncement.content}</p>
    </div>
  );
}
