---
title: "用 Next.js 搭一个静态博客"
date: 2026-11-18
summary: "从零搭一个 Next.js 静态博客并部署到 GitHub Pages，包括静态导出的限制和最终的目录结构。"
tags: ["Next.js", "教程"]
---

## 为什么用静态导出

GitHub Pages 只提供静态文件托管，没有 Node.js 运行时。所以 Next.js 必须切换到静态导出模式：

```ts
const nextConfig: NextConfig = {
  output: "export",        // 构建时生成纯静态 HTML
  trailingSlash: true,     // 生成 about/index.html 而非 about.html
  images: { unoptimized: true }, // 图片优化需要服务端，静态导出必须关掉
};
```

开启后，`next build` 会把页面输出到 `out/` 目录，直接丢给任何静态托管都能跑。

需要付出的代价：

- 不能用 `rewrites`、`redirects`、ISR
- 不能用 Route Handlers 处理动态请求
- `next/image` 的自动优化失效

对博客来说这些都不重要。

## 子路径是个坑

如果仓库不叫 `<用户名>.github.io`，站点会部署在子路径下，例如 `https://user.github.io/blog/`。这时必须告诉 Next.js 这个前缀，否则所有 `/ _next/` 资源都会 404。

```ts
const basePath = process.env.PAGES_BASE_PATH ?? "";
```

本地开发时留空，构建时由 CI 注入 `/blog`。

## 文章的读取

文章是普通 Markdown 文件，构建时用 `fs` 读取，frontmatter 用 `gray-matter` 解析：

```ts
const { data, content } = matter(file);
const html = await remark()
  .use(remarkGfm)
  .use(remarkHtml, { rehypePlugins: [rehypeHighlight] })
  .process(content);
```

有个小陷阱：YAML 里的 `date: 2026-11-18` 会被解析成 `Date` 对象，而不是字符串，直接格式化会出问题。所以要统一转换成 `YYYY-MM-DD`。

## 路由生成

文章详情页用动态路由，靠 `generateStaticParams` 在构建时列出所有 slug：

```ts
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
```

配合 `export const dynamicParams = false`，没在列表里的路径直接 404。

## 目录结构

最终的结构很扁平：

| 路径 | 作用 |
| --- | --- |
| `content/posts/` | Markdown 文章 |
| `src/app/` | 页面路由 |
| `src/lib/posts.ts` | 读取与渲染文章 |
| `src/lib/site.ts` | 站点配置 |
| `out/` | 构建产物，不提交 |

## 部署清单

- [x] 配置 `output: "export"`
- [x] 处理 `basePath`
- [x] 添加 `.nojekyll`，否则 `_next` 目录会被 Jekyll 忽略
- [x] GitHub Actions 自动构建并发布

最后一条特别容易忘：GitHub Pages 默认跑 Jekyll，它会忽略以下划线开头的文件和目录，而 Next.js 的静态资源恰好全在 `_next/` 下。没有 `.nojekyll`，页面能打开但样式和脚本全丢。
