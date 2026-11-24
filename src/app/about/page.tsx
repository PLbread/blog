import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
        关于我
      </h1>

      <div className="mt-8 space-y-6 text-[15px] leading-8 text-neutral-700 dark:text-neutral-300">
        <p>
          你好，我是 {site.author}。这里是我的个人博客，用来记录技术笔记、阅读摘要，
          以及一些还没想清楚的问题。
        </p>

        <p>
          我平时关注前端工程、工具链和一些效率类的东西，但也会写别的。
          写作对我来说是一种整理思路的方式——把一个模糊的想法写成文章，
          它往往就没那么模糊了。
        </p>

        <p>如果你想聊聊，可以通过下面的方式找到我。</p>
      </div>

      <ul className="mt-8 space-y-3 border-t border-neutral-200/80 pt-8 text-sm dark:border-neutral-800">
        <li className="flex gap-3">
          <span className="w-16 shrink-0 text-neutral-400 dark:text-neutral-500">GitHub</span>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {site.github.replace(/^https?:\/\//, "")}
          </a>
        </li>
        <li className="flex gap-3">
          <span className="w-16 shrink-0 text-neutral-400 dark:text-neutral-500">邮箱</span>
          <a href={`mailto:${site.email}`} className="text-blue-600 hover:underline dark:text-blue-400">
            {site.email}
          </a>
        </li>
      </ul>
    </div>
  );
}
