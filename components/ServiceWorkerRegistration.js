'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            console.log('Service Worker registered successfully', reg);
          })
          .catch((err) => {
            console.log('Service Worker registration failed', err);
          });
      });
    }
  }, []);

  return null;
}

