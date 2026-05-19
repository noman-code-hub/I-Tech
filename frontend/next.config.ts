import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itechdigitals.com",
      },
      {
        protocol: "http",
        hostname: "itechdigitals.com",
      },
    ],
  },
};

export default nextConfig;
