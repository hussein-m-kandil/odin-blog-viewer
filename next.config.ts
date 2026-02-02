import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 95, 100],
    remotePatterns: [{ hostname: '*' }],
  },
};

export default nextConfig;
