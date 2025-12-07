//aun no se si dejar esto 
importScripts('/sw.js');

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
  self.clients.claim();
});

// FETCH PERSONALIZADO
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // solo Cachea la pagina de inicio "/"
  if (url.pathname === "/") {
    event.respondWith(
      caches.open("home-cache").then((cache) =>
        fetch(request)
          .then((response) => {
            cache.put(request, response.clone());
            return response;
          })
          .catch(() => cache.match(request)) 
      )
    );
    return; 
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match("/offline.html");
      })
    );
    return;
  }

});