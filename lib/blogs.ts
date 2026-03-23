import fs from "fs";
import path from "path";

export interface BlogMeta {
  slug: string;
  title: string;
  referenceUrl: string | null;
  coverImage: string | null;
}

export interface Blog extends BlogMeta {
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "assets", "blogs");

function parseMarkdown(raw: string): {
  title: string;
  referenceUrl: string | null;
  coverImage: string | null;
  content: string;
} {
  const lines = raw.split("\n");

  // Extract title — first non-empty line that is a heading or underline-style heading
  let title = "Untitled";
  let titleLineIndex = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("# ")) {
      title = line.replace(/^# /, "").trim();
      titleLineIndex = i;
      break;
    }
    // Setext-style: line followed by ===
    if (
      i + 1 < lines.length &&
      lines[i + 1].trim().match(/^=+$/) &&
      line.length > 0
    ) {
      title = line;
      titleLineIndex = i + 1; // skip the === line too
      break;
    }
  }

  // Strip the title + underline from content
  let contentLines = [...lines];
  if (titleLineIndex >= 0) {
    // Remove from 0 to titleLineIndex inclusive
    contentLines = contentLines.slice(titleLineIndex + 1);
  }
  // Drop leading blank lines after title
  while (contentLines.length > 0 && contentLines[0].trim() === "") {
    contentLines.shift();
  }

  const remaining = contentLines.join("\n");

  // Extract cover image — first ![...](url) occurrence
  const imgMatch = remaining.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const coverImage = imgMatch ? imgMatch[2] : null;

  // Extract reference URL — line like [Reference](url)
  const refMatch = remaining.match(/\[Reference\]\(([^)]+)\)/);
  const referenceUrl = refMatch ? refMatch[1] : null;

  // Build clean content: remove the cover image line and reference line
  const content = remaining
    .split("\n")
    .filter((line) => {
      const t = line.trim();
      if (coverImage && t === `![${imgMatch![1]}](${coverImage})`) return false;
      if (referenceUrl && t === `[Reference](${referenceUrl})`) return false;
      return true;
    })
    .join("\n")
    .trimStart();

  return { title, referenceUrl, coverImage, content };
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort();

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { title, referenceUrl, coverImage } = parseMarkdown(raw);
    return { slug, title, referenceUrl, coverImage };
  });
}

export function getBlogBySlug(slug: string): Blog | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { title, referenceUrl, coverImage, content } = parseMarkdown(raw);
  return { slug, title, referenceUrl, coverImage, content };
}