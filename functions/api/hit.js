/**
 * 记录一次浏览
 * POST /api/hit  body: { "path": "/posts/hello-world/" }
 */
export async function onRequestPost({ request, env }) {
  let path = "";
  try {
    const body = await request.json();
    path = String(body?.path ?? "").trim();
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }

  if (!path.startsWith("/") || path.length > 200) {
    return Response.json({ error: "invalid path" }, { status: 400 });
  }

  const viewsKey = `v:${path}`;
  const timeKey = `t:${path}`;

  const current = Number(await env.BLOG_STATS.get(viewsKey)) || 0;
  const next = current + 1;

  await Promise.all([
    env.BLOG_STATS.put(viewsKey, String(next)),
    env.BLOG_STATS.put(timeKey, String(Date.now())),
  ]);

  return Response.json(
    { ok: true, views: next },
    { headers: { "cache-control": "no-store" } },
  );
}
