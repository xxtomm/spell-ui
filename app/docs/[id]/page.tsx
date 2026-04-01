import { allDocItems, getDoc, getDocSchema } from "@/lib/doc";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { readFile } from "fs/promises";
import { join } from "path";
import Link from "next/link";
import { DocCopySection } from "@/components/doc-copy-section";
import { siteConfig } from "@/lib/config";
import { absoluteUrl, buildOgUrl, constructMetadata } from "@/lib/utils";

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
    <div
      className="px-4 py-4"
      style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", backgroundColor: "#D4D0C8", minHeight: "100vh", paddingBottom: "32px" }}
    >
      <div className="xl:grid xl:grid-cols-[1fr_190px] xl:gap-4 max-w-[1400px] mx-auto">
        {/* Main content panel — Win2k sunken panel */}
        <div
          className="win2k-panel"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {/* Document title bar */}
          <div
            className="win2k-titlebar px-2 py-1"
            style={{ fontSize: "11px" }}
          >
            <span>📄</span>
            <span>{item.title} — Spell UI Docs</span>
          </div>

          <article
            className="prose w-full p-4"
            style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", maxWidth: "none" }}
          >
            <header className="not-prose mb-4">
              {/* Win2k breadcrumb toolbar */}
              <div
                className="flex items-center gap-1 mb-3 text-[11px] px-1 py-1 win2k-raised"
                style={{ fontSize: "11px", backgroundColor: "#D4D0C8" }}
              >
                <span style={{ color: "#808080" }}>📁</span>
                <Link href="/docs/introduction" style={{ color: "#0000FF", textDecoration: "none", fontSize: "11px" }}>Docs</Link>
                <span style={{ color: "#808080" }}>›</span>
                {isGettingStarted ? (
                  <span style={{ fontSize: "11px", fontWeight: "bold" }}>{item.title}</span>
                ) : (
                  <>
                    <Link href="/docs/components" style={{ color: "#0000FF", textDecoration: "none", fontSize: "11px" }}>Components</Link>
                    <span style={{ color: "#808080" }}>›</span>
                    <span style={{ fontSize: "11px", fontWeight: "bold" }}>{item.title}</span>
                  </>
                )}
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h1
                    style={{
                      fontFamily: "Tahoma, Verdana, Arial, sans-serif",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#000000",
                      margin: "0 0 4px 0",
                      lineHeight: "1.3",
                    }}
                  >
                    {item.title}
                  </h1>
                  <p
                    style={{
                      fontFamily: "Tahoma, Verdana, Arial, sans-serif",
                      fontSize: "12px",
                      color: "#444444",
                      margin: "0",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <DocCopySection content={rawContent} url={`/docs/${id}`} />
                  <button
                    className="win2k-button text-[11px] flex items-center gap-1"
                    style={{ opacity: prevDoc ? 1 : 0.4, cursor: prevDoc ? "pointer" : "default" }}
                  >
                    {prevDoc ? (
                      <Link href={`/docs/${prevDoc.id}`} title={prevDoc.title} style={{ textDecoration: "none", color: "#000000" }}>
                        ◀ Back
                      </Link>
                    ) : (
                      <span>◀ Back</span>
                    )}
                  </button>
                  <button
                    className="win2k-button text-[11px] flex items-center gap-1"
                    style={{ opacity: nextDoc ? 1 : 0.4, cursor: nextDoc ? "pointer" : "default" }}
                  >
                    {nextDoc ? (
                      <Link href={`/docs/${nextDoc.id}`} title={nextDoc.title} style={{ textDecoration: "none", color: "#000000" }}>
                        Next ▶
                      </Link>
                    ) : (
                      <span>Next ▶</span>
                    )}
                  </button>
                </div>
              </div>

              {item.meta?.docs && item.meta?.docs.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {item.meta?.docs?.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="win2k-button text-[11px] flex items-center gap-1"
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      {doc.title}
                      <ExternalLink style={{ width: "12px", height: "12px" }} />
                    </a>
                  ))}
                </div>
              )}

              {/* Separator rule */}
              <div
                className="mt-3"
                style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #FFFFFF" }}
              />
            </header>

            <Doc />

            {/* Bottom navigation */}
            <nav
              className="not-prose flex items-center justify-between mt-6 pt-3"
              style={{ borderTop: "1px solid #808080", borderBottom: "none" }}
            >
              {prevDoc ? (
                <Link
                  href={`/docs/${prevDoc.id}`}
                  className="win2k-button text-[11px]"
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  ◀ {prevDoc.title}
                </Link>
              ) : (
                <div />
              )}
              {nextDoc ? (
                <Link
                  href={`/docs/${nextDoc.id}`}
                  className="win2k-button text-[11px]"
                  style={{ textDecoration: "none", color: "#000000" }}
                >
                  {nextDoc.title} ▶
                </Link>
              ) : (
                <div />
              )}
            </nav>
          </article>
        </div>

        {/* TOC — Win2k panel */}
        <aside className="hidden xl:block">
          <div className="win2k-panel sticky top-[90px] h-fit">
            <div
              className="win2k-titlebar px-2 py-1 text-[11px]"
            >
              📋 On This Page
            </div>
            <div style={{ backgroundColor: "#D4D0C8" }}>
              <DocsTableOfContents toc={toc} docId={id} />
            </div>
          </div>
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
