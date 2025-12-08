// Instalación: solo guardar el fallback offline
self.addEventListener("install", event => {
  console.log("Service Worker installed");

  event.waitUntil(
    caches.open("offline-cache").then(cache => {
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
// ===========================
self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // 1️⃣ Página de inicio → NetworkFirst + cache propio
  if (url.pathname === "/") {
    event.respondWith(
      caches.open("quicksos-cache").then(cache =>
        fetch(request)
          .then(res => {
            cache.put(request, res.clone());
            return res;
          })
          .catch(() => cache.match(request))
      )
    );
    return;
  }

  // 2️⃣ Página de alertas → igual que inicio
  if (url.pathname.startsWith("/alertas")) {
    event.respondWith(
      caches.open("alertas-cache").then(cache =>
        fetch(request)
          .then(res => {
            cache.put(request, res.clone());
            return res;
          })
          .catch(() => cache.match(request))
      )
    );
    return;
  }

  // 3️⃣ Páginas que NO se cachean → mostrar offline.html si no hay internet
  if (
    url.pathname.startsWith("/mapa") ||
    url.pathname.startsWith("/estadisticas")
  ) {
    event.respondWith(
      fetch(request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // 4️⃣ Para cualquier otra página navegable → fallback offline
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // 5️⃣ Todo lo demás (assets, imágenes, js, css) → manejarlo next-pwa
  // NO HACEMOS NADA AQUÍ
});


// self.addEventListener("fetch", event => {
//   event.respondWith(
//     caches.open("quicksos-cache").then(cache =>
//       cache.match(event.request).then(response => {
//         return (
//           response ||
//           fetch(event.request).then(networkResponse => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           })
//         );
//       })
//     )
//   );
// });