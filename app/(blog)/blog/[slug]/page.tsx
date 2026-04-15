import { allBlogs } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { absoluteUrl, buildOgUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/registry/spell-ui/badge";
import { DocsTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/registry/spell-ui/badge";

import type { Metadata } from "next";
import type { ComponentProps } from "react";

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

const components = {
  h1: ({ children, ...props }: ComponentProps<"h1">) => (
    <h1
      className="my-7 mb-5 scroll-m-20 text-3xl font-semibold tracking-tighter first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2
      className="my-5 mb-3 scroll-m-20 text-2xl font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3
      className="my-5 mb-3 scroll-m-20 text-lg font-semibold tracking-tighter"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentProps<"p">) => (
    <p className="my-3 leading-7" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentProps<"ul">) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<"ol">) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className="my-0 w-full overflow-hidden" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<"th">) => (
    <th
      className="border-r border-border bg-muted px-6 py-3 text-left text-sm font-semibold last:border-r-0"
      {...props}
    >
      {children}
    </th>
  ),
  tr: ({ children, ...props }: ComponentProps<"tr">) => (
    <tr className="border-b last:border-b-0" {...props}>
      {children}
    </tr>
  ),
  td: ({ children, ...props }: ComponentProps<"td">) => (
    <td
      className="border-r border-border px-6 py-4 text-sm last:border-r-0"
      {...props}
    >
      {children}
    </td>
  ),
  pre: ({ children, ...props }: ComponentProps<"pre">) => (
    <pre
      style={props.style}
      className={`my-4 max-h-[32rem] overflow-x-auto rounded-lg border border-border font-mono text-sm ${props.className ?? ""}`}
    >
      {children}
    </pre>
  ),
  a: ({ children, ...props }: ComponentProps<"a">) => (
    <a
      className="text-primary underline underline-offset-4"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ ...props }: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img className="my-4 rounded-xl border border-border" {...props} />
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = allBlogs.find((p) => p._meta.path === slug);

  if (!post) {
    return {};
  }

  const ogImage = post.image?.startsWith("http")
    ? post.image
    : buildOgUrl({ title: post.title, description: post.description });

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${slug}`),
      siteName: siteConfig.name,
      publishedTime: post.publishedOn,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
      creator: siteConfig.links.tom.replace("https://x.com/", "@"),
    },
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allBlogs.find((p) => p._meta.path === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = allBlogs
    .filter((p) => p._meta.path !== slug)
    .slice(0, 3);

  const fullToc = await getTableOfContents(post.body.raw);
  const toc = fullToc.filter((item) => item.depth === 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image?.startsWith("http") ? post.image : undefined,
    datePublished: post.publishedOn,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: absoluteUrl(`/blog/${slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${slug}`),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mt-20 mb-20 max-w-6xl px-5">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.20688 5.70711C7.5974 5.31658 7.5974 4.68342 7.20688 4.29289C6.81636 3.90237 6.18319 3.90237 5.79267 4.29289L2.85333 7.23223C1.87701 8.20855 1.87702 9.79146 2.85333 10.7678L5.79267 13.7071C6.18319 14.0976 6.81636 14.0976 7.20688 13.7071C7.5974 13.3166 7.5974 12.6834 7.20688 12.2929L4.91399 10H16.5C18.433 10 20 11.567 20 13.5C20 15.433 18.433 17 16.5 17H12C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19H16.5C19.5376 19 22 16.5376 22 13.5C22 10.4624 19.5376 8 16.5 8H4.91399L7.20688 5.70711Z" fill="currentColor" />
            </svg>
            Back
          </Link>
        </div>

        <div className="xl:grid xl:grid-cols-[1fr_200px] xl:gap-10">
          <article className="max-w-4xl">
            <header className="mb-8">
              <h1 className="text-balance text-3xl font-semibold tracking-tighter md:text-5xl">
                {post.title}
              </h1>
              {post.description && (
                <p className="mt-3 text-balance text-lg text-muted-foreground">
                  {post.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                <time dateTime={post.publishedOn}>
                  {new Date(post.publishedOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>&middot;</span>
                <span>{calculateReadingTime(post.body.raw)} min read</span>
                {post.tag && (
                  <>
                    <span>&middot;</span>
                    <Badge variant={TAG_COLORS[post.tag] ?? "default"}>
                      {post.tag}
                    </Badge>
                  </>
                )}
              </div>
            </header>

            {post.image && (
              <div className="relative mb-8 aspect-[1200/630] overflow-hidden rounded-xl border border-border">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXContent code={post.body.code} components={components} />
            </div>
          </article>

          <aside className="hidden xl:block sticky top-20 h-fit">
            <DocsTableOfContents toc={toc} boldActive={false} />
          </aside>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
              More Articles
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related._meta.path}
                  href={`/blog/${related._meta.path}`}
                  className="group rounded-xl border border-border p-4 transition-colors hover:bg-accent/50"
                >
                  <h3 className="font-semibold tracking-tighter underline-offset-4 group-hover:underline">
                    {related.title}
                  </h3>
                  {related.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {related.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
