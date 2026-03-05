import * as React from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

function formatCompactCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
}

async function getStarsCount() {
  try {
    const repoPath = siteConfig.links.github.replace("https://github.com/", "");
    const data = await fetch(`https://api.github.com/repos/${repoPath}`, {
      next: { revalidate: 86400 },
    });
    if (!data.ok) return 0;
    const json = (await data.json()) as { stargazers_count?: number };
    const starsCount = json.stargazers_count;
    if (typeof starsCount !== "number" || !Number.isFinite(starsCount)) {
      return 0;
    }
    return starsCount;
  } catch {
    return 0;
  }
}

export async function StarsCount() {
  const starsCount = await getStarsCount();
  return (
    <span className="tabular-nums">
      <span className="hidden sm:inline">{starsCount.toLocaleString()}</span>
      <span className="sm:hidden">{formatCompactCount(starsCount)}</span>
    </span>
  );
}

export function GithubStars() {
  return (
    <Button
      asChild
      variant="outline"
      className="h-8 px-3 cursor-pointer dark:bg-background dark:hover:bg-input/20 shadow-none"
    >
      <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiGithub />
        <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
          <StarsCount />
        </React.Suspense>
        <span className="sr-only">Open Github</span>
      </Link>
    </Button>
  );
}
