/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Mapbox GL configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': 'mapbox-gl',
    };
    return config;
  },
  images: {
    domains: ['www.tfl.gov.uk'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Configure compiler options for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    // !! WARN !!
    // During development, type checking is handled by the IDE
    // This is only for production builds
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig; 