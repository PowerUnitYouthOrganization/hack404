/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment the following line to build a static site.
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
