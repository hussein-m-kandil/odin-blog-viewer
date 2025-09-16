import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 95, 100],
    remotePatterns: [
      {
        hostname: 'ndauvqaezozccgtddhkr.supabase.co',
        pathname: '/storage/**',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
