/**
 * 所有文章的统计汇总
 * GET /api/all → { "/posts/hello-world/": { views, lastVisit }, ... }
 */
export async function onRequestGet({ env }) {
  const list = await env.BLOG_STATS.list({ prefix: "v:", limit: 1000 });

  const entries = await Promise.all(
    list.keys.map(async (key) => {
      const path = key.name.slice(2);
      const views = Number(await env.BLOG_STATS.get(key.name)) || 0;
      const lastVisit = Number(await env.BLOG_STATS.get(`t:${path}`)) || 0;
      return [path, { views, lastVisit }];
    }),
  );

  return Response.json(
    { stats: Object.fromEntries(entries) },
    { headers: { "cache-control": "no-store" } },
  );
}
