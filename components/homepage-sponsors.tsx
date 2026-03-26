import { db } from "@/db";
import { sponsors } from "@/db/schemas/sponsor";
import { users } from "@/db/schemas/auth";
import { eq, inArray } from "drizzle-orm";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TIER_LOGO_SIZE: Record<string, string> = {
  diamond: "h-6",
  platinum: "h-5",
};

async function getHomepageSponsors() {
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

  return rows
    .filter((s) => s.tierId === "diamond" || s.tierId === "platinum")
    .sort((a, b) => (a.tierId === "diamond" ? -1 : 1));
}

export async function HomepageSponsors() {
  const sponsorList = await getHomepageSponsors();

  if (sponsorList.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-base font-medium text-muted-foreground">Sponsored by</span>
      <div className="flex items-center gap-4">
        {sponsorList.map((sponsor, i) => {
          const href = sponsor.websiteUrl || "/sponsor";
          const isExternal = href.startsWith("http");
          const logo = sponsor.logoUrl || sponsor.userImage;
          const logoDark = sponsor.logoDarkUrl;
          return (
            <Link
              key={i}
              href={href}
              title={sponsor.userName}
              className="transition-opacity hover:opacity-70"
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {logo ? (
                logoDark ? (
                  <>
                    <img
                      src={logo}
                      alt={sponsor.userName}
                      className={cn(
                        "max-w-24 object-contain dark:hidden",
                        TIER_LOGO_SIZE[sponsor.tierId] ?? "h-6",
                      )}
                    />
                    <img
                      src={logoDark}
                      alt={sponsor.userName}
                      className={cn(
                        "hidden max-w-24 object-contain dark:block",
                        TIER_LOGO_SIZE[sponsor.tierId] ?? "h-6",
                      )}
                    />
                  </>
                ) : (
                  <img
                    src={logo}
                    alt={sponsor.userName}
                    className={cn(
                      "max-w-24 object-contain dark:invert",
                      TIER_LOGO_SIZE[sponsor.tierId] ?? "h-6",
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
  );
}
