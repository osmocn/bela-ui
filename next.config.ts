import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withMDX = createMDX({
  // customize the config file path
  // configPath: "source.config.ts"
});

export default withMDX(nextConfig);
