import { allBlogs } from "content-collections";
import { allDocItems } from "@/lib/doc";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url;

  const docs = await allDocItems();

  const latestBlogDate = allBlogs.length > 0
    ? new Date(Math.max(...allBlogs.map((p) => new Date(p.publishedOn).getTime())))
    : new Date();

  return [
    {
      url,
      lastModified: latestBlogDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${url}/docs`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...docs.map((doc) => ({
      url: `${url}/docs/${doc.id}`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${url}/blog`,
      lastModified: latestBlogDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...allBlogs.map((post) => ({
      url: `${url}/blog/${post.slugAsParams}`,
      lastModified: new Date(post.publishedOn),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
