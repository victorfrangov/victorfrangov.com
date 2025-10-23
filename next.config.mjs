import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Help Netlify with ESM/CJS interop (fixes a3.snapshot issues)
  experimental: {
    esmExternals: 'loose',
  },
  // Ensure a single compiled copy of these deps
  transpilePackages: ['vaul', 'valtio'],

  // Your existing options
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
}

export default withNextIntl(nextConfig)