import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // pCloud Drive (P:\) doesn't support POSIX readlink — disable symlink resolution
    config.resolve.symlinks = false
    return config
  },
}

export default nextConfig
