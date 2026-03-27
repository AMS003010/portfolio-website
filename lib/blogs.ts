import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface BlogMeta {
  slug: string;           // e.g. "dockerizing-a-rust-application-with-multi-stage-builds-7e9dab"
  title: string;
  date: string | null;
  duration: string | null;
  referenceUrl: string | null;
  coverImage: string | null;
  fileSlug: string;       // original filename without .md (for internal file lookup)
}

export interface Blog extends BlogMeta {
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "assets", "blogs");

// Convert title to clean URL slug + short unique hash
// Convert title to clean URL slug + short unique hash (using title + date)
function slugify(title: string, date: string | null): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")     // remove special characters
    .replace(/\s+/g, "-")             // replace spaces with -
    .replace(/-+/g, "-")              // collapse multiple dashes
    .replace(/^-|-$/g, "");           // trim leading/trailing dashes

  // Create hash seed from title + date (date makes it more unique)
  const seed = date ? `${title}-${date}` : title;

  // Generate short unique hash (first 6 chars of MD5)
  const hash = crypto
    .createHash("md5")
    .update(seed)
    .digest("hex")
    .slice(0, 6);

  return `${baseSlug}-${hash}`;
}

function parseMarkdown(raw: string): {
  title: string;
  date: string | null;
  duration: string | null;
  referenceUrl: string | null;
  coverImage: string | null;
  content: string;
} {
  const lines = raw.split("\n");

  // Extract title (setext style)
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

  // Skip Medium metadata until after "Listen Share"
  let i = 0;
  let skippedListenShare = false;

  while (i < contentLines.length) {
    const trimmed = contentLines[i].trim();

    if (trimmed === "Listen") {
      skippedListenShare = true;
      i++;
      continue;
    }

    if (skippedListenShare && trimmed === "Share") {
      i++;
      while (i < contentLines.length && contentLines[i].trim() === "") i++;
      break;
    }

    // Skip junk
    if (
      trimmed === "" ||
      trimmed.includes("resize:fill:64:64") ||
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

    if (trimmed.length > 20) break;
    i++;
  }

  contentLines = contentLines.slice(i);
  const remaining = contentLines.join("\n").trim();

  // Extract cover image
  const imgMatch = remaining.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const coverImage = imgMatch ? imgMatch[2] : null;

  // Extract reference URL
  const refMatch = remaining.match(/\[Reference\]\(([^)]+)\)/);
  const referenceUrl = refMatch ? refMatch[1] : null;

  // Extract date and duration
  let date: string | null = null;
  let duration: string | null = null;

  const metaMatch = raw.match(/(\d+)\s*min read\s*·\s*([A-Za-z]+\s+\d{1,2},\s+\d{4})/);
  if (metaMatch) {
    duration = `${metaMatch[1]} min read`;
    date = metaMatch[2];
  }

  // Clean content (remove cover image line from body)
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
    const fileSlug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOGS_DIR, file), "utf-8");
    const { title, date, duration, referenceUrl, coverImage } = parseMarkdown(raw);
    
    const cleanSlug = slugify(title, date);   // ← pass date here

    return {
      slug: cleanSlug,
      title,
      date,
      duration,
      referenceUrl,
      coverImage,
      fileSlug,
    };
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
  const allBlogs = getAllBlogs();
  const blogMeta = allBlogs.find((b) => b.slug === slug);
  if (!blogMeta) return null;

  const filePath = path.join(BLOGS_DIR, `${blogMeta.fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { title, date, duration, referenceUrl, coverImage, content } = parseMarkdown(raw);

  return {
    slug,
    title,
    date,
    duration,
    referenceUrl,
    coverImage,
    content,
    fileSlug: blogMeta.fileSlug,
  };
}