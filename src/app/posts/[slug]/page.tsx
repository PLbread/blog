import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";

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
      <header className="animate-fade-up mb-8">
        <Link
          href="/"
          className="mb-7 inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--page-muted)] transition-colors hover:text-[var(--page-accent)]"
        >
          ← 返回文章列表
        </Link>

        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-[2.6rem]">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10.5px] text-[var(--page-muted)]">
          <time dateTime={post.date} className="tabular-nums">
            {post.date}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--page-line)] px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="glass animate-fade-up rounded-3xl bg-white/70 px-6 py-8 sm:px-9 sm:py-10 dark:bg-[#0b0d16]/60">
        <div
          className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--page-accent)]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      <footer className="mt-8 flex items-center justify-between">
        <Link
          href="/"
          className="glass rounded-full px-4 py-2 font-mono text-[11px] text-[var(--page-muted)] transition-colors hover:text-[var(--page-accent)]"
        >
          ← 全部文章
        </Link>
        <span className="font-mono text-[10px] text-[var(--page-muted)]">
          END
        </span>
      </footer>
    </article>
  );
}
