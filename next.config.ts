import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL
  },
  transpilePackages: ['antd', '@ant-design/icons'],
  experimental: {
    optimizePackageImports: ['antd', '@ant-design/icons']
  }
};

export default nextConfig;
