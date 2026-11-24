import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const year = new Date().getFullYear();

  return (
    <div>
      {/* Hero */}
      <section className="animate-fade-up mb-14">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 shadow-[0_8px_28px_rgba(124,58,237,0.35)] sm:h-[72px] sm:w-[72px]">
            <span className="font-serif text-2xl font-semibold text-white sm:text-[26px]">
              {site.author.slice(0, 1)}
            </span>
            <span className="absolute -inset-1.5 -z-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-35 blur-lg" />
          </div>

          <div className="min-w-0">
            <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {site.name}
            </h1>
            <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
              {posts.length} posts · {year}
            </p>
          </div>
        </div>

        <p className="mt-7 max-w-xl text-[15px] leading-8 text-[var(--page-muted)]">
          {site.tagline}
        </p>
      </section>

      {/* 文章列表 */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="font-serif text-lg font-medium">文章</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--page-line)] to-transparent" />
        </div>

        {posts.length === 0 ? (
          <div className="glass rounded-2xl px-5 py-8 text-center text-sm text-[var(--page-muted)]">
            还没有文章。在 <code className="font-mono">content/posts/</code> 里新建一个{" "}
            <code className="font-mono">.md</code> 文件就能发布。
          </div>
        ) : (
          <ul className="space-y-3">
            {posts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
