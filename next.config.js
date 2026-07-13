/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Docker standalone output
  output: 'standalone',
  // Images configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
  // GitHub Pages configuration
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig
