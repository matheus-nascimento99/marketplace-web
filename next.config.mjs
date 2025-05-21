/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3333',
      },
    ],
  },
}

export default nextConfig
