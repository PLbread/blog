import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <div>
      <header className="animate-fade-up mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          关于我
        </h1>
        <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
          about
        </p>
      </header>

      <div className="glass animate-fade-up space-y-5 rounded-3xl bg-white/70 px-6 py-8 text-[15px] leading-8 text-[var(--page-muted)] sm:px-9 sm:py-10 dark:bg-[#0b0d16]/60">
        <p>
          你好，我是 <span className="font-serif text-[var(--page-fg)]">{site.author}</span>。
          这里是我的个人博客，用来记录技术笔记、阅读摘要，以及一些还没想清楚的问题。
        </p>

        <p>
          我平时关注前端工程、工具链和一些效率类的东西，但也会写别的。
          写作对我来说是一种整理思路的方式——把一个模糊的想法写成文章，
          它往往就没那么模糊了。
        </p>

        <p>如果你想聊聊，可以通过下面的方式找到我。</p>
      </div>

      <ul className="animate-fade-up mt-4 grid gap-3 sm:grid-cols-2">
        <li>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="glass glass-lift flex items-center justify-between rounded-2xl px-5 py-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--page-muted)]">
              GitHub
            </span>
            <span className="text-sm text-[var(--page-accent)]">
              {site.github.replace(/^https?:\/\/(www\.)?/, "")}
            </span>
          </a>
        </li>
        <li>
          <a
            href={`mailto:${site.email}`}
            className="glass glass-lift flex items-center justify-between rounded-2xl px-5 py-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--page-muted)]">
              Email
            </span>
            <span className="text-sm text-[var(--page-accent)]">{site.email}</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
