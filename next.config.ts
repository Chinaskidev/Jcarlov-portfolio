import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Jcarlov-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
