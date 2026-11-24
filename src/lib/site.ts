/**
 * 站点全局配置：想改名字、简介、导航、社交链接，只改这个文件就够了。
 */
export const site = {
  /** 浏览器标签页与页头显示的名字 */
  name: "PLbread 的博客",
  /** 作者名，也用于页头 logo */
  author: "PLbread",
  /** 首页大标题下的一句话简介 */
  tagline: "记录技术笔记、阅读与一些还没想清楚的问题。",
  /** 用于 <meta name="description"> 与分享卡片 */
  description: "PLbread 的个人博客，记录技术笔记与日常思考。",
  /** 线上地址，部署后改成你的真实域名（用于生成绝对链接） */
  url: "https://your-name.github.io",
  /** 社交链接，留空字符串则隐藏 */
  github: "https://github.com/PLbread",
  email: "hello@example.com",
  nav: [
    { href: "/", label: "首页" },
    { href: "/about/", label: "关于" },
  ],
} as const;
