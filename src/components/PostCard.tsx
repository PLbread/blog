import Link from "next/link";
import type { CSSProperties } from "react";
import type { PostMeta } from "@/lib/posts";

export function PostCard({
  post,
  index,
  style,
}: {
  post: PostMeta;
  index: number;
  style?: CSSProperties;
}) {
  return (
    <li className="animate-fade-up" style={style}>
      <Link
        href={`/posts/${post.slug}/`}
        className="glass glass-lift group relative block overflow-hidden rounded-2xl px-6 py-6"
      >
        {/* 悬停时左侧浮现的渐变强调条 */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-[12px] tabular-nums text-[var(--page-muted)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-xl font-medium leading-snug transition-colors duration-200 group-hover:text-[var(--page-accent)] sm:text-[22px]">
              {post.title}
            </h3>
          </div>
          <time
            dateTime={post.date}
            className="shrink-0 pt-1.5 font-mono text-[12px] tabular-nums text-[var(--page-muted)]"
          >
            {post.date}
          </time>
        </div>

        {post.summary ? (
          <p className="mt-3 line-clamp-2 pl-8 text-[15.5px] leading-[1.85] text-[var(--page-muted)]">
            {post.summary}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-2 pl-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--page-line)] px-2.5 py-1 font-mono text-[11.5px] text-[var(--page-muted)]"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto font-mono text-[11.5px] text-[var(--page-muted)]">
            {post.readingTime} 分钟
          </span>
        </div>
      </Link>
    </li>
  );
}
