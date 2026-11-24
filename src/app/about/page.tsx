import type { Metadata } from "next";
import { Avatar } from "@/components/Avatar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
};

const focus = ["前端工程", "工具链", "效率工具", "阅读与写作"];
const stack = ["Next.js 16", "Tailwind CSS 4", "Markdown", "GitHub Pages"];

export default function AboutPage() {
  return (
    <div>
      <header className="animate-fade-up mb-10 flex items-center gap-6">
        <Avatar size={88} />
        <div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            关于我
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-[var(--page-muted)]">
            about
          </p>
        </div>
      </header>

      {/* 正文 + 联系方式 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass animate-fade-up space-y-6 rounded-3xl bg-white/70 px-8 py-10 text-[17px] leading-[1.95] text-[var(--page-muted)] lg:col-span-2 dark:bg-[#0b0d16]/60">
          <p>
            你好，我是{" "}
            <span className="font-serif text-lg text-[var(--page-fg)]">{site.author}</span>。
            这里是我的个人博客，用来记录技术笔记、阅读摘要，以及一些还没想清楚的问题。
          </p>

          <p>
            我平时关注前端工程、工具链和一些效率类的东西，但也会写别的。
            写作对我来说是一种整理思路的方式——把一个模糊的想法写成文章，
            它往往就没那么模糊了。
          </p>

          <p>
            这个站点用 Next.js 静态导出，文章是 Markdown 文件，
            部署在 GitHub Pages 上。没有服务器，也没有数据库，
            所以它足够简单，也足够快。
          </p>
        </div>

        <div className="animate-fade-up space-y-6">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="glass glass-lift flex flex-col gap-2 rounded-2xl px-6 py-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--page-muted)]">
              GitHub
            </span>
            <span className="text-[15.5px] text-[var(--page-accent)]">
              {site.github.replace(/^https?:\/\/(www\.)?/, "")}
            </span>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="glass glass-lift flex flex-col gap-2 rounded-2xl px-6 py-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--page-muted)]">
              Email
            </span>
            <span className="text-[15.5px] text-[var(--page-accent)]">{site.email}</span>
          </a>
        </div>
      </div>

      {/* 底部信息网格 */}
      <div className="animate-fade-up mt-6 grid gap-6 sm:grid-cols-3">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
            关注
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {focus.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--page-line)] px-3 py-1.5 text-[13px] text-[var(--page-muted)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
            正在
          </h3>
          <ul className="mt-4 space-y-2.5">
            {site.now.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[13.5px] leading-6 text-[var(--page-muted)]"
              >
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
            技术栈
          </h3>
          <ul className="mt-4 space-y-2.5">
            {stack.map((item) => (
              <li
                key={item}
                className="font-mono text-[12.5px] leading-6 text-[var(--page-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
