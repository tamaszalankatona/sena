import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: "anonymous",
  allowedDevOrigins: ["192.168.1.2"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
