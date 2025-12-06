const CACHE_NAME = "quicksos-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Instalar y precache básico
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activar y limpiar cachés viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Estrategia híbrida para soportar Next.js
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // No interceptar llamadas al backend
  if (url.origin !== self.location.origin) return;

  // Manejar assets de Next.js
  if (url.pathname.startsWith("/_next")) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(res => {
          if (res) return res;

          return fetch(event.request).then(network => {
            cache.put(event.request, network.clone());
            return network;
          });
        })
      )
    );
    return;
  }

  // Caché-first para assets y páginas estáticas
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(network => {
        caches.open(CACHE_NAME).then(cache =>
          cache.put(event.request, network.clone())
        );
        return network;
      });
    })
  );
});