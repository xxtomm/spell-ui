import { allBlogs } from "content-collections";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url;

  const posts = [...allBlogs].sort(
    (a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime(),
  );

  const items = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${url}/blog/${post.slugAsParams}</link>
      <guid isPermaLink="true">${url}/blog/${post.slugAsParams}</guid>
      <pubDate>${new Date(post.publishedOn).toUTCString()}</pubDate>${post.description ? `
      <description><![CDATA[${post.description}]]></description>` : ""}${post.tag ? `
      <category>${post.tag}</category>` : ""}
    </item>`,
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Blog</title>
    <link>${url}/blog</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
    <atom:link href="${url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
