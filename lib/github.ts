import { siteConfig } from "@/lib/config";

export async function getGitHubStars(): Promise<number> {
  const repoPath = siteConfig.links.github.replace("https://github.com/", "");
  try {
    const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) return 0;
    const data = (await response.json()) as { stargazers_count?: number };
    return data.stargazers_count ?? 0;
  } catch {
    return 0;
  }
}
