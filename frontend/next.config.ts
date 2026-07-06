import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloud Run Dockerfile (copies .next/standalone)
  output: "standalone",
  // Proxy /api/* to backend in local dev only
  // In production (Cloud Run), the frontend calls the backend URL directly via NEXT_PUBLIC_API_BASE_URL
  async rewrites() {
    // Only apply rewrites in local dev (not in production Cloud Run)
    if (process.env.NODE_ENV === "production") return [];
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
