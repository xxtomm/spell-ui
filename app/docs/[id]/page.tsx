import { Badge } from "@/registry/spell-ui/badge";
import { allDocItems, getDoc } from "@/lib/doc";
import { ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { DocsTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DocCopySection } from "@/components/doc-copy-section";

export default async function DocPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const Doc = (await import(`@/docs/${id}/doc.mdx`)).default;
  const item = await getDoc(id);

  if (!item) {
    notFound();
  }

  const allItems = await allDocItems();
  const currentIndex = allItems.findIndex((doc) => doc.id === id);
  const prevDoc = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextDoc = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

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
        <article className="max-w-4xl prose dark:prose-invert w-full">
          <header className="not-prose mb-8">
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
                  className="rounded-full size-8 shadow-none active:scale-[0.97] will-change-transform ease-out duration-300 transition-colors"
                  size="icon"
                  disabled={!prevDoc}
                  asChild={!!prevDoc}
                >
                  {prevDoc ? (
                    <Link
                      href={`/docs/${prevDoc.id}`}
                      title={prevDoc.title}
                    >
                      <ArrowLeft className="text-muted-foreground" />
                    </Link>
                  ) : (
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
                  {nextDoc ? (
                    <Link
                      href={`/docs/${nextDoc.id}`}
                      title={nextDoc.title}
                    >
                      <ArrowRight className="text-muted-foreground" />
                    </Link>
                  ) : (
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
          <Doc />
        </article>

        <aside className="hidden xl:block sticky top-[90px] h-fit">
          <DocsTableOfContents toc={toc} docId={id} />
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
