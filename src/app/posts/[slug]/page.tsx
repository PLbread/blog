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
    <article className="mx-auto w-full max-w-3xl">
      <header className="animate-fade-up mb-9">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[13px] text-[var(--page-muted)] transition-colors hover:text-[var(--page-accent)]"
        >
          ← 返回文章列表
        </Link>

        <h1 className="font-serif text-[2.2rem] font-semibold leading-[1.25] tracking-tight sm:text-[3.1rem]">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-3.5 gap-y-2 font-mono text-[13px] text-[var(--page-muted)]">
          <time dateTime={post.date} className="tabular-nums">
            {post.date}
          </time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} 分钟阅读</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--page-line)] px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="glass animate-fade-up rounded-3xl bg-white/70 px-7 py-10 sm:px-11 sm:py-12 dark:bg-[#0b0d16]/60">
        <div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--page-accent)]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      <footer className="mt-9 flex items-center justify-between">
        <Link
          href="/"
          className="glass glass-lift rounded-full px-5 py-2.5 font-mono text-[13px] text-[var(--page-muted)] transition-colors hover:text-[var(--page-accent)]"
        >
          ← 全部文章
        </Link>
        <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--page-muted)]">
          END
        </span>
      </footer>
    </article>
  );
}
