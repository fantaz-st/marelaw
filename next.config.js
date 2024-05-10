/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "marelaw-be.pfst.hr",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "localhost:3000/",
      },
    ],
  },
};
module.exports = nextConfig;

//marelaw-be.pfst.hr
