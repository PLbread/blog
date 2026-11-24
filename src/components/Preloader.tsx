/**
 * 首次进入站点时的加载遮罩。
 * 纯 CSS 驱动（无需 JS）：约 0.85s 后开始淡出，0.55s 淡出完毕并隐藏。
 * 由于 Next.js 的 App Router 在站内跳转时不会重新挂载 layout，
 * 所以它只在首次进入 / 刷新时出现一次。
 */
export function Preloader() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f6fb] dark:bg-[#07080d]"
      style={{ animation: "preloader-out 0.5s ease-in 0.8s forwards" }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-40 blur-lg" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 font-serif text-xl font-semibold text-white shadow-lg">
            P
          </div>
        </div>

        <div className="h-[3px] w-28 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
          <div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ animation: "loading-bar 0.95s cubic-bezier(0.4, 0, 0.2, 1) forwards" }}
          />
        </div>

        <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--page-muted)]">
          LOADING
        </span>
      </div>
    </div>
  );
}
