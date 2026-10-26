import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from localhost and public paths
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
