/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable static export for API routes compatibility
  // GitHub Pages can host Next.js with SSR via GitHub Actions
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
