"use client";

import { useEffect, useState } from "react";

type StatsMap = Record<string, { views: number; lastVisit: number }>;

/** 模块级缓存：整个页面只请求一次 /api/all */
let cache: StatsMap | null = null;
let inflight: Promise<StatsMap> | null = null;

function loadAll(basePath: string): Promise<StatsMap> {
  if (!inflight) {
    inflight = fetch(`${basePath}/api/all`)
      .then((res) => (res.ok ? res.json() : { stats: {} }))
      .then((data): StatsMap => {
        const map: StatsMap = data.stats ?? {};
        cache = map;
        return map;
      })
      .catch((): StatsMap => {
        cache = {};
        return {};
      });
  }
  return inflight;
}

/** 首页卡片里的浏览量，接口不可用时返回 null（不渲染） */
export function ViewCount({ path, basePath }: { path: string; basePath: string }) {
  const [views, setViews] = useState<number | null>(cache?.[path]?.views ?? null);

  useEffect(() => {
    let cancelled = false;
    loadAll(basePath).then((map) => {
      if (!cancelled) setViews(map[path]?.views ?? 0);
    });
    return () => {
      cancelled = true;
    };
  }, [path, basePath]);

  if (views === null) return null;

  return <span>{views} 次浏览</span>;
}
