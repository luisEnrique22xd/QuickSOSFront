// @ts-nocheck
import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const withPwaConfigured = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  runtimeCaching: [
    ...runtimeCaching,

    // ============================
    // 1) RUTAS QUE SE CACHEAN Y FUNCIONAN SIN INTERNET
    // ============================

    // Home cacheada
    {
      urlPattern: /^\/$/,
      handler: "NetworkFirst",
      options: {
        cacheName: "home-cache",
        networkTimeoutSeconds: 5,
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    // /components/Estadisticas cacheada
    {
      urlPattern: /^\/components\/Estadisticas$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "estadisticas-cache",
        networkTimeoutSeconds: 5,
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    // ============================
    // 2) RUTAS QUE DEBEN MOSTRAR offline.html SI NO HAY INTERNET
    // ============================

    {
      urlPattern: /^\/components\/Alertas$/i,
      handler: "NetworkOnly", // 🔥 No cachea, si falla → offline.html
      options: {
        cacheName: "alertas-no-cache",
        fallback: {
          document: "/offline.html",
        },
      },
    },

    {
      urlPattern: /^\/components\/Mapa$/i,
      handler: "NetworkOnly",
      options: {
        cacheName: "mapa-no-cache",
        fallback: {
          document: "/offline.html",
        },
      },
    },

    // ============================
    // 3) IMÁGENES
    // ============================
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

    // ============================
    // 4) STATIC: JS, CSS, FUENTES
    // ============================
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

  customWorkerDir: "service-worker",
});

export default withPwaConfigured({
  reactStrictMode: true,

  // DESACTIVAR TURBOPACK PARA next-pwa
  turbopack: {},

  webpack: (config) => config,
});
