import { Badge } from "@/registry/spell-ui/badge";
import { allDocItems, getDoc, getDocSchema } from "@/lib/doc";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsTableOfContents } from "@/components/toc";
import { CarbonAds } from "@/components/carbon-ads";
import { getTableOfContents } from "@/lib/toc";
import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocCopySection } from "@/components/doc-copy-section";
import { siteConfig } from "@/lib/config";
import { absoluteUrl, buildOgUrl, constructMetadata } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getDoc(id);

  if (!item) {
    return constructMetadata();
  }

  const image = buildOgUrl({ title: item.title, description: item.description });

  return constructMetadata({
    title: `${item.title} | ${siteConfig.name}`,
    description: item.description,
    image,
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      url: absoluteUrl(`/docs/${id}`),
      images: [{ url: image, width: 1200, height: 628 }],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.description,
      images: [image],
    },
  });
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let Doc;
  try {
    Doc = (await import(`@/docs/${id}/doc.mdx`)).default;
  } catch (error) {
    notFound();
  }

  const item = await getDoc(id);

  if (!item) {
    notFound();
  }

  const allItems = await allDocItems();
  const currentIndex = allItems.findIndex((doc) => doc.id === id);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1
    ? allItems[currentIndex + 1]
    : null;

  const schema = await getDocSchema();
  const gettingStartedSection = schema.find((section) => section.title === "Getting Started");
  const isGettingStarted = gettingStartedSection?.items.some((item) => item.id === id) ?? false;

  let toc: { title?: string; url: string; depth: number }[] = [];
  let rawContent = "";
  try {
    const docPath = join(process.cwd(), "docs", id, "doc.mdx");
    rawContent = await readFile(docPath, "utf-8");
    toc = await getTableOfContents(rawContent);
  } catch (error) {
    console.error("Error reading MDX file for TOC:", error);
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="xl:grid xl:grid-cols-[10px_1fr_200px] lg:grid-cols-[0px_1fr_200px] xl:gap-8 max-w-[1600px] mx-auto">
        <div className="hidden xl:block" />
        <article className="max-w-4xl prose dark:prose-invert w-full min-w-0">
          <header className="not-prose mb-8">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/docs/introduction">Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {isGettingStarted ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{item.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h1 className="scroll-m-20 text-3xl font-semibold tracking-tighter">
                  {item.title}
                </h1>
                <p className="text-base text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <DocCopySection content={rawContent} url={`/docs/${id}`} />
                <Button
                  variant="secondary"
                  className="rounded-full size-8 shadow-none active:scale-[0.97] will-change-transform ease-out duration-150 transition-transform"
                  size="icon"
                  disabled={!prevDoc}
                  asChild={!!prevDoc}
                >
                  {prevDoc
                    ? (
                      <Link
                        href={`/docs/${prevDoc.id}`}
                        title={prevDoc.title}
                      >
                        <ArrowLeft className="text-muted-foreground" />
                      </Link>
                    )
                    : (
                      <span>
                        <ArrowLeft className="text-muted-foreground" />
                      </span>
                    )}
                </Button>
                <Button
                  variant="secondary"
                  className="rounded-full size-8 shadow-none active:scale-[0.97] will-change-transform ease-out duration-300 transition-colors"
                  size="icon"
                  disabled={!nextDoc}
                  asChild={!!nextDoc}
                >
                  {nextDoc
                    ? (
                      <Link
                        href={`/docs/${nextDoc.id}`}
                        title={nextDoc.title}
                      >
                        <ArrowRight className="text-muted-foreground" />
                      </Link>
                    )
                    : (
                      <span>
                        <ArrowRight className="text-muted-foreground" />
                      </span>
                    )}
                </Button>
              </div>
            </div>

            {item.meta?.docs && item.meta?.docs.length > 0 && (
              <div className="flex items-center space-x-2 pt-4">
                {item.meta?.docs?.map((doc) => (
                  <Badge key={doc.title} variant="secondary" asChild>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.title}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Badge>
                ))}
              </div>
            )}
          </header>
          <CarbonAds variant="inline" className="not-prose mb-8" />
          <Doc />

          <nav className="not-prose flex items-center justify-between mt-12 pt-12 border-t">
            {prevDoc ? (
              <Link
                href={`/docs/${prevDoc.id}`}
                className="max-w-40 flex group flex-col font-medium items-start gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ease-out duration-200"
              >
                <span className="transition-colors text-muted-foreground/75 group-hover:text-muted-foreground ease-out duration-200">Previous</span>
                <span className="truncate">{prevDoc.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {nextDoc ? (
              <Link
                href={`/docs/${nextDoc.id}`}
                className="max-w-40 flex group flex-col font-medium items-end gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ease-out duration-200"
              >
                <span className="transition-colors text-muted-foreground/75 group-hover:text-muted-foreground ease-out duration-200">Next</span>
                <span className="truncate">{nextDoc.title}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>

        <aside className="hidden xl:block sticky top-[90px] h-fit">
          <DocsTableOfContents toc={toc} docId={id} />
          <CarbonAds variant="toc" className="mx-4 mt-3" />
        </aside>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const items = await allDocItems();
  return items.map((item) => ({
    id: item.id,
  }));
}
