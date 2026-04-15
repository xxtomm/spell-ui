"use client";

import { allBlogs } from "content-collections";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/registry/spell-ui/badge";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/registry/spell-ui/badge";

const TAG_COLORS: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  "Animation": "violet",
  "Components": "blue",
  "Design Engineering": "rose",
  "Design": "pink",
  "Guide": "emerald",
  "Landing Pages": "amber",
  "Next.js": "slate",
  "Performance": "orange",
  "React": "cyan",
  "Tailwind CSS": "sky",
};

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <Badge variant={TAG_COLORS[tag] ?? "default"}>
      {tag}
    </Badge>
  );
}

function BlogImage({ src, alt, className, sizes, fill, priority }: {
  src: string; alt: string; className?: string; sizes?: string; fill?: boolean; priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      fill={fill}
      priority={priority}
      unoptimized={!src.startsWith("http")}
    />
  );
}

export default function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = Array.from(
    new Set(allBlogs.map((blog) => blog.tag).filter(Boolean)),
  ).sort();

  const featuredPosts = allBlogs.filter((blog) => blog.featured).slice(0, 7);

  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog?.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || blog.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  return (
    <section className="mx-auto w-full max-w-7xl px-5 pt-20 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tighter">Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Articles, guides, and updates from the Spell UI team.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-12 rounded-xl border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col p-5 lg:border-r">
              <h2 className="mb-6 w-fit rounded-full border border-border bg-primary px-3 py-1 text-sm font-semibold tracking-tight text-primary-foreground">
                Featured
              </h2>
              <Link
                href={`/blog/${featuredPosts[0]._meta.path}`}
                className="group relative"
              >
                {featuredPosts[0].image && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
                    <BlogImage
                      src={featuredPosts[0].image}
                      alt={featuredPosts[0].title}
                      fill
                      className="rounded-xl object-cover object-left"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="py-4">
                  <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <time dateTime={featuredPosts[0].publishedOn}>
                      {new Date(featuredPosts[0].publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                    <span>&middot;</span>
                    {calculateReadingTime(featuredPosts[0].body.raw)} min read
                    {featuredPosts[0].tag && (
                      <TagBadge tag={featuredPosts[0].tag} />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                    {featuredPosts[0].title}
                  </h3>
                </div>
              </Link>
            </div>

            <div className="flex flex-col">
              {featuredPosts.slice(1, 7).map((blog) => (
                <Link
                  key={blog._meta.path}
                  href={`/blog/${blog._meta.path}`}
                  className="group flex gap-4 border-b border-border p-5 first:border-t last:border-b-0 lg:first:border-t-0"
                >
                  <div className="flex flex-col justify-center">
                    <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <time dateTime={blog.publishedOn}>
                        {new Date(blog.publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </time>
                      <span>&middot;</span>
                      {calculateReadingTime(blog.body.raw)} min read
                      {blog.tag && (
                        <TagBadge tag={blog.tag} />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                      {blog.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 pl-10 text-sm focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => tag && setSelectedTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center">
          <Search className="mb-2 size-10 text-muted-foreground" />
          <h3 className="mb-2 text-balance text-xl font-medium tracking-tighter">
            No articles found
          </h3>
          <p className="text-balance text-muted-foreground">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-b-0 border-border md:grid-cols-2 md:divide-y-0 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <li
              key={blog._meta.path}
              className="border-border p-4 md:border-b md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <Link
                href={`/blog/${blog._meta.path}`}
                className="group grid grid-rows-1"
              >
                {blog.image && (
                  <div className="relative h-[200px] overflow-hidden rounded-xl border border-border">
                    <BlogImage
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover object-left transition-transform duration-300 ease-in-out group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="py-2">
                  <h3 className="mb-2 text-xl font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    {blog.tag && (
                      <TagBadge tag={blog.tag} />
                    )}
                    <time dateTime={blog.publishedOn}>
                      {new Date(blog.publishedOn).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </time>
                    <span>&middot;</span>
                    <span>
                      {calculateReadingTime(blog.body.raw)} min read
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
