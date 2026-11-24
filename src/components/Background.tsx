/** 极轻的噪点纹理，避免大面积渐变显得「塑料」 */
const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * 全站背景：渐变底色 + 三个缓慢漂移的模糊光斑 + 噪点。
 * 纯 CSS 实现，不依赖任何图片资源。
 *
 * 想换成自己的壁纸：把图片放到 public/wallpaper.jpg，
 * 然后在本组件里给最外层加上
 *   style={{ backgroundImage: "url(/blog/wallpaper.jpg)" }}
 * 并把下面的渐变层透明度调低即可。
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* 底色渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/70 via-white to-purple-100/60 dark:from-[#0b0d1a] dark:via-[#07080d] dark:to-[#140b1f]" />

      {/* 漂移光斑 */}
      <div className="animate-drift absolute -left-[12%] -top-[18%] h-[48vw] max-h-[640px] w-[48vw] max-w-[640px] rounded-full bg-indigo-400/30 blur-[110px] dark:bg-indigo-600/20" />
      <div className="animate-drift-slow absolute -right-[10%] top-[16%] h-[42vw] max-h-[560px] w-[42vw] max-w-[560px] rounded-full bg-purple-400/25 blur-[110px] dark:bg-purple-700/20" />
      <div className="animate-drift-slower absolute -bottom-[16%] left-[20%] h-[38vw] max-h-[520px] w-[38vw] max-w-[520px] rounded-full bg-sky-400/25 blur-[110px] dark:bg-sky-800/20" />

      {/* 噪点 */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay dark:opacity-[0.06]"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />
    </div>
  );
}
