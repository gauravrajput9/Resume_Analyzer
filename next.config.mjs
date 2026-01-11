/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {hostname: "www.jobhero.com"}
    ],
  },
};

export default nextConfig;
