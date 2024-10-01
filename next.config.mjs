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
  };
  
  export default nextConfig;