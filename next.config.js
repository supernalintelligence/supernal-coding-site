/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['supernal.ai']
  },
  experimental: {
    mdxRs: false
  }
};

module.exports = nextConfig;
