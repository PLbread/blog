import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--glass-border)] bg-white/55 backdrop-blur-xl backdrop-saturate-150 dark:bg-[#0b0d16]/55">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-5 sm:h-[68px] sm:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 font-serif text-[15px] font-semibold text-white shadow-[0_2px_12px_rgba(99,102,241,0.45)] transition-transform duration-300 group-hover:scale-105">
            P
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">
            {site.author}
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-[15px]">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[var(--page-muted)] transition-colors duration-200 hover:bg-white/60 hover:text-[var(--page-fg)] dark:hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
          {site.github ? (
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="ml-1 rounded-full px-3.5 py-2 text-[var(--page-muted)] transition-colors duration-200 hover:bg-white/60 hover:text-[var(--page-fg)] dark:hover:bg-white/10"
            >
              GitHub
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
