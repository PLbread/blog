import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

/** 把 frontmatter 里的日期统一成 YYYY-MM-DD 字符串（gray-matter 可能已解析成 Date） */
function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value.trim().slice(0, 10);
  }
  return "";
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value
      .split(/[,，\s]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

/** 粗略统计字数：中日韩字符按字计，拉丁文按词计 */
function countWords(text: string): number {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1");
  const cjk = (cleaned.match(/[\u3040-\u30ff\u4e00-\u9fff]/g) ?? []).length;
  const latin = (cleaned.match(/[A-Za-z0-9]+/g) ?? []).length;
  return cjk + latin;
}

function estimateReadingTime(text: string): number {
  return Math.max(1, Math.round(countWords(text) / 350));
}

function listPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

function readRaw(slug: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`找不到文章文件：${filePath}`);
  }
  const file = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(file);
  return { data: data as Record<string, unknown>, content };
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" && data.title.trim() !== "" ? data.title : slug,
    date: normalizeDate(data.date),
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: normalizeTags(data.tags),
    readingTime: estimateReadingTime(content),
  };
}

/** 所有文章的元信息，按日期倒序（最新的在前） */
export function getAllPosts(): PostMeta[] {
  return listPostFiles()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data, content } = readRaw(slug);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1;
      return a.slug.localeCompare(b.slug);
    });
}

/** 静态导出需要的路由参数 */
export function getAllSlugs(): string[] {
  return listPostFiles().map((file) => file.replace(/\.md$/, ""));
}

/**
 * Markdown → HTML 的完整管线。
 * 依次经过：解析 → GFM 扩展 → 转 HTML → 代码高亮 → 序列化。
 */
const markdownToHtml = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeHighlight, { detect: false, ignoreMissing: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

/** 单篇文章：元信息 + 渲染好的 HTML */
export async function getPostBySlug(slug: string): Promise<Post> {
  const { data, content } = readRaw(slug);
  const processed = await markdownToHtml.process(content);

  return {
    ...toMeta(slug, data, content),
    contentHtml: processed.toString(),
  };
}

/** 把 YYYY-MM-DD 渲染成「2026 年 11 月 24 日」，纯字符串处理，避免水合不一致 */
export function formatDate(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return date;
  const [, year, month, day] = match;
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}
