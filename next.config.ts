import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
