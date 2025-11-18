import type { NextConfig } from "next";
import withPWA from "next-pwa";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = withPWA({
  dest: "public",              
  disable: !isProd,            
  register: true,              
  skipWaiting: true,           
  buildExcludes: [/middleware-manifest\.json$/], 
})({
  reactStrictMode: true,
  experimental: {
    
  },
  images: {
    domains: [],               
  },
});

export default nextConfig;
