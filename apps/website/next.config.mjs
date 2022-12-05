import nextMDX from '@next/mdx';
import { withPlaiceholder } from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'tsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/music',
        destination: `/music/brightest-of-days`,
        permanent: false,
      },
    ];
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {},
});

export default withMDX(withPlaiceholder(nextConfig));
