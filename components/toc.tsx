"use client";

import * as React from "react";

import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { SiX, SiDiscord } from "@icons-pack/react-simple-icons";
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
  boldActive = true,
}: {
  toc: {
    title?: React.ReactNode;
    url: string;
    depth: number;
  }[];
  className?: string;
  docId?: string;
  boldActive?: boolean;
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
      className={cn(
        "flex flex-col gap-2 p-4 pt-0 text-sm",
        className,
      )}
    >
      <p className="text-primary bg-background sticky top-0 h-6 mb-2 text-[0.85rem] flex gap-1.5 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 items-center">
        <MenuLeft />
        On This Page
      </p>
      {toc.map((item) => (
        <a
          key={item.url}
          href={item.url}
          className={cn(
            "text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.9rem] no-underline transition-colors data-[depth=3]:pl-4 data-[depth=4]:pl-6",
            boldActive && "data-[active=true]:font-medium",
          )}
          data-active={item.url === `#${activeHeading}`}
          data-depth={item.depth}
        >
          {item.title}
        </a>
      ))}
      <Separator orientation="horizontal" className="my-2" />
      <div className="flex flex-col gap-2">
        {docId && (
          <Link
            href={`${siteConfig.links.github}/edit/main/docs/${docId}/doc.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
            onClick={() => trackEvent("click_edit_page", { doc: docId })}
          >
            <SquarePen />
            Edit this page
          </Link>
        )}
        <Link
          href={siteConfig.links.tom}
          className="transition-colors hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
        >
          <SiX className="pl-[1px]" />
          <span>Follow @tomm_ui</span>
        </Link>
        <Link
          href={siteConfig.links.discord}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground text-muted-foreground [&_svg]:size-3 flex gap-1.5 items-center"
        >
          <SiDiscord />
          Join community
        </Link>
      </div>
    </div>
  );
}
