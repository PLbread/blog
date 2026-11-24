import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="text-6xl font-semibold tracking-tight text-neutral-200 dark:text-neutral-800">
        404
      </p>
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">这个页面不存在。</p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        返回首页
      </Link>
    </div>
  );
}
