# PLbread 的博客

基于 **Next.js 16 + Tailwind CSS 4** 的静态博客，文章用 Markdown 编写，部署在 **GitHub Pages**。

## 技术栈

| 部分 | 选型 |
| --- | --- |
| 框架 | Next.js 16（App Router，静态导出） |
| 样式 | Tailwind CSS 4 + `@tailwindcss/typography` |
| 内容 | Markdown + `gray-matter` 解析 frontmatter |
| 渲染 | `unified` + `remark-gfm` + `rehype-highlight` |
| 部署 | GitHub Actions → GitHub Pages |

## 本地开发

```bash
pnpm install      # 安装依赖
pnpm dev          # 开发模式，访问 http://localhost:3000
pnpm build        # 构建静态站点，产物在 out/
pnpm preview      # 预览构建产物，访问 http://localhost:3000
```

> `pnpm preview` 依赖 `serve`，已作为开发依赖安装。

## 目录结构

```
.
├── content/posts/            # 文章目录，一个 .md 文件就是一篇文章
├── src/
│   ├── app/
│   │   ├── layout.tsx        # 全站布局（页头、页脚）
│   │   ├── page.tsx          # 首页：文章列表
│   │   ├── about/page.tsx    # 关于页
│   │   ├── posts/[slug]/     # 文章详情页
│   │   └── globals.css       # 全局样式与代码高亮配色
│   ├── components/           # 页头、页脚、文章卡片
│   └── lib/
│       ├── posts.ts          # 读取 Markdown、生成 HTML
│       └── site.ts           # ★ 站点配置（名字、简介、链接）
├── .github/workflows/deploy.yml  # 自动部署工作流
└── next.config.ts            # 静态导出与 basePath 配置
```

## 写一篇新文章

在 `content/posts/` 下新建一个 `.md` 文件，文件名就是 URL 里的 slug。例如 `content/posts/my-first-post.md` 会生成 `/posts/my-first-post/`。

文件开头必须有一段 frontmatter：

```yaml
---
title: "文章标题"
date: 2026-11-24
summary: "一句话摘要，显示在列表里。"
tags: ["标签一", "标签二"]
---

正文从这里开始，支持 Markdown 与 GFM 扩展。
```

| 字段 | 是否必填 | 说明 |
| --- | --- | --- |
| `title` | 必填 | 文章标题 |
| `date` | 必填 | 格式 `YYYY-MM-DD`，列表按此倒序 |
| `summary` | 建议 | 列表页摘要，同时作为 SEO description |
| `tags` | 可选 | 字符串数组 |

写完保存，`pnpm dev` 下刷新页面即可看到；提交推送后网站会自动更新。

## 修改站点信息

几乎所有个人信息都集中在 [`src/lib/site.ts`](src/lib/site.ts)：

```ts
export const site = {
  name: "PLbread 的博客",        // 站点名
  author: "PLbread",            // 页头显示的名字
  tagline: "……",                // 首页大标题下的简介
  description: "……",            // 搜索描述
  url: "https://your-name.github.io",  // ★ 部署后改成真实地址
  github: "https://github.com/PLbread",
  email: "hello@example.com",
  nav: [ /* 导航项 */ ],
};
```

「关于」页的正文在 `src/app/about/page.tsx` 里，直接改文字即可。

## 部署到 GitHub Pages

### 1. 创建仓库

在 GitHub 新建一个**空仓库**（不要勾选 README、.gitignore、license），名字二选一：

| 仓库名 | 站点地址 | 说明 |
| --- | --- | --- |
| `blog` | `https://<用户名>.github.io/blog/` | 普通仓库，部署在子路径 |
| `<用户名>.github.io` | `https://<用户名>.github.io/` | 根路径，地址更短 |

两种都可以，工作流会自动判断要不要加 `/blog` 这类路径前缀。

### 2. 推送代码

在项目根目录执行（把地址换成你的仓库）：

```bash
git init
git add .
git commit -m "init: 博客骨架"
git branch -M main
git remote add origin https://github.com/<用户名>/<仓库名>.git
git push -u origin main
```

### 3. 开启 Pages

进入仓库 **Settings → Pages**，在 **Build and deployment** 下把 **Source** 改成 **GitHub Actions**（不要选 Deploy from a branch）。

### 4. 等待上线

打开仓库的 **Actions** 标签页，会看到 `Deploy to GitHub Pages` 正在运行。第一次大约 1~2 分钟，结束后访问上表中的地址即可。

之后每次 `git push` 到 `main` 分支都会自动重新构建发布。

## 常见问题

**页面能打开但没有样式，或控制台一堆 404？**

`basePath` 没对上。检查两件事：工作流里是否设置了 `PAGES_BASE_PATH`；仓库名是否形如 `<用户名>.github.io`（这种不需要前缀）。工作流已按仓库名自动处理，一般不用手动改。

**图片不显示？**

图片放在 `public/` 目录下，引用时要手动带上 basePath，因为 `public` 里的静态资源不走 Next.js 的路由处理：

```tsx
const basePath = process.env.PAGES_BASE_PATH ?? "";
<img src={`${basePath}/avatar.png`} alt="头像" />
```

**`_next` 目录被忽略，样式全丢？**

这是 Jekyll 的行为。用本仓库的 Actions 部署不会触发；如果改成「Deploy from a branch」模式，需要确保 `out/.nojekyll` 存在（工作流里已经自动创建）。

**想换主题色或字体？**

改 `src/app/globals.css` 顶部的 `@theme` 和 `:root` 变量。

## 命令速查

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 本地开发，热更新 |
| `pnpm build` | 生成静态站点到 `out/` |
| `pnpm preview` | 预览 `out/` 里的构建结果 |
