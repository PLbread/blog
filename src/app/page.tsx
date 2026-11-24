import { Avatar } from "@/components/Avatar";
import { PostCard } from "@/components/PostCard";
import { TagCloud } from "@/components/TagCloud";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const year = new Date().getFullYear();

  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  const tags = [...tagMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <div>
      {/* Hero */}
      <section className="animate-fade-up mb-16">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-9">
          <Avatar size={128} />

          <div className="min-w-0">
            <h1 className="font-serif text-[2.6rem] font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              {site.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[17px] leading-9 text-[var(--page-muted)]">
              {site.tagline}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="glass glass-lift inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
            </svg>
            GitHub
          </a>

          <a
            href={`mailto:${site.email}`}
            className="glass glass-lift inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13.5px]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
              <path d="m3.5 6.5 8.5 6 8.5-6" />
            </svg>
            Email
          </a>

          <span className="ml-auto font-mono text-xs text-[var(--page-muted)]">
            {posts.length} 篇文章 · {year}
          </span>
        </div>
      </section>

      {/* 主内容 + 侧栏 */}
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section>
          <div className="mb-6 flex items-center gap-3">
            <h2 className="font-serif text-2xl font-medium">文章</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--page-line)] to-transparent" />
          </div>

          {posts.length === 0 ? (
            <div className="glass rounded-2xl px-6 py-10 text-center text-[15px] leading-8 text-[var(--page-muted)]">
              还没有文章。在{" "}
              <code className="font-mono text-[var(--page-fg)]">content/posts/</code> 里新建一个{" "}
              <code className="font-mono text-[var(--page-fg)]">.md</code> 文件就能发布。
            </div>
          ) : (
            <ul className="space-y-5">
              {posts.map((post, index) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={index}
                  style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                />
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <TagCloud tags={tags} />

          <div className="glass rounded-2xl p-6">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
              现在
            </h3>
            <ul className="mt-4 space-y-3">
              {site.now.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[15px] leading-7 text-[var(--page-muted)]"
                >
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
