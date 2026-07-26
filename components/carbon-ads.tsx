"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const XL_QUERY = "(min-width: 1280px)";

const VARIANTS = {
  toc: { format: "cover", className: "min-h-[280px]" },
  footer: { format: "responsive", className: "min-h-[155px]" },
} as const;

export function CarbonAds({
  variant,
  className,
}: {
  variant: keyof typeof VARIANTS;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const injectedKey = React.useRef<string | null>(null);
  const pathname = usePathname();
  const [isXl, setIsXl] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mql = window.matchMedia(XL_QUERY);
    const update = () => setIsXl(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Carbon's terms allow one ad per page. The footer unit only renders on
  // the home page (no TOC there), and the TOC unit only injects at xl+
  // where its `hidden xl:block` sidebar is actually visible, so hidden
  // impressions are never wasted.
  const enabled =
    siteConfig.carbon.serve !== "" &&
    (variant === "toc" ? isXl === true : pathname === "/");

  React.useEffect(() => {
    const container = ref.current;
    if (!container || !enabled) return;

    // An async carbon.js script still executes after being detached from the
    // DOM, so StrictMode's double effect run would inject two ads if we
    // naively cleaned up and re-appended. Only inject once per page view.
    const key = `${variant}:${pathname}`;
    if (injectedKey.current === key) return;
    injectedKey.current = key;

    container.innerHTML = "";
    const script = document.createElement("script");
    script.id = "_carbonads_js";
    script.async = true;
    script.src = `https://cdn.carbonads.com/carbon.js?serve=${siteConfig.carbon.serve}&placement=${siteConfig.carbon.placement}&format=${VARIANTS[variant].format}`;
    container.appendChild(script);
  }, [enabled, pathname, variant]);

  if (
    siteConfig.carbon.serve === "" ||
    (variant === "footer" && pathname !== "/")
  ) {
    return null;
  }

  return (
    <div
      ref={ref}
      data-carbon={variant}
      className={cn(VARIANTS[variant].className, className)}
    />
  );
}
