/**
 * 首次进入站点时的加载遮罩。
 * 纯 CSS 驱动（无需 JS）：约 0.9s 后开始淡出，0.5s 淡出完毕并隐藏。
 * 由于 Next.js 的 App Router 在站内跳转时不会重新挂载 layout，
 * 所以它只在首次进入 / 刷新时出现一次。
 */
export function Preloader() {
  const basePath = process.env.PAGES_BASE_PATH ?? "";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f6fb] dark:bg-[#07080d]"
      style={{ animation: "preloader-out 0.5s ease-in 0.9s forwards" }}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="relative h-28 w-28">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-50 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${basePath}/loader.jpg`}
            alt=""
            width={112}
            height={112}
            className="relative h-28 w-28 rounded-full border-2 border-white/80 object-cover shadow-[0_18px_50px_rgba(124,58,237,0.45)] dark:border-white/20"
          />
        </div>

        <div className="h-1.5 w-52 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ animation: "loading-bar 1s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
          />
        </div>

        <span className="font-mono text-[12.5px] tracking-[0.5em] text-[var(--page-muted)]">
          LOADING
        </span>
      </div>
    </div>
  );
}
