// service-worker.js
self.addEventListener("install", event => {
  console.log("Service Worker installed");
  event.waitUntil(
    // 🌟 Consolidamos la lógica de caché aquí para asegurar que offline.html esté disponible 🌟
    caches.open("offline-cache").then((cache) => {
      // Asegúrate de que /offline.html existe en tu carpeta /public
      return cache.addAll(["/offline.html"]); 
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service Worker activated");
});

