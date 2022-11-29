/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['uploads.mangadex.org']
  },
  async rewrites() {
    return [{
      source: '/api/:path*',
      destination: 'https://api.mangadex.org/:path*'
    },
    {
      source: '/popular',
      destination: 'https://api.jikan.moe/v4/top/manga'
    }
  ]
  }
}

module.exports = nextConfig
