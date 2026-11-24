/**
 * 站点全局配置：想改名字、简介、导航、社交链接，只改这个文件就够了。
 */
export const site = {
  /** 浏览器标签页与页头显示的名字 */
  name: "PLbread 的博客",
  /** 作者名，也用于页头 logo */
  author: "PLbread",
  /** 首页大标题下的一句话简介 */
  tagline: "记录游戏、动漫、技术与一些日常随想。",
  /** 用于 <meta name="description"> 与分享卡片 */
  description: "PLbread 的个人博客，记录游戏动漫杂谈、日常随想与工作项目。",
  /** 线上地址，部署后改成你的真实域名（用于生成绝对链接） */
  url: "https://plbread-blog.pages.dev",
  /** 社交链接，留空字符串则隐藏 */
  github: "https://github.com/PLbread",
  email: "1317813686@qq.com",
  nav: [
    { href: "/", label: "首页" },
    { href: "/about/", label: "关于" },
  ],
  /** 首页侧栏「现在」卡片里显示的内容，随便写 */
  now: [
    "在开发一个杀戮尖塔 2 的模组",
    "记录游戏、动漫与日常随想",
  ],
} as const;

export interface MusicTrack {
  title: string;
  artist: string;
  /** 相对路径，指向 public 下的音频文件，例如 "/music/song.mp3" */
  src: string;
}

/**
 * 背景音乐列表。
 *
 * 用法：把 mp3 放进 public/music/ 目录，然后在这里加一行：
 *   { title: "曲名", artist: "作者", src: "/music/song.mp3" },
 *
 * 留空时播放器会显示「暂无音乐」的提示，不会报错。
 */
export const musicTracks: MusicTrack[] = [
  // { title: "示例曲目", artist: "作者名", src: "/music/song.mp3" },
];
