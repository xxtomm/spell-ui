"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const XL_QUERY = "(min-width: 1280px)";
const TOAST_DISMISSED_KEY = "carbon-toast-dismissed";

const VARIANTS = {
  toc: { format: "cover", className: "min-h-[280px]" },
  toast: { format: "responsive", className: "" },
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
  const [loaded, setLoaded] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(XL_QUERY);
    const update = () => setIsXl(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (variant === "toast" && sessionStorage.getItem(TOAST_DISMISSED_KEY)) {
      setDismissed(true);
    }
  }, [variant]);

  // Carbon's terms allow one ad per page. Articles carry two containers that
  // are never enabled together: the TOC unit injects at xl+ where its
  // `hidden xl:block` sidebar is visible, the toast unit below xl. The
  // footer unit only renders on the home page, which has neither.
  const enabled =
    siteConfig.carbon.serve !== "" &&
    (variant === "toc"
      ? isXl === true
      : variant === "toast"
        ? isXl === false && !dismissed
        : pathname === "/");

  React.useEffect(() => {
    const container = ref.current;
    if (!container) return;

    if (!enabled) {
      // Crossing the xl boundary (or dismissing the toast) swaps which unit
      // is enabled; clear the disabled one so the page never holds two ads.
      if (injectedKey.current !== null) {
        container.innerHTML = "";
        injectedKey.current = null;
        setLoaded(false);
      }
      return;
    }

    // An async carbon.js script still executes after being detached from the
    // DOM, so StrictMode's double effect run would inject two ads if we
    // naively cleaned up and re-appended. Only inject once per page view.
    const key = `${variant}:${pathname}`;
    if (injectedKey.current === key) return;
    injectedKey.current = key;

    setLoaded(false);
    container.innerHTML = "";
    const script = document.createElement("script");
    script.id = "_carbonads_js";
    script.async = true;
    script.src = `https://cdn.carbonads.com/carbon.js?serve=${siteConfig.carbon.serve}&placement=${siteConfig.carbon.placement}&format=${VARIANTS[variant].format}`;
    container.appendChild(script);
  }, [enabled, pathname, variant]);

  // Reveal the toast only after Carbon actually renders an ad, so a blocked
  // or unfilled request never leaves a floating empty card behind.
  React.useEffect(() => {
    if (variant !== "toast") return;
    const container = ref.current;
    if (!container) return;
    const observer = new MutationObserver(() => {
      setLoaded(container.querySelector("#carbon-responsive") !== null);
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [variant]);

  if (
    siteConfig.carbon.serve === "" ||
    (variant === "footer" && pathname !== "/")
  ) {
    return null;
  }

  if (variant === "toast") {
    return (
      <div
        data-carbon="toast"
        className={cn(
          "fixed bottom-4 right-4 z-40 w-[360px] max-w-[calc(100vw-2rem)] xl:hidden",
          "transition-all duration-300 ease-out motion-reduce:transition-none",
          loaded
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
          className,
        )}
      >
        <div ref={ref} />
        {loaded && (
          <button
            type="button"
            aria-label="Dismiss ad"
            onClick={() => {
              setDismissed(true);
              try {
                sessionStorage.setItem(TOAST_DISMISSED_KEY, "1");
              } catch {}
            }}
            className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-carbon={variant}
      className={cn(VARIANTS[variant].className, className)}
    />
  );
}
