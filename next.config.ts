import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/docs.md",
        destination: "/docs-md",
      },
      {
        source: "/docs/:path*.md",
        destination: "/docs-md/:path*",
      },
    ];
  },
};

const withMDX = createMDX({
  // customize the config file path
  // configPath: "source.config.ts"
});

export default withMDX(nextConfig);
