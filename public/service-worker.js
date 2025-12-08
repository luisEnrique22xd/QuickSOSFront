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
  const req = event.request;
  const url = new URL(req.url);

  // -----------------------------------------------------
  // 1️⃣ CACHE PARA PETICIONES DE API / BACKEND
  //    Stale-While-Revalidate (funciona sin internet)
  // -----------------------------------------------------
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      caches.open("api-cache").then(async cache => {
        const cachedResponse = await cache.match(req);

        try {
          const networkResponse = await fetch(req);
          cache.put(req, networkResponse.clone());
          return networkResponse;
        } catch {
          return cachedResponse || new Response(JSON.stringify({ error: "offline" }), {
            headers: { "Content-Type": "application/json" }
          });
        }
      })
    );
    return;
  }

  // -----------------------------------------------------
  // 2️⃣ Página de inicio → Network First + cache
  // -----------------------------------------------------
  if (url.pathname === "/") {
    event.respondWith(
      caches.open("home-cache").then(cache =>
        fetch(req)
          .then(res => {
            cache.put(req, res.clone());
            return res;
          })
          .catch(() => cache.match(req) || caches.match("/offline.html"))
      )
    );
    return;
  }

  // -----------------------------------------------------
  // 3️⃣ Página /alertas → igual que inicio
  // -----------------------------------------------------
  if (url.pathname.startsWith("/alertas")) {
    event.respondWith(
      caches.open("alertas-cache").then(cache =>
        fetch(req)
          .then(res => {
            cache.put(req, res.clone());
            return res;
          })
          .catch(() => cache.match(req) || caches.match("/offline.html"))
      )
    );
    return;
  }

  // -----------------------------------------------------
  // 4️⃣ Páginas que NO se cachean → solo fallback offline
  // -----------------------------------------------------
  if (
    url.pathname.startsWith("/mapa") ||
    url.pathname.startsWith("/estadisticas")
  ) {
    event.respondWith(
      fetch(req).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // -----------------------------------------------------
  // 5️⃣ Cualquier otra página navegable → offline.html
  // -----------------------------------------------------
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("/offline.html"))
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