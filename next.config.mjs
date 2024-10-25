/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: ""
      }
    ]
  }
};

export default nextConfig;
