import Link from "next/link";
import type { CSSProperties } from "react";
import type { PostMeta } from "@/lib/posts";

export function PostCard({
  post,
  style,
}: {
  post: PostMeta;
  style?: CSSProperties;
}) {
  return (
    <li className="animate-fade-up" style={style}>
      <Link
        href={`/posts/${post.slug}/`}
        className="glass glass-lift group block rounded-2xl px-5 py-5"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-[17px] font-medium leading-snug transition-colors duration-200 group-hover:text-[var(--page-accent)]">
            {post.title}
          </h3>
          <time
            dateTime={post.date}
            className="shrink-0 pt-0.5 font-mono text-[10.5px] tabular-nums text-[var(--page-muted)]"
          >
            {post.date}
          </time>
        </div>

        {post.summary ? (
          <p className="mt-2 line-clamp-2 text-[13.5px] leading-7 text-[var(--page-muted)]">
            {post.summary}
          </p>
        ) : null}

        <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--page-line)] px-2 py-0.5 font-mono text-[10px] text-[var(--page-muted)]"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto font-mono text-[10px] text-[var(--page-muted)]">
            {post.readingTime} min
          </span>
        </div>
      </Link>
    </li>
  );
}
