import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow backend API calls from the browser during local development
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
