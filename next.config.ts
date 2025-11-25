// @ts-nocheck   // ← NECESARIO porque next-pwa no tiene tipos actualizados
import withPWA from "next-pwa";

const withPwaConfigured = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // No PWA en dev
});

export default withPwaConfigured({
  reactStrictMode: true,
});
