import { db } from "@/db";
import { sponsors } from "@/db/schemas/sponsor";
import { users } from "@/db/schemas/auth";
import { eq } from "drizzle-orm";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { SiGithub, SiX, SiDiscord } from "@icons-pack/react-simple-icons";
import { SpellLogo } from "./spell-logo";

const TIER_ORDER = ["diamond", "platinum", "gold"] as const;

const TIER_LABELS: Record<string, string> = {
  diamond: "Diamond Sponsors",
  platinum: "Platinum Sponsors",
  gold: "Gold Sponsors",
};

const TIER_LOGO_SIZE: Record<string, string> = {
  diamond: "h-10",
  platinum: "h-9",
  gold: "h-8",
};

async function getActiveSponsors() {
  const rows = await db
    .select({
      tierId: sponsors.tierId,
      userName: users.name,
      userImage: users.image,
      logoUrl: sponsors.logoUrl,
      logoDarkUrl: sponsors.logoDarkUrl,
      websiteUrl: sponsors.websiteUrl,
    })
    .from(sponsors)
    .innerJoin(users, eq(sponsors.userId, users.id))
    .where(eq(sponsors.status, "active"));

  return rows.sort((a, b) => {
    const ai = TIER_ORDER.indexOf(a.tierId as (typeof TIER_ORDER)[number]);
    const bi = TIER_ORDER.indexOf(b.tierId as (typeof TIER_ORDER)[number]);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
}

function groupByTier(
  sponsorRows: Awaited<ReturnType<typeof getActiveSponsors>>,
) {
  const grouped: {
    tier: string;
    label: string;
    sponsors: typeof sponsorRows;
  }[] = [];
  for (const tier of TIER_ORDER) {
    const items = sponsorRows.filter((s) => s.tierId === tier);
    if (items.length > 0) {
      grouped.push({
        tier,
        label: TIER_LABELS[tier] ?? tier,
        sponsors: items,
      });
    }
  }
  return grouped;
}

const footerLinks = {
  Product: [
    { label: "Docs", href: "/docs/introduction" },
    { label: "Components", href: "/docs/components" },
    { label: "MCP", href: "/docs/mcp" },
    { label: "Sponsor", href: "/sponsor" },
  ],
  Social: [
    { label: "GitHub", href: siteConfig.links.github },
    { label: "X (Twitter)", href: siteConfig.links.x },
    { label: "Discord", href: siteConfig.links.discord },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export async function SiteFooter() {
  const activeSponsors = await getActiveSponsors();
  const groups = groupByTier(activeSponsors);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-1.5">
              <SpellLogo size={24} />
              <span className="font-medium">Spell UI</span>
            </Link>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground/75">
              Refined UI components for Design Engineers.
            </p>
            <div className="mt-auto flex items-center gap-4 pt-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/55 transition-colors duration-300 ease-out hover:text-primary"
                aria-label="GitHub"
              >
                <SiGithub className="size-5" />
              </Link>
              <Link
                href={siteConfig.links.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/55 transition-colors duration-300 ease-out hover:text-primary"
                aria-label="X"
              >
                <SiX className="size-4.5" />
              </Link>
              <Link
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary/55 transition-colors duration-300 ease-out hover:text-primary"
                aria-label="Discord"
              >
                <SiDiscord className="size-5" />
              </Link>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="text-sm font-medium">{title}</span>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground/75 transition-colors hover:text-foreground"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pb-4">
          <div className="flex flex-col gap-6">
            <Link
              href="/sponsor"
              className="inline-flex items-center gap-1.5 text-lg font-medium tracking-tight transition-colors hover:text-foreground/80 [&_svg]:size-4 [&_svg]:shrink-0"
            >
              Sponsors
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path d="M18 15V6M18 6H9M18 6L6.25 17.75" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              {activeSponsors.length > 0 ? (
                <div className="flex flex-col gap-8">
                  {groups.map((group) => (
                    <div key={group.tier} className="flex flex-col gap-4">
                      <span className="text-xs font-medium text-muted-foreground">
                        {group.label}
                      </span>
                      <div className="flex flex-wrap items-center gap-6">
                        {group.sponsors.map((sponsor, i) => {
                          const href = sponsor.websiteUrl || "/sponsor";
                          const isExternal = href.startsWith("http");
                          const logo = sponsor.logoUrl || sponsor.userImage;
                          const logoDark = sponsor.logoDarkUrl;
                          return (
                            <Link
                              key={i}
                              href={href}
                              title={sponsor.userName}
                              className="transition-opacity hover:opacity-80"
                              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            >
                              {logo ? (
                                logoDark ? (
                                  <>
                                    <img
                                      src={logo}
                                      alt={sponsor.userName}
                                      className={cn(
                                        "max-w-28 object-contain dark:hidden",
                                        TIER_LOGO_SIZE[sponsor.tierId] ?? "h-8",
                                      )}
                                    />
                                    <img
                                      src={logoDark}
                                      alt={sponsor.userName}
                                      className={cn(
                                        "hidden max-w-28 object-contain dark:block",
                                        TIER_LOGO_SIZE[sponsor.tierId] ?? "h-8",
                                      )}
                                    />
                                  </>
                                ) : (
                                  <img
                                    src={logo}
                                    alt={sponsor.userName}
                                    className={cn(
                                      "max-w-28 object-contain dark:invert",
                                      TIER_LOGO_SIZE[sponsor.tierId] ?? "h-8",
                                  )}
                                />
                              )
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                {sponsor.userName}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
                </div>
              ) : (
                <Link
                  href="/sponsor"
                  className="cursor-pointer py-2 text-base font-medium tracking-tight text-muted-foreground/60 transition-colors duration-300 hover:text-muted-foreground"
                >
                  Be here
                </Link>
              )}
            </div>
          </div>

        <div className="py-6 text-xs text-muted-foreground/60">
          <span>&copy; {new Date().getFullYear()} Spell UI</span>
        </div>
      </div>
    </footer>
  );
}
