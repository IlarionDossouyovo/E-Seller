/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages configuration
  output: 'export',
  trailingSlash: true,
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
  // GitHub Pages assetPrefix
  basePath: process.env.GITHUB_PAGES === 'true' ? '/E-Seller' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/E-Seller' : '',
}

module.exports = nextConfig
