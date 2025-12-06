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
    {
    urlPattern: /^\/$/i,
    handler: "NetworkFirst",
    options: {
      cacheName: "home-page-cache",
      networkTimeoutSeconds: 5,
      expiration: {
        maxEntries: 1,
        maxAgeSeconds: 60 * 60 * 24 * 7,
      },
      cacheableResponse: { statuses: [0, 200] },
    },
  },

    {
      urlPattern: ({ request, url }) =>
        request.mode === "navigate" && !url.pathname.startsWith("/api"),
      handler: "NetworkFirst",
      options: {
        cacheName: "pages-cache",
        networkTimeoutSeconds: 8,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    {
      urlPattern: /^https:\/\/quicksosbackend-production\.up\.railway\.app\/api\/.*$/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "api-cache",
        networkTimeoutSeconds: 8,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 7,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    {
      urlPattern: ({ request }) => request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images-cache",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: { statuses: [0, 200] },
      },
    },

    {
      urlPattern: ({ request }) =>
        ["script", "style", "font"].includes(request.destination),
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "static-cache",
        // ❌ NO networkTimeoutSeconds here
        cacheableResponse: { statuses: [0, 200] },
      },
    },
  ],

  customWorkerDir: "sw.js",
});

export default withPwaConfigured({
  reactStrictMode: true,

  // 👉 OBLIGATORIO para next-pwa en Next 16
  experimental: {
    turbo: false,
  },

  // Requerido por next-pwa
  webpack: (config) => config,
});