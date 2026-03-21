import SiteHeader from "@/components/site-header";
import { ShinyButton } from "@/components/shiny-button";
import { Button } from "@/components/ui/button";
import { getDocSchema } from "@/lib/doc";
import { Badge } from "@/registry/spell-ui/badge";
import { BlurReveal } from "@/registry/spell-ui/blur-reveal";

type TierFeature =
  | string
  | { label: string; sublines: string[] };

type TierBadgeKind = "bestValue" | "topTier";

type SponsorTierDef = {
  id: "silver" | "gold" | "platinum" | "diamond";
  title: string;
  price: number;
  priceDisplay?: string;
  envKey: string;
  badge: TierBadgeKind | null;
  /** Shown above the checklist, e.g. "All Silver features, plus:" — omit on base tier */
  allLowerTierFeaturesLabel: string | null;
  features: readonly TierFeature[];
};

const SPONSOR_TIER_DEFS = [
  {
    id: "silver",
    title: "Silver",
    price: 10,
    envKey: "WHOP_CHECKOUT_URL_SILVER",
    badge: null,
    allLowerTierFeaturesLabel: null,
    features: [
      "Support Spell UI",
      "Custom Role on Discord server",
      {
        label: "Small logo & link:",
        sublines: ["Sponsor section", "GitHub README"],
      },
    ] satisfies TierFeature[],
  },
  {
    id: "gold",
    title: "Gold",
    price: 30,
    priceDisplay: "$30",
    envKey: "WHOP_CHECKOUT_URL_GOLD",
    badge: "bestValue",
    allLowerTierFeaturesLabel: "Silver",
    features: [
      {
        label: "Medium logo & link:",
        sublines: ["Sponsor section", "GitHub README", "Docs footer"],
      },
    ] satisfies TierFeature[],
  },
  {
    id: "platinum",
    title: "Platinum",
    price: 100,
    envKey: "WHOP_CHECKOUT_URL_PLATINUM",
    badge: null,
    allLowerTierFeaturesLabel: "Gold",
    features: [
      {
        label: "Large logo & link:",
        sublines: [
          "Sponsor section",
          "GitHub README",
          "Docs footer",
          "Homepage mention",
        ],
      },
    ] satisfies TierFeature[],
  },
  {
    id: "diamond",
    title: "Diamond",
    price: 500,
    envKey: "WHOP_CHECKOUT_URL_DIAMOND",
    badge: "topTier",
    allLowerTierFeaturesLabel: "Platinum",
    features: [
      "Early access to upcoming components",
      {
        label: "Featured logo & link:",
        sublines: [
          "Sponsor section",
          "GitHub README",
          "Docs footer",
          "Homepage feature",
        ],
      },
    ] satisfies TierFeature[],
  },
] as const satisfies readonly SponsorTierDef[];

type TierId = (typeof SPONSOR_TIER_DEFS)[number]["id"];

const tierCheckIconClass =
  "mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-500";

function TierCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6323 3.03705C22.3023 3.52435 22.4504 4.46248 21.9631 5.13243L10.5072 20.8824C10.2675 21.212 9.904 21.4298 9.50037 21.4859C9.09673 21.5419 8.68767 21.4313 8.36726 21.1795L2.32314 16.4295C1.67179 15.9176 1.55873 14.9746 2.07062 14.3232C2.58251 13.6719 3.52551 13.5588 4.17686 14.0707L8.99686 17.8587L19.5369 3.36778C20.0242 2.69783 20.9624 2.54976 21.6323 3.03705Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TierBadgeTagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-3 shrink-0"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6C2 3.79086 3.79086 2 6 2H10.7574C11.8182 2 12.8356 2.42143 13.5858 3.17157L20.8358 10.4216C22.3979 11.9837 22.3979 14.5163 20.8358 16.0784L16.0784 20.8358C14.5163 22.3979 11.9837 22.3979 10.4216 20.8358L3.17157 13.5858C2.42143 12.8356 2 11.8182 2 10.7574V6ZM7.5 9C8.32843 9 9 8.32843 9 7.5C9 6.67157 8.32843 6 7.5 6C6.67157 6 6 6.67157 6 7.5C6 8.32843 6.67157 9 7.5 9Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TierBadgeGemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className="size-3 shrink-0"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00861 3.96297C6.73358 3.34157 7.65693 3 8.61177 3H15.3922C16.3471 3 17.2704 3.34157 17.9954 3.96297L21.6931 7.13242C23.4622 8.64879 23.5659 11.3503 21.9183 12.9979L14.8304 20.0858C13.2683 21.6479 10.7357 21.6479 9.17357 20.0858L2.08566 12.9979C0.438071 11.3503 0.541821 8.64879 2.31092 7.13242L6.00861 3.96297ZM10.2091 8.70711C10.5996 8.31658 10.5996 7.68342 10.2091 7.29289C9.81854 6.90237 9.18537 6.90237 8.79485 7.29289L7.1484 8.93934C6.56261 9.52513 6.56261 10.4749 7.1484 11.0607L8.79485 12.7071C9.18537 13.0976 9.81854 13.0976 10.2091 12.7071C10.5996 12.3166 10.5996 11.6834 10.2091 11.2929L8.91617 10L10.2091 8.70711Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TierBadge({ kind }: { kind: TierBadgeKind }) {
  if (kind === "bestValue") {
    return (
      <Badge
        className="gap-1"
        variant={'outline'}
        title="Strong visibility for the monthly price"
      >
        <TierBadgeTagIcon />
        Best Value
      </Badge>
    );
  }
  return (
    <Badge
      className="gap-1"
      title="Highest tier: full visibility and early access"
    >
      <TierBadgeGemIcon />
      Top Tier
    </Badge>
  );
}

export default async function SponsorPage() {
  const docSchema = await getDocSchema();
  const tiers = SPONSOR_TIER_DEFS.map((tier) => ({
    ...tier,
    href: process.env[tier.envKey],
  })).filter((tier) => tier.href);
  const hasCheckoutUrls = tiers.length > 0;

  return (
    <div className="relative flex min-h-dvh pt-14">
      <SiteHeader docSchema={docSchema} />
      <main className="flex flex-1 flex-col px-4 py-12 sm:px-5 sm:py-16 md:px-6">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            <BlurReveal
              letterSpacing="-0.020em"
              className="text-balance text-[1.75rem] font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Sponsorship
            </BlurReveal>
            <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Reach a global audience of developers and support Spell UI as a
              sponsor.
            </p>
            <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
              Spell UI is free and open source. Sponsors fund the library and
              documentation; your logo and link run on the site, readme, and
              docs, every tier includes a Discord role, and the top tier adds
              homepage or featured placement.
            </p>
          </div>

          <section className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-center text-xs font-mono font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
              All tiers
            </h2>
            {hasCheckoutUrls ? (
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4">
                {tiers.map((tier) => (
                  <SponsorCard
                    key={tier.id}
                    tierId={tier.id}
                    title={tier.title}
                    priceLabel={
                      "priceDisplay" in tier && tier.priceDisplay
                        ? tier.priceDisplay
                        : `$${tier.price}`
                    }
                    href={tier.href!}
                    badge={tier.badge}
                    allLowerTierFeaturesLabel={tier.allLowerTierFeaturesLabel}
                    features={tier.features}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground sm:p-8 sm:text-base">
                <p>Checkout links are not configured yet.</p>
                <p className="mt-2 text-xs sm:text-sm">
                  Set WHOP_CHECKOUT_URL_SILVER, WHOP_CHECKOUT_URL_GOLD,
                  WHOP_CHECKOUT_URL_PLATINUM, and WHOP_CHECKOUT_URL_DIAMOND in
                  your environment.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function SponsorCard({
  tierId,
  title,
  priceLabel,
  href,
  badge,
  allLowerTierFeaturesLabel,
  features,
}: {
  tierId: TierId;
  title: string;
  priceLabel: string;
  href: string;
  badge: TierBadgeKind | null;
  allLowerTierFeaturesLabel: string | null;
  features: readonly TierFeature[];
}) {
  return (
    <div
      className="flex h-full flex-col gap-4 rounded-xl border border-border bg-accent/30 p-4 text-left sm:gap-5 sm:p-6"
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h3>
          {badge ? <TierBadge kind={badge} /> : null}
        </div>
        <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
          {priceLabel}
        </p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Per month (+tax)
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {allLowerTierFeaturesLabel ? (
          <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
            All {allLowerTierFeaturesLabel} features, plus:
          </p>
        ) : null}
        <ul className="flex flex-col gap-2.5 text-sm leading-snug sm:gap-3">
          {features.map((feature, index) =>
            typeof feature === "string" ? (
              <li key={index} className="flex gap-2">
                <TierCheckIcon className={tierCheckIconClass} />
                <span className="min-w-0 flex-1 text-pretty">{feature}</span>
              </li>
            ) : (
              <li key={index} className="flex gap-2">
                <TierCheckIcon className={tierCheckIconClass} />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="text-pretty">{feature.label}</span>
                  <ul className="list-outside list-disc space-y-0.5 pl-4 text-xs leading-snug text-muted-foreground marker:text-muted-foreground sm:text-sm">
                    {feature.sublines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>

      <div className="mt-auto pt-1 sm:pt-2">
        {tierId === "diamond" ? (
          <ShinyButton asChild sheen size="lg" className="w-full shadow-none">
            <a href={href} target="_blank" rel="noopener noreferrer">
              Start sponsorship
            </a>
          </ShinyButton>
        ) : (
          <Button
            asChild
            variant={tierId === "platinum" ? "default" : "outline"}
            size="lg"
            className="w-full cursor-pointer tracking-tight shadow-none"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              Start sponsorship
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
