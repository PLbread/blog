"use client";

import { useRef, useState, type MouseEvent } from "react";
import type { MusicTrack } from "@/lib/site";

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** 播放中跳动的音柱 */
function Equalizer() {
  return (
    <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[2.5px] rounded-full bg-current"
          style={{
            animation: `equalizer 0.85s ease-in-out ${i * 0.12}s infinite`,
            height: "100%",
          }}
        />
      ))}
    </span>
  );
}

export function MusicPlayer({ tracks }: { tracks: MusicTrack[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  const track = tracks[index] ?? null;
  const hasTracks = tracks.length > 0;

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) {
      audio
        .play()
        .then(() => setFailed(false))
        .catch(() => setFailed(true));
    } else {
      audio.pause();
    }
  }

  function changeTrack(delta: number) {
    if (!hasTracks) return;
    const next = (index + delta + tracks.length) % tracks.length;
    setIndex(next);
    setCurrent(0);
    setFailed(false);
    // 切歌后如果之前在播放，继续播放
    if (playing) {
      requestAnimationFrame(() => {
        audioRef.current?.play().catch(() => setFailed(true));
      });
    }
  }

  function seek(event: MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = audio.duration * ratio;
  }

  const progress = duration > 0 ? Math.min(1, current / duration) : 0;

  return (
    <div className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6">
      {/* 展开面板 */}
      <div
        className={`mb-3 w-[272px] origin-bottom-left transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="glass overflow-hidden rounded-2xl p-4">
          {hasTracks && track ? (
            <>
              <div className="flex items-center gap-3">
                {/* 旋转唱盘 */}
                <div className="relative h-11 w-11 shrink-0">
                  <div
                    className={`h-11 w-11 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 p-[3px] ${
                      playing ? "animate-spin-slow" : ""
                    }`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-black/20 text-white">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-[15px] font-medium leading-tight">
                    {track.title}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10.5px] text-[var(--page-muted)]">
                    {track.artist}
                  </p>
                </div>
              </div>

              {/* 进度条 */}
              <div
                role="slider"
                tabIndex={0}
                aria-label="播放进度"
                aria-valuenow={Math.round(progress * 100)}
                onClick={seek}
                onKeyDown={() => {}}
                className="group mt-4 cursor-pointer py-1.5"
              >
                <div className="h-1 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-[width] duration-150"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between font-mono text-[10px] tabular-nums text-[var(--page-muted)]">
                  <span>{formatTime(current)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* 控制按钮 */}
              <div className="mt-1 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => changeTrack(-1)}
                  aria-label="上一首"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--page-muted)] transition-colors hover:bg-white/60 hover:text-[var(--page-fg)] dark:hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 5h2v14H6zm3.5 7L18 5v14z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={playing ? "暂停" : "播放"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-[0_4px_16px_rgba(99,102,241,0.45)] transition-transform hover:scale-105 active:scale-95"
                >
                  {playing ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 5h4v14H7zm6 0h4v14h-4z" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4l13 8-13 8z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => changeTrack(1)}
                  aria-label="下一首"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--page-muted)] transition-colors hover:bg-white/60 hover:text-[var(--page-fg)] dark:hover:bg-white/10"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 5h2v14h-2zM6 5l8.5 7L6 19z" />
                  </svg>
                </button>
              </div>

              {failed ? (
                <p className="mt-2 text-center font-mono text-[10px] text-rose-500">
                  音频加载失败，检查文件路径
                </p>
              ) : null}
            </>
          ) : (
            <div className="py-2 text-center">
              <p className="font-serif text-sm">暂无音乐</p>
              <p className="mt-2 text-[11.5px] leading-5 text-[var(--page-muted)]">
                把 mp3 放进 <code className="font-mono">public/music/</code>
                <br />
                再到 <code className="font-mono">src/lib/site.ts</code> 里添加一行
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 触发按钮 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "收起播放器" : "打开播放器"}
        aria-expanded={open}
        className="glass flex h-12 w-12 items-center justify-center rounded-full text-[var(--page-fg)] shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {playing ? (
          <Equalizer />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
          </svg>
        )}
      </button>

      {track ? (
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => {
            if (tracks.length > 1) changeTrack(1);
            else {
              setPlaying(false);
              setCurrent(0);
            }
          }}
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
