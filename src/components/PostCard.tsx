import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <li className="border-b border-neutral-200/80 last:border-0 dark:border-neutral-800">
      <Link href={`/posts/${post.slug}/`} className="group block py-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[17px] font-medium text-neutral-900 transition-colors group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400">
            {post.title}
          </h3>
          <time
            dateTime={post.date}
            className="shrink-0 text-[13px] tabular-nums text-neutral-400 dark:text-neutral-500"
          >
            {formatDate(post.date)}
          </time>
        </div>

        {post.summary ? (
          <p className="mt-2 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            {post.summary}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-neutral-400 dark:text-neutral-500">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-neutral-100 px-2 py-0.5 text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto">{post.readingTime} 分钟阅读</span>
        </div>
      </Link>
    </li>
  );
}
