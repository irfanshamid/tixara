import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "p16-oec-sg.ibyteimg.com",
      },
      {
        protocol: "https",
        hostname: "p16-oec-va.ibyteimg.com",
      },
      {
        protocol: "https",
        hostname: "p16-sign-sg.tiktokcdn.com"
      },
      {
        protocol: "https",
        hostname: "p19-common-sign-useastred.tiktokcdn-eu.com"
      },
      {
        protocol: "https",
        hostname: "p16-sign-va.tiktokcdn.com"
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
