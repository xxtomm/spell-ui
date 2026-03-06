import * as React from "react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { getGitHubStars } from "@/lib/github";

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

async function StarsCount() {
  const count = await getGitHubStars();
  const displayValue =
    count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;

  return <span className="tabular-nums">{displayValue}</span>;
}
