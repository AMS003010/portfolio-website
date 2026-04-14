// app/rss.xml/route.ts
import { NextResponse } from 'next/server';
import { getAllBlogsForRSS } from '@/lib/blogs';   // adjust alias if needed

const SITE_URL = 'https://abhijithms.vercel.app';           // ← CHANGE TO YOUR REAL DOMAIN
const BLOG_URL = `${SITE_URL}/blogs`;

export async function GET() {
  const posts = getAllBlogsForRSS();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Abhijith M S - Blog</title>
    <link>${SITE_URL}</link>
    <description>Personal writings on Rust, Docker, software engineering and more.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
`;

  for (const post of posts) {
    const postUrl = `${BLOG_URL}/${post.slug}`;
    const escapedTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const escapedDesc = post.description.replace(/&/g, '&amp;').replace(/</g, '&lt;');

    xml += `
    <item>
      <title>${escapedTitle}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${post.pubDate}</pubDate>
      <description>${escapedDesc}</description>
      <author>${post.author}</author>
      ${post.coverImage ? `<enclosure url="${post.coverImage}" type="image/jpeg"/>` : ''}
    </item>`;
  }

  xml += `
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}