import type { NextConfig } from "next";
import withPWA from "next-pwa";
import type { Configuration } from "webpack";


const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    turbo: {
      rules: {
        "*.{glsl,vs,fs,vert,frag}": {
          loaders: ["raw-loader"],
          as: "*.ts",
        },
      },
    },
  },
  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /^.*\.glsl$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);