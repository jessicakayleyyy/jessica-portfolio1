import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // The contact form can carry a small picture of the doll look the visitor styled
    serverActions: { bodySizeLimit: "2mb" },
  },
};

export default nextConfig;
