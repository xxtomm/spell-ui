"use client";

import * as React from "react";

import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { SiX } from "@icons-pack/react-simple-icons";
import MenuLeft from "./icons/menu-left";

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const id of itemIds ?? []) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      for (const id of itemIds ?? []) {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      }
    };
  }, [itemIds]);

  return activeId;
}

export function DocsTableOfContents({
  toc,
  className,
  docId,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  className?: string;
  docId?: string;
}) {
  const itemIds = React.useMemo(
    () => toc.map((item) => item.url.replace("#", "")),
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  return (
    <div
      className={cn("flex flex-col p-2 text-[11px]", className)}
      style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif", backgroundColor: "#D4D0C8" }}
    >
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          style={{
            display: "block",
            padding: "2px 4px",
            fontSize: "11px",
            textDecoration: "none",
            fontFamily: "Tahoma, Verdana, Arial, sans-serif",
            paddingLeft: item.depth >= 3 ? (item.depth >= 4 ? "20px" : "12px") : "4px",
            backgroundColor: item.url === `#${activeHeading}` ? "#0A246A" : "transparent",
            color: item.url === `#${activeHeading}` ? "#FFFFFF" : "#0000FF",
            fontWeight: item.url === `#${activeHeading}` ? "bold" : "normal",
          }}
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
      <div
        className="my-2"
        style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #FFFFFF" }}
      />
      <div className="flex flex-col gap-1">
        {docId && (
          <Link
            href={`${siteConfig.links.github}/edit/main/docs/${docId}/doc.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0000FF", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}
            onClick={() => trackEvent("click_edit_page", { doc: docId })}
          >
            <SquarePen style={{ width: "11px", height: "11px" }} />
            Edit this page
          </Link>
        )}
        <Link
          href={siteConfig.links.tom}
          style={{ color: "#0000FF", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}
        >
          <SiX style={{ width: "11px", height: "11px" }} />
          <span>Follow @tomm_ui</span>
        </Link>
      </div>
    </div>
  );
}
