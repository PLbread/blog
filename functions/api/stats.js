/**
 * 单篇文章统计
 * GET /api/stats?path=/posts/hello-world/
 */
export async function onRequestGet({ request, env }) {
  const path = new URL(request.url).searchParams.get("path") || "";

  if (!path.startsWith("/")) {
    return Response.json({ error: "invalid path" }, { status: 400 });
  }

  const views = Number(await env.BLOG_STATS.get(`v:${path}`)) || 0;
  const lastVisit = Number(await env.BLOG_STATS.get(`t:${path}`)) || 0;

  return Response.json(
    { path, views, lastVisit },
    { headers: { "cache-control": "no-store" } },
  );
}
