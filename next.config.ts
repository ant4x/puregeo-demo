import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [256, 384],
  },
};

export default nextConfig;
