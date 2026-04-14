// app/rss.xml/route.ts
import { NextResponse } from 'next/server';
import { getAllBlogsForRSS } from '@/lib/blogs';   // adjust the import path if needed

const SITE_URL = 'https://abhijithms.vercel.app';   // ← Your actual domain
const BLOG_URL = `${SITE_URL}/blogs`;

export async function GET() {
  const posts = getAllBlogsForRSS();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Abhijith M S - Blog</title>
    <link>${SITE_URL}</link>
    <description>Personal writings on Rust, Docker, distributed systems, and software engineering.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
`;

  for (const post of posts) {
    const postUrl = `${BLOG_URL}/${post.slug}`;
    const escapedTitle = post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedDesc = post.description.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    let enclosure = '';

    if (post.coverImage) {
      // Use length="0" for external images (required by RSS spec)
      enclosure = `
      <enclosure url="${post.coverImage}" length="0" type="image/jpeg"/>`;
    }

    xml += `
    <item>
      <title>${escapedTitle}</title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <pubDate>${post.pubDate}</pubDate>
      <description>${escapedDesc}</description>
      <author>abhijithmsaji132@gmail.com (Abhijith M S)</author>${enclosure}
    </item>`;
  }

  xml += `
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}