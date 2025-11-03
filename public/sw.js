// Service Worker for PWA
const CACHE_NAME = "valencia-uni-pass-v1";
const BASE_PATH = "/val-pass";
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
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
