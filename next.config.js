require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.wired.com', 'i.kinja-img.com'],
  },
  env: {
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
  
}

module.exports = nextConfig;

