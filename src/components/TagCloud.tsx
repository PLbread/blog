export interface TagCount {
  name: string;
  count: number;
}

export function TagCloud({ tags }: { tags: TagCount[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--page-muted)]">
        标签
      </h3>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--page-line)] px-3 py-1.5 text-[13.5px] text-[var(--page-muted)] transition-colors hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]"
          >
            {tag.name}
            <span className="font-mono text-[10.5px] opacity-60">{tag.count}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
