/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Required for static export
  },
  // output: 'export', // Static export for Netlify - disabled for API routes
  // trailingSlash: true, // Add trailing slash for Netlify
  // assetPrefix: '', // Ensure assets are served from root
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
