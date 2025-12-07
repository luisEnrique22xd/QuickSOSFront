// @ts-nocheck
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const withPwaConfigured = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  // CACHE PRINCIPAL + SW PERSONALIZADO
  runtimeCaching: [
    ...runtimeCaching,

    // ⚡ Cachear explícitamente la página principal
    {
      urlPattern: ({ url }) => url.pathname === "/",
      handler: "NetworkFirst",
      options: {
        cacheName: "home-cache",
        networkTimeoutSeconds: 6,
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    // Navegación general (excepto API)
    {
      urlPattern: ({ request, url }) =>
        request.mode === "navigate" && !url.pathname.startsWith("/api"),
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        networkTimeoutSeconds: 8,
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    },

    // API externa
    {
      urlPattern: /^https:\/\/quicksosbackend-production\.up\.railway\.app\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 8,
        cacheableResponse: { statuses: [0, 200] },
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
      },
    },

    // Imágenes
    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    // Scripts, estilos, fuentes
    {
      urlPattern: ({ request }) =>
        ["script", "style", "font"].includes(request.destination),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-cache",
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],

  // SERVICE WORKER CUSTOM
  customWorkerDir: "service-worker",
});




export default withPwaConfigured({
  reactStrictMode: true,

  experimental: {
    workerThreads: false,
    cpus: 1,
  },
   experimental: {
    turbo: false,
  },

  // Requerido por next-pwa
  webpack: (config) => config,
});
