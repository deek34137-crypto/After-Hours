/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.shopify.com",
      "prod-img.thesouledstore.com",
      "thesouledstore.com"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "prod-img.thesouledstore.com",
      },
      {
        protocol: "https",
        hostname: "thesouledstore.com",
      },
    ],
  },
  transpilePackages: ["framer-motion"],
};

module.exports = nextConfig;
