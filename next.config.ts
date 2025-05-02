import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.purrfecto.design',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.purrfecto.design',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ["lon1.digitaloceanspaces.com"],
  },
};

export default nextConfig;
