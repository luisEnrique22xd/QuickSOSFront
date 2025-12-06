self.addEventListener("install", event => {
  console.log("Service Worker installed");
  event.waitUntil(
    // Solo cacheamos el fallback para asegurar su disponibilidad
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