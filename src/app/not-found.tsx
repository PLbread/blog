import Link from "next/link";

export default function NotFound() {
  return (
    <div className="animate-fade-up py-24 text-center">
      <p className="text-gradient font-serif text-7xl font-semibold tracking-tight">404</p>
      <p className="mt-5 text-sm text-[var(--page-muted)]">这个页面不存在。</p>
      <Link
        href="/"
        className="glass glass-lift mt-9 inline-block rounded-full px-5 py-2 text-sm"
      >
        返回首页
      </Link>
    </div>
  );
}
