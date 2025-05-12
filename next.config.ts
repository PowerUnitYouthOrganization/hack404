import type { NextConfig } from "next";

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
	webpack(config: import("webpack").Configuration) {
		config.module?.rules?.push({
			test: /^.*\.glsl$/,
			use: "raw-loader",
		});
		return config;
	},
};

export default nextConfig;
