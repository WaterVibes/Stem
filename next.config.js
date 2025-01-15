/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  }
};

module.exports = nextConfig; 