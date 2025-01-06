/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "tiketevent.com",
      },
      {
        hostname: "ik.imagekit.io",
      },
      {
        hostname: "randomuser.me",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
