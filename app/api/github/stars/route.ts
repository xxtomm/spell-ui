import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

export async function GET() {
  const repoPath = siteConfig.links.github.replace("https://github.com/", "");
  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (!response.ok) return NextResponse.json({ stars: 0 });
    const data = (await response.json()) as { stargazers_count?: number };
    return NextResponse.json(
      { stars: data.stargazers_count ?? 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { stars: 0 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600",
        },
      }
    );
  }
}
