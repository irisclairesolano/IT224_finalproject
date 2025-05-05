import type { NextConfig } from "next";
import type { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  webpack: (config: webpack.Configuration, { dev, isServer }) => {
    // Add SVGR loader
    config.module?.rules?.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Optional: Disable cache in development if experiencing issues
    if (dev) {
      config.cache = false;
    }

    return config;
  },
};

export default nextConfig;