self.addEventListener('install', () => {
  console.log('Service Worker instalado 🚀');
});

self.addEventListener('activate', () => {
  console.log('Service Worker activado ✅');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
