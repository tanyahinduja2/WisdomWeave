const { default: build } = require('next/dist/build')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  distDir: build,
}

module.exports = nextConfig

