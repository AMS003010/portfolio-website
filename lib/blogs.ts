import fs from "fs";
import path from "path";

export interface BlogMeta {
  slug: string;
  title: string;
  date: string | null;
  duration: string | null;
  referenceUrl: string | null;
  coverImage: string | null;
}

export interface Blog extends BlogMeta {
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "assets", "blogs");

function parseMarkdown(raw: string): {
  title: string;
  date: string | null;
  duration: string | null;
  referenceUrl: string | null;
  coverImage: string | null;
  content: string;
} {
  const lines = raw.split("\n");

  // Extract title (setext style: Title\n====)
  let title = "Untitled";
  let titleLineIndex = -1;

  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i + 1].trim().match(/^=+$/) && lines[i].trim().length > 0) {
      title = lines[i].trim();
      titleLineIndex = i;
      break;
    }
  }

  // Start after title + underline
  let contentLines = titleLineIndex >= 0 
    ? lines.slice(titleLineIndex + 2) 
    : [...lines];

  // Drop leading blank lines
  while (contentLines.length > 0 && contentLines[0].trim() === "") {
    contentLines.shift();
  }

  // === Skip Medium metadata until "Listen" + "Share" block ===
  let i = 0;
  let skippedListenShare = false;

  while (i < contentLines.length) {
    const trimmed = contentLines[i].trim();

    // If we hit "Listen" followed shortly by "Share", stop skipping after them
    if (trimmed === "Listen") {
      skippedListenShare = true;
      i++;
      continue;
    }

    if (skippedListenShare && trimmed === "Share") {
      i++; // skip the Share line too
      // Now skip any remaining blank lines after Share
      while (i < contentLines.length && contentLines[i].trim() === "") {
        i++;
      }
      break; // Start keeping content from here onward
    }

    // Skip all typical Medium junk before Listen/Share
    if (
      trimmed === "" ||
      trimmed.includes("resize:fill:64:64") ||   // author avatar
      trimmed.startsWith("[Abhijith M S]") ||
      trimmed.includes("min read") ||
      (trimmed.includes("·") && trimmed.match(/[A-Za-z]+ \d+, \d{4}/)) ||
      trimmed.startsWith("[nameless link]") ||
      trimmed.startsWith("--") ||
      trimmed === "Listen" ||
      trimmed === "Share"
    ) {
      i++;
      continue;
    }

    // If we reach real content before finding Listen/Share, stop skipping
    if (trimmed.length > 20) {
      break;
    }

    i++;
  }

  // Keep everything from this point onward
  contentLines = contentLines.slice(i);

  const remaining = contentLines.join("\n").trim();

  // Extract cover image
  const imgMatch = remaining.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const coverImage = imgMatch ? imgMatch[2] : null;

  // Extract reference URL (if any)
  const refMatch = remaining.match(/\[Reference\]\(([^)]+)\)/);
  const referenceUrl = refMatch ? refMatch[1] : null;

  // Extract duration and date
  let date: string | null = null;
  let duration: string | null = null;

  const metaMatch = raw.match(/(\d+)\s*min read\s*·\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/);
  if (metaMatch) {
    duration = `${metaMatch[1]} min read`;
    date = metaMatch[2];
  }

  // Final content: remove the cover image line from the body (it will be shown separately)
  const content = remaining
    .split("\n")
    .filter((line) => {
      const t = line.trim();
      if (coverImage && t.includes(`](${coverImage})`)) return false;
      if (referenceUrl && t === `[Reference](${referenceUrl})`) return false;
      return true;
    })
    .join("\n")
    .trimStart();

  return { title, date, duration, referenceUrl, coverImage, content };
}

export function getAllBlogs(): BlogMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md"));

  const blogs = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { title, date, duration, referenceUrl, coverImage } = parseMarkdown(raw);
    return { slug, title, date, duration, referenceUrl, coverImage };
  });

  // Sort by date (newest first)
  return blogs.sort((a, b) => {
    if (!a.date && !b.date) return b.slug.localeCompare(a.slug);
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogBySlug(slug: string): Blog | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { title, date, duration, referenceUrl, coverImage, content } = parseMarkdown(raw);
  return { slug, title, date, duration, referenceUrl, coverImage, content };
}