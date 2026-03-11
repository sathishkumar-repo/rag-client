import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "http://13.60.240.198:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;