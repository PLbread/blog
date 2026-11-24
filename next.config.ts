import type { NextConfig } from "next";

/**
 * GitHub Pages 是纯静态托管，所以必须用静态导出（output: "export"）。
 *
 * 部署路径有两种情况：
 * 1. 仓库名形如 `<用户名>.github.io` → 站点根路径，PAGES_BASE_PATH 留空。
 * 2. 普通仓库（例如 `blog`）→ 站点在 `https://<用户名>.github.io/blog/`，
 *    此时需要 PAGES_BASE_PATH=/blog。
 *
 * 本地开发留空即可；GitHub Actions 里会通过环境变量注入。
 */
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
