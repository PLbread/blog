import { PostCard } from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-16">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-50">
          {site.name}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-8 text-neutral-600 dark:text-neutral-400">
          {site.tagline}
        </p>
      </section>

      <section>
        <div className="mb-1 flex items-baseline justify-between border-b border-neutral-200/80 pb-3 dark:border-neutral-800">
          <h2 className="text-[13px] font-medium tracking-widest text-neutral-400 dark:text-neutral-500">
            文章
          </h2>
          <span className="text-[13px] text-neutral-400 dark:text-neutral-500">
            共 {posts.length} 篇
          </span>
        </div>

        {posts.length === 0 ? (
          <p className="py-10 text-sm text-neutral-500">
            还没有文章。在 <code>content/posts/</code> 里新建一个 <code>.md</code> 文件就能发布。
          </p>
        ) : (
          <ul>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
