// Service Worker for caching and offline support

// Install event: cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('fibertime-cache').then(cache => {
      return cache.addAll([
        '/', // Cache root (index.html)
        '/index.html', // Cache main page
        '/app.js' // Cache app logic
      ]);
      // Paths are relative to GitHub Pages root (e.g., /fibertime-report/)
    })
  );
});

// Fetch event: serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
    // Return cached response if available, otherwise fetch from network
  );
});