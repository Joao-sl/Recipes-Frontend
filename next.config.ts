import { API_DOMAIN } from '@/lib/config';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${API_DOMAIN}/media/avatars/**`)],
  },
};

export default nextConfig;
