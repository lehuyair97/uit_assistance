import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.uit.edu.vn',
      },
      {
        protocol: 'https',
        hostname: 'uit.edu.vn',
      },
      {
        protocol: 'https',
        hostname: 'tuyensinh.uit.edu.vn',
      },
      {
        protocol: 'https',
        hostname: 'portal.uit.edu.vn',
      },
    ],
  },
};

export default nextConfig;
