self.addEventListener("install", event => {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  console.log("Service Worker activated");
});

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
              .catch(() => {
              if (event.request.mode === "navigate") {
                return caches.match("/offline.json");
              }
            })
        );
      })
    )
  );
});