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
// self.addEventListener("fetch", (event) => {
//   const request = event.request;
//   const url = new URL(request.url);

//   // =============================
//   // 1️⃣ SOLO CACHEAR LA PÁGINA DE INICIO "/"
//   // =============================
//   if (url.pathname === "/") {
//     event.respondWith(
//       caches.open("home-cache").then((cache) =>
//         fetch(request)
//           .then((response) => {
//             cache.put(request, response.clone()); // Guardar home en caché
//             return response;
//           })
//           .catch(() => cache.match(request)) // Si no hay internet → usar caché
//       )
//     );
//     return; // no continuar a otros handlers
//   }

//   // =============================
//   // 2️⃣ OTRAS PÁGINAS → FALLBACK A offline.html SI NO HAY INTERNET
//   // =============================
//   if (request.mode === "navigate") {
//     event.respondWith(
//       fetch(request).catch(() => {
//         return caches.match("/offline.html");
//       })
//     );
//     return;
//   }

//   // =============================
//   // 3️⃣ PARA ARCHIVOS ESTÁTICOS (JS, CSS, IMG, ETC)
//   //     → dejar que next-pwa se encargue
//   // =============================
//   // No hacemos nada aquí, sw.js (next-pwa) se encarga automáticamente.
// });
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("quicksos-cache").then(cache =>
      cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        );
      })
    )
  );
});