/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Other Next.js configuration options can be added here.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
   webpack: (config) => {
      config.resolve.alias.canvas = false;
    
      return config;
    },
};

export default nextConfig;
