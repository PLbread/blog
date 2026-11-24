import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const year = new Date().getFullYear();

  return (
    <div>
      {/* Hero */}
      <section className="animate-fade-up mb-16">
        <div className="flex items-center gap-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 shadow-[0_10px_36px_rgba(124,58,237,0.4)]">
            <span className="font-serif text-3xl font-semibold text-white">
              {site.author.slice(0, 1)}
            </span>
            <span className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-35 blur-xl" />
          </div>

          <div className="min-w-0">
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              {site.name}
            </h1>
            <p className="mt-2.5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--page-muted)]">
              {posts.length} posts · {year}
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-[16.5px] leading-[1.9] text-[var(--page-muted)]">
          {site.tagline}
        </p>
      </section>

      {/* 文章列表 */}
      <section>
        <div className="mb-5 flex items-center gap-3">
          <h2 className="font-serif text-xl font-medium">文章</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[var(--page-line)] to-transparent" />
        </div>

        {posts.length === 0 ? (
          <div className="glass rounded-2xl px-6 py-10 text-center text-[15px] leading-8 text-[var(--page-muted)]">
            还没有文章。在 <code className="font-mono text-[var(--page-fg)]">content/posts/</code>{" "}
            里新建一个 <code className="font-mono text-[var(--page-fg)]">.md</code> 文件就能发布。
          </div>
        ) : (
          <ul className="space-y-4">
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
    </div>
  );
}
