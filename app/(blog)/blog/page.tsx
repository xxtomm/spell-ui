import { siteConfig } from "@/lib/config";
import { buildOgUrl } from "@/lib/utils";
import type { Metadata } from "next";
import BlogList from "./blog-list";

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Articles, guides, and updates on React, Tailwind CSS, animation, and design engineering.",
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: "Articles, guides, and updates on React, Tailwind CSS, animation, and design engineering.",
    type: "website",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    images: [
      {
        url: buildOgUrl({ title: "Blog", description: "Articles, guides, and updates from Spell UI" }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${siteConfig.name}`,
    description: "Articles, guides, and updates on React, Tailwind CSS, animation, and design engineering.",
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  return <BlogList />;
}
