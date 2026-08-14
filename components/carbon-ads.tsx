"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const XL_QUERY = "(min-width: 1280px)";

const VARIANTS = {
  toc: { format: "cover", className: "min-h-[280px]" },
  inline: { format: "responsive", className: "min-h-[155px] xl:hidden" },
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

  // Carbon's terms allow one ad per page. Articles carry two containers that
  // are never enabled together: the TOC unit injects at xl+ where its
  // `hidden xl:block` sidebar is visible, the inline unit below xl. The
  // footer unit only renders on the home page, which has neither.
  const enabled =
    siteConfig.carbon.serve !== "" &&
    (variant === "toc"
      ? isXl === true
      : variant === "inline"
        ? isXl === false
        : pathname === "/");

  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (!enabled) {
      // Crossing the xl boundary swaps which unit is enabled; clear the
      // disabled one so the page never holds two ads.
      if (injectedKey.current !== null) {
        container.innerHTML = "";
        injectedKey.current = null;
      }
      return;
    }

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
