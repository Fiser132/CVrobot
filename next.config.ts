import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sk',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
