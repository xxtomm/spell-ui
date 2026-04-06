import React from "react";
import { db } from "@/db";
import { sponsors } from "@/db/schemas/sponsor";
import { users } from "@/db/schemas/auth";
import { eq } from "drizzle-orm";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TIER_ORDER = ["diamond", "platinum", "gold"] as const;

const TIER_LABELS: Record<string, string> = {
  diamond: "Diamond Sponsor",
  platinum: "Platinum Sponsor",
  gold: "Gold Sponsor",
};

const TIER_LOGO_SIZE: Record<string, string> = {
  diamond: "h-12 sm:h-14",
  platinum: "h-11 sm:h-12",
  gold: "h-10 sm:h-11",
};

interface SponsorRow {
  tierId: string;
  userName: string;
  userImage: string | null;
  logoUrl: string | null;
  logoDarkUrl: string | null;
  websiteUrl: string | null;
}

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

function groupByTier(sponsorRows: SponsorRow[]) {
  return TIER_ORDER.map((tier) => ({
    tier,
    label: TIER_LABELS[tier] ?? tier,
    sponsors: sponsorRows.filter((s) => s.tierId === tier),
  }));
}

export async function SponsorSection({ className }: { className?: string }) {
  const activeSponsors = await getActiveSponsors();

  const groups = groupByTier(activeSponsors);

  return (
    <section
      className={cn(
        "flex flex-col items-center gap-12 text-center",
        className,
      )}
    >
      <div className="flex w-full max-w-2xl flex-col items-center gap-7.5">
        {groups.map((group) => (
          <React.Fragment key={group.tier}>
            <div className="flex w-full items-center gap-3">
              <div className="flex-1 border-t border-dashed border-muted-foreground/25" />
              <span className="shrink-0 text-sm font-medium text-muted-foreground/60">
                {group.label}
              </span>
              <div className="flex-1 border-t border-dashed border-muted-foreground/25" />
            </div>
            {group.sponsors.length > 0 ? (
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                {group.sponsors.map((sponsor, i) => {
                  const href = sponsor.websiteUrl || "/sponsor";
                  const isExternal = href.startsWith("http");
                  const logo = sponsor.logoUrl || sponsor.userImage;
                  const logoDark = sponsor.logoDarkUrl;
                  return (
                    <Link
                      key={i}
                      href={href}
                      className="group flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                      title={`${sponsor.userName} — ${group.label}`}
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
                                TIER_LOGO_SIZE[sponsor.tierId] ?? "h-9",
                              )}
                            />
                            <img
                              src={logoDark}
                              alt={sponsor.userName}
                              className={cn(
                                "hidden max-w-28 object-contain dark:block",
                                TIER_LOGO_SIZE[sponsor.tierId] ?? "h-9",
                              )}
                            />
                          </>
                        ) : (
                          <img
                            src={logo}
                            alt={sponsor.userName}
                            className={cn(
                              "max-w-28 object-contain dark:invert",
                              TIER_LOGO_SIZE[sponsor.tierId] ?? "h-9",
                            )}
                          />
                        )
                      ) : (
                        <div
                          className={cn(
                            "flex items-center justify-center rounded-lg border border-border bg-muted text-sm font-medium text-muted-foreground",
                            TIER_LOGO_SIZE[sponsor.tierId] ?? "size-9",
                          )}
                        >
                          {sponsor.userName?.[0]?.toUpperCase() ?? "?"}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            ) : (
              <Link
                href="/sponsor"
                className="inline-flex cursor-pointer items-center gap-x-1 py-4 text-base font-medium tracking-tight text-muted-foreground/60 transition-colors duration-300 hover:text-muted-foreground [&_svg]:size-3.5 [&_svg]:shrink-0"
              >
                <span>Be here</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path d="M18 15V6M18 6H9M18 6L6.25 17.75" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
