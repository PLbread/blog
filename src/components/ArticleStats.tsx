"use client";

import { useEffect, useState } from "react";

/** 把毫秒时间戳转成「x 分钟前」 */
function timeAgo(ts: number): string {
  if (!ts) return "";
  const diff = Math.max(0, Date.now() - ts);
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min} 分钟前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} 小时前`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} 天前`;
  return new Date(ts).toLocaleDateString("zh-CN");
}

/**
 * 文章页的浏览统计：进入页面时上报一次，然后显示累计浏览量和最近浏览时间。
 * 如果接口不可用（例如部署在 GitHub Pages），组件静默渲染为空，不影响页面。
 */
export function ArticleStats({ path, basePath }: { path: string; basePath: string }) {
  const [stats, setStats] = useState<{ views: number; lastVisit: number } | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${basePath}/api/hit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ path }),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        // 本次访问就是最近一次浏览
        setStats({ views: data.views ?? 0, lastVisit: Date.now() });
      })
      .catch(() => {
        /* 静默失败 */
      });

    return () => {
      cancelled = true;
    };
  }, [path, basePath]);

  if (!stats) return null;

  return (
    <>
      <span aria-hidden="true">·</span>
      <span>{stats.views} 次浏览</span>
      <span aria-hidden="true">·</span>
      <span>最近浏览 {timeAgo(stats.lastVisit)}</span>
    </>
  );
}
