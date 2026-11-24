import type { Metadata } from "next";
import { Avatar } from "@/components/Avatar";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
};

const focus = ["AI", "动画", "游戏", "二次元", "前沿技术"];
const stack = ["Next.js 16", "Tailwind CSS 4", "Markdown", "Cloudflare Pages"];

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
            这里是我的个人博客。
          </p>

          <p>
            今年 22 岁，现在在当普通上班族（姑且可以把我当成程序员）。
            爱好 AI、动画、游戏和二次元文化。
          </p>

          <p>
            游戏玩的挺杂，比较喜欢独游、肉鸽、RPG，常玩的有明日方舟、杀戮尖塔、幻兽帕鲁、泰拉瑞亚等，
            最近在尝试开发一个杀戮尖塔 2 的模组；音乐目前听的比较多的是民谣和术力口，
            伍佰是我很喜欢的歌手。
          </p>

          <p>
            我很关心前沿技术，倾向于拥抱新技术，对 AI 的发展也是持乐观态度
            （虽然 AI 有时候有点呆）。
          </p>

          <p>
            这个 blog 大概用来记录生活，可能是游戏动漫杂谈，也有可能是日常随想，
            也有可能是工作项目记录。
          </p>

          <p>
            如果你想聊聊天，可以发邮件到{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-[var(--page-accent)] underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            。
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
        </div>
      </div>

      {/* 底部信息网格 */}
      <div className="animate-fade-up mt-6 grid gap-6 sm:grid-cols-2">
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
