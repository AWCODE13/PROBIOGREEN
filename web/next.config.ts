import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components sengaja dimatikan: MVP memakai model ISR klasik
  // (`export const revalidate`) yang lebih sederhana untuk dipadukan dengan next-intl.
  cacheComponents: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
