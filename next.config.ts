import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["jsdom"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
    ],
  },
};

export default nextConfig;