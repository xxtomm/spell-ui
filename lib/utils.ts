import type { Metadata } from "next";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "@/lib/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildOgUrl(params?: { title?: string; description?: string }) {
  const url = new URL(absoluteUrl("/og"));
  if (params?.title) url.searchParams.set("title", params.title);
  if (params?.description) url.searchParams.set("description", params.description);
  return url.toString();
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = absoluteUrl("/og"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
} & Partial<Metadata> = {}): Metadata {
  return {
    title,
    description,
    keywords: siteConfig.keywords,
    openGraph: {
      title,
      description,
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 628,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.links.tom.replace("https://x.com/", "@"),
    },
    metadataBase: new URL(siteConfig.url),
    icons: "/icon.svg",
    ...props,
  };
}
