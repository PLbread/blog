import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mx-auto w-full max-w-4xl px-5 pb-10 sm:px-8">
      <div className="glass rounded-2xl px-6 py-4">
        <div className="flex flex-col items-center justify-between gap-1.5 text-[12px] tracking-wide text-[var(--page-muted)] sm:flex-row">
          <p className="font-mono">
            © {year} {site.author}
          </p>
          <p className="font-mono">Next.js · GitHub Pages</p>
        </div>
      </div>
    </footer>
  );
}
