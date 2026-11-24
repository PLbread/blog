import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.author}
        </p>
        <p className="text-neutral-400 dark:text-neutral-500">
          用 Next.js 构建 · 部署于 GitHub Pages
        </p>
      </div>
    </footer>
  );
}
