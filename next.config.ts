import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize images with modern formats
  images: {
    formats: ["image/avif", "image/webp"],
    // Minimum cache TTL for images (1 week)
    minimumCacheTTL: 60 * 60 * 24 * 7,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Compress bundles
  compiler: {
    // Remove console.log in production (keep errors/warnings)
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  // Performance: SWC minification is enabled by default in Next.js 16
  // experimental: {
  //   partialPrerendering: true,
  // },
};

export default nextConfig;
