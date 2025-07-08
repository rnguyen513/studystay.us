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
      },
      {
        protocol: "https",
        hostname: "zinuafgdmiwpkvlixboz.supabase.co",
        port: ""
      }
    ]
  },
//   async redirects() {
//     return [
//         {
//             source:"/",
//             destination:"/in",
//             permanent:false
//         }
//     ]
//   },
};

export default nextConfig;