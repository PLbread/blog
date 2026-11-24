import Link from "next/link";
import type { Metadata } from "next";
import { formatDate, getAllSlugs, getPostBySlug } from "@/lib/posts";

/** 只生成 generateStaticParams 里列出的路径，其余一律 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <article>
      <header className="mb-10 border-b border-neutral-200/80 pb-8 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-[13px] text-neutral-400 dark:text-neutral-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} 分钟阅读</span>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          {post.title}
        </h1>

        {post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-100 px-2 py-0.5 text-neutral-600 dark:bg-neutral-800/60 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      <div
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="mt-16 border-t border-neutral-200/80 pt-6 dark:border-neutral-800">
        <Link
          href="/"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← 返回全部文章
        </Link>
      </footer>
    </article>
  );
}
