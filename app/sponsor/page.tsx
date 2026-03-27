import SiteHeader from "@/components/site-header";
import { ShinyButton } from "@/components/shiny-button";
import { Button } from "@/components/ui/button";
import { getDocSchema } from "@/lib/doc";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/registry/spell-ui/badge";
import { BlurReveal } from "@/registry/spell-ui/blur-reveal";
import { whop } from "@/lib/whop";
import { SponsorSection } from "@/components/sponsor-section";
import { SiteFooter } from "@/components/site-footer";
import { SponsorCheckoutButton } from "./sponsor-checkout-button";
import { SponsorSuccessOverlay } from "./sponsor-success-overlay";

type SponsorFeatureLine =
  | string
  | { label: string; sublines: string[] };

type SponsorHighlightKind = "bestValue" | "topTier";

interface SponsorTierConfig {
  id: "silver" | "gold" | "platinum" | "diamond";
  title: string;
  price: number;
  priceDisplay?: string;
  envKey: string;
  planEnvKey: string;
  highlight: SponsorHighlightKind | null;
  baseTierLabel: string | null;
  features: readonly SponsorFeatureLine[];
}

const SPONSOR_TIERS = [
  {
    id: "silver",
    title: "Silver",
    price: 10,
    envKey: "WHOP_CHECKOUT_URL_SILVER",
    planEnvKey: "WHOP_PLAN_ID_SILVER",
    highlight: null,
    baseTierLabel: null,
    features: [
      "Support Spell UI",
      "Custom Role on Discord server",
      {
        label: "Small logo & link:",
        sublines: ["Sponsor section", "GitHub README"],
      },
    ] satisfies SponsorFeatureLine[],
  },
  {
    id: "gold",
    title: "Gold",
    price: 30,
    priceDisplay: "$30",
    envKey: "WHOP_CHECKOUT_URL_GOLD",
    planEnvKey: "WHOP_PLAN_ID_GOLD",
    highlight: "bestValue",
    baseTierLabel: "Silver",
    features: [
      {
        label: "Medium logo & link:",
        sublines: ["Sponsor section", "GitHub README", "Site Footer"],
      },
    ] satisfies SponsorFeatureLine[],
  },
  {
    id: "platinum",
    title: "Platinum",
    price: 100,
    envKey: "WHOP_CHECKOUT_URL_PLATINUM",
    planEnvKey: "WHOP_PLAN_ID_PLATINUM",
    highlight: null,
    baseTierLabel: "Gold",
    features: [
      {
        label: "Large logo & link:",
        sublines: [
          "Sponsor section",
          "GitHub README",
          "Site Footer",
          "Homepage mention",
        ],
      },
    ] satisfies SponsorFeatureLine[],
  },
  {
    id: "diamond",
    title: "Diamond",
    price: 500,
    envKey: "WHOP_CHECKOUT_URL_DIAMOND",
    planEnvKey: "WHOP_PLAN_ID_DIAMOND",
    highlight: "topTier",
    baseTierLabel: "Platinum",
    features: [
      "Early access to upcoming components",
      {
        label: "Featured logo & link:",
        sublines: [
          "Sponsor section",
          "GitHub README",
          "Site Footer",
          "Homepage feature",
        ],
      },
    ] satisfies SponsorFeatureLine[],
  },
] as const satisfies readonly SponsorTierConfig[];

type SponsorTierId = (typeof SPONSOR_TIERS)[number]["id"];

type SponsorTierRow = (typeof SPONSOR_TIERS)[number];

type SponsorTierWithCheckout = SponsorTierRow & { checkoutUrl: string; planId: string };

type SponsorFeatureIconKind = "heart" | "role" | "logo" | "earlyAccess";

function getSponsorFeatureIconKind(
  line: SponsorFeatureLine,
): SponsorFeatureIconKind {
  if (typeof line === "string") {
    if (line === "Support Spell UI") return "heart";
    if (line.startsWith("Custom Role")) return "role";
    if (line.startsWith("Early access")) return "earlyAccess";
    return "heart";
  }
  if (line.label.includes("logo & link")) return "logo";
  return "logo";
}

function SponsorIconSvg({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

function SponsorFeatureLineIcon({
  kind,
  className,
}: {
  kind: SponsorFeatureIconKind;
  className?: string;
}) {
  const iconClass = cn("size-5 shrink-0 text-primary", className);
  switch (kind) {
    case "heart":
      return (
        <SponsorIconSvg className={iconClass}>
          <path
            d="M12 5.76835C18.1619 -0.481837 28.7252 11.1257 12 20.5C-4.72523 11.1257 5.83803 -0.481838 12 5.76835Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M12 9.2998V8.2998M12 15.7998V16.4998M9.875 14.1748C10.6369 15.6748 13.875 15.5929 13.875 13.9092C13.875 11.7844 10.0655 12.8055 10.0655 10.6331C10.0655 9.16937 12.4094 8.95912 13.5 9.9413"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
          />
        </SponsorIconSvg>
      );
    case "role":
      return (
        <SponsorIconSvg className={iconClass}>
          <path
            d="M11 20H7.75C6.09315 20 4.69455 18.6232 5.20302 17.0463C6.12257 14.1946 8.42872 12 12 12"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx={12}
            cy={7.75}
            r={4.25}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M15 18.0044L17 20L20.5 14"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SponsorIconSvg>
      );
    case "logo":
      return (
        <SponsorIconSvg className={iconClass}>
          <path
            d="M15.5 6.5C15.5 8.433 13.933 10 12 10C10.067 10 8.5 8.433 8.5 6.5C8.5 4.567 10.067 3 12 3C13.933 3 15.5 4.567 15.5 6.5Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M12 13C9.02155 13 6.67433 14.5539 5.43335 16.8621C4.59624 18.4191 6.02749 20 7.79525 20H12"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.8955 14.4583L18.1115 12.42C18.0142 12.167 17.7711 12 17.5 12C17.2289 12 16.9858 12.167 16.8885 12.42L16.1045 14.4583C15.9902 14.7554 15.7554 14.9902 15.4583 15.1045L13.42 15.8885C13.167 15.9858 13 16.2289 13 16.5C13 16.7711 13.167 17.0142 13.42 17.1115L15.4583 17.8955C15.7554 18.0098 15.9902 18.2446 16.1045 18.5417L16.8885 20.58C16.9858 20.833 17.2289 21 17.5 21C17.7711 21 18.0142 20.833 18.1115 20.58L18.8955 18.5417C19.0098 18.2446 19.2446 18.0098 19.5417 17.8955L21.58 17.1115C21.833 17.0142 22 16.7711 22 16.5C22 16.2289 21.833 15.9858 21.58 15.8885L19.5417 15.1045C19.2446 14.9902 19.0098 14.7554 18.8955 14.4583Z"
            fill="currentColor"
          />
          <path
            d="M4.89045 9.03518L4.40769 7.78C4.34281 7.61131 4.18074 7.5 4 7.5C3.81926 7.5 3.65719 7.61131 3.59231 7.78L3.10955 9.03518C3.00797 9.29927 2.79927 9.50797 2.53518 9.60955L1.28 10.0923C1.11131 10.1572 1 10.3193 1 10.5C1 10.6807 1.11131 10.8428 1.28 10.9077L2.53518 11.3905C2.79927 11.492 3.00797 11.7007 3.10955 11.9648L3.59231 13.22C3.65719 13.3887 3.81926 13.5 4 13.5C4.18074 13.5 4.34281 13.3887 4.40769 13.22L4.89045 11.9648C4.99203 11.7007 5.20073 11.492 5.46482 11.3905L6.72 10.9077C6.88869 10.8428 7 10.6807 7 10.5C7 10.3193 6.88869 10.1572 6.72 10.0923L5.46482 9.60955C5.20073 9.50797 4.99203 9.29927 4.89045 9.03518Z"
            fill="currentColor"
          />
        </SponsorIconSvg>
      );
    case "earlyAccess":
      return (
        <SponsorIconSvg className={iconClass}>
          <path
            d="M10.9999 9.5L10.2643 3.98246C10.1243 2.93274 10.9409 2 11.9999 2C13.059 2 13.8756 2.93274 13.7356 3.98246L12.9999 9.5M10.3349 14.1159L5.92436 17.5118C5.08526 18.1579 3.86917 17.917 3.33967 16.9999C2.81017 16.0828 3.20963 14.9092 4.18869 14.5055L9.33486 12.3839M14.665 12.3838L19.8112 14.5055C20.7903 14.9092 21.1897 16.0827 20.6602 16.9999C20.1307 17.917 18.9146 18.1579 18.0755 17.5118L13.665 14.1159M8.99995 20.4879C9.93828 20.8196 10.948 21 11.9999 21C13.0519 21 14.0616 20.8196 14.9999 20.4879M6.14936 5.15807C5.39297 5.80486 4.73181 6.58911 4.20586 7.50008C3.6799 8.41106 3.33131 9.37577 3.14936 10.3542M20.8505 10.3541C20.6686 9.37566 20.32 8.41095 19.794 7.49998C19.2681 6.589 18.6069 5.80476 17.8505 5.15796M14.4999 12C14.4999 13.3807 13.3807 14.5 11.9999 14.5C10.6192 14.5 9.49995 13.3807 9.49995 12C9.49995 10.6193 10.6192 9.5 11.9999 9.5C13.3807 9.5 14.4999 10.6193 14.4999 12Z"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SponsorIconSvg>
      );
  }
}

function SponsorHighlightBestValueGlyph() {
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

function SponsorHighlightTopTierGlyph() {
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

function SponsorHighlightBadge({ kind }: { kind: SponsorHighlightKind }) {
  if (kind === "bestValue") {
    return (
      <Badge
        className="gap-1"
        variant="outline"
        title="Strong visibility for the monthly price"
      >
        <SponsorHighlightBestValueGlyph />
        Best Value
      </Badge>
    );
  }
  return (
    <Badge
      className="gap-1"
      title="Highest tier: full visibility and early access"
    >
      <SponsorHighlightTopTierGlyph />
      Top Tier
    </Badge>
  );
}

async function verifyCheckoutSuccess(paymentId: string | undefined): Promise<boolean> {
  if (!paymentId || !whop) return false;
  try {
    const payment = await whop.payments.retrieve(paymentId);
    return payment.status === "paid";
  } catch {
    return false;
  }
}

export default async function SponsorPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout_status?: string; payment_id?: string }>;
}) {
  const { checkout_status, payment_id } = await searchParams;
  const isVerifiedSuccess =
    checkout_status === "success" && (await verifyCheckoutSuccess(payment_id));
  const docSchema = await getDocSchema();
  const sponsorTiers = SPONSOR_TIERS.map((tier) => ({
    ...tier,
    checkoutUrl: process.env[tier.envKey] ?? "",
    planId: process.env[tier.planEnvKey] ?? "",
  })).filter((tier): tier is SponsorTierWithCheckout =>
    Boolean(tier.planId),
  );

  return (
    <div className="relative flex flex-col min-h-dvh pt-14">
      <SiteHeader docSchema={docSchema} />
      <main className="flex min-h-0 flex-1 flex-col justify-center px-4 py-12 sm:px-5 sm:py-16 md:px-6">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 md:gap-12">
          <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
            <BlurReveal
              as="h1"
              letterSpacing="-0.020em"
              className="text-balance text-[1.75rem] font-medium leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Sponsorship
            </BlurReveal>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sponsor Spell UI to help fund its open-source library and docs.
              Logo placement and a Discord role are included on every tier.
            </p>
          </div>

          <SponsorSection />

          {sponsorTiers.length > 0 ? (
            <section
              aria-label="Sponsorship plans"
              className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-4"
            >
              {sponsorTiers.map((tier) => (
                <SponsorPlanCard
                  key={tier.id}
                  tierId={tier.id}
                  title={tier.title}
                  priceLabel={
                    "priceDisplay" in tier && tier.priceDisplay
                      ? tier.priceDisplay
                      : `$${tier.price}`
                  }
                  checkoutUrl={tier.checkoutUrl}
                  planId={tier.planId}
                  highlight={tier.highlight}
                  baseTierLabel={tier.baseTierLabel}
                  featureLines={tier.features}
                />
              ))}
            </section>
          ) : (
            <section
              aria-labelledby="sponsor-checkout-unavailable-heading"
              className="mx-auto flex w-full max-w-lg flex-col items-center rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-center sm:px-6 sm:py-10"
            >
              <h2
                id="sponsor-checkout-unavailable-heading"
                className="text-balance text-sm font-medium tracking-tight text-foreground sm:text-base"
              >
                Sponsorship checkout unavailable
              </h2>
              <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                Online signup is not configured for this deployment. Browse
                the documentation or try again later.
              </p>
              <Button asChild variant="outline" size="sm" className="mt-5">
                <Link href="/docs/introduction">Documentation</Link>
              </Button>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      {isVerifiedSuccess && <SponsorSuccessOverlay />}
    </div>
  );
}

interface SponsorPlanCardProps {
  tierId: SponsorTierId;
  title: string;
  priceLabel: string;
  checkoutUrl: string;
  planId: string;
  highlight: SponsorHighlightKind | null;
  baseTierLabel: string | null;
  featureLines: readonly SponsorFeatureLine[];
}

function SponsorPlanCard({
  tierId,
  title,
  priceLabel,
  checkoutUrl,
  planId,
  highlight,
  baseTierLabel,
  featureLines,
}: SponsorPlanCardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl bg-background p-4 text-left ring ring-foreground/15 sm:gap-5 sm:p-6">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h2>
          {highlight ? <SponsorHighlightBadge kind={highlight} /> : null}
        </div>
        <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">
          {priceLabel}
        </p>
        <p className="text-xs text-muted-foreground sm:text-sm">
          Per month (+tax)
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {baseTierLabel ? (
          <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
            All {baseTierLabel} features, plus:
          </p>
        ) : null}
        <ul className="flex flex-col gap-2.5 text-sm leading-snug sm:gap-3">
          {featureLines.map((line, index) =>
            typeof line === "string" ? (
              <li key={index} className="flex items-start gap-2">
                <SponsorFeatureLineIcon
                  kind={getSponsorFeatureIconKind(line)}
                />
                <span className="min-w-0 flex-1 text-pretty">{line}</span>
              </li>
            ) : (
              <li key={index} className="flex items-start gap-2">
                <SponsorFeatureLineIcon
                  kind={getSponsorFeatureIconKind(line)}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="text-pretty">{line.label}</span>
                  <ul className="list-outside list-disc space-y-0.5 pl-4 text-xs leading-snug text-muted-foreground marker:text-muted-foreground sm:text-sm">
                    {line.sublines.map((sub) => (
                      <li key={sub}>{sub}</li>
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
            <SponsorCheckoutButton checkoutUrl={checkoutUrl} planId={planId} tierId={tierId}>
              Start sponsorship
              <span className="sr-only"> (opens in a new tab)</span>
            </SponsorCheckoutButton>
          </ShinyButton>
        ) : (
          <Button
            asChild
            variant={tierId === "platinum" ? "default" : "outline"}
            size="lg"
            className={cn(
              "w-full cursor-pointer shadow-none",
              tierId !== "platinum" && "bg-background dark:bg-background",
            )}
          >
            <SponsorCheckoutButton checkoutUrl={checkoutUrl} planId={planId} tierId={tierId}>
              Start sponsorship
              <span className="sr-only"> (opens in a new tab)</span>
            </SponsorCheckoutButton>
          </Button>
        )}
      </div>
    </div>
  );
}
