/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cms.tanghulurecipe.com',
      'tanghulurecipe.com',
      'secure.gravatar.com',
      '0.gravatar.com',
      '1.gravatar.com',
      '2.gravatar.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.tanghulurecipe.com',
      },
    ],
  },
  output: 'standalone',
}

module.exports = nextConfig
