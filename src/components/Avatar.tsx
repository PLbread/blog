export function Avatar({
  size = 96,
  className = "",
  float = true,
  showStatus = true,
}: {
  size?: number;
  className?: string;
  float?: boolean;
  showStatus?: boolean;
}) {
  const basePath = process.env.PAGES_BASE_PATH ?? "";

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 背后的渐变光晕 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 via-violet-400 to-purple-400 opacity-45 blur-lg"
      />

      <div
        className={
          float ? "animate-float relative h-full w-full" : "relative h-full w-full"
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${basePath}/avatar.jpg`}
          alt="头像"
          width={size}
          height={size}
          className="relative h-full w-full rounded-full border-2 border-white/80 object-cover shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition-transform duration-300 hover:scale-105 dark:border-white/20"
        />
      </div>

      {showStatus ? (
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-0 rounded-full border-[2.5px] border-white bg-emerald-400 dark:border-[#0b0d16]"
          style={{
            width: Math.max(11, size * 0.14),
            height: Math.max(11, size * 0.14),
          }}
        />
      ) : null}
    </div>
  );
}
