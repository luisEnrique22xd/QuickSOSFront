importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

// 🚨 Asegurar que Workbox está cargado
if (workbox) {
  console.log("Workbox cargado correctamente");
} else {
  console.log("Error al cargar Workbox");
}

// ===============================
// PRECACHE (OBLIGATORIO)
// ===============================
workbox.precaching.precacheAndRoute([
  ...self.__WB_MANIFEST,

  // Cachear la página principal
  { url: "/", revision: "1" },
  { url: "/index.html", revision: "1" },

  // Página offline
  { url: "/offline.html", revision: "1" },
]);

// ===============================
// FALLBACK PARA NAVEGACIÓN
// ===============================
workbox.routing.setCatchHandler(async ({ event }) => {
  // Si es navegación y NO hay red
  if (event.request.mode === "navigate") {
    return caches.match("/offline.html");
  }

  return Response.error();
});

// ===============================
// MENSAJE PARA SALTAR ESPERA
// ===============================
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
