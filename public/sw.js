// Service Worker for PWA
const CACHE_NAME = "valencia-uni-pass-v1";
// Detect base path from service worker scope
const BASE_PATH = self.location.pathname.replace("/sw.js", "");
const urlsToCache = [
  BASE_PATH + "/",
  BASE_PATH + "/globals.css",
  BASE_PATH + "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  // Don't cache requests with query parameters to preserve them
  const url = new URL(event.request.url);
  if (url.search) {
    // For requests with query parameters, always fetch from network first
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request);
      })
    );
  } else {
    // For requests without query parameters, use cache-first strategy
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
