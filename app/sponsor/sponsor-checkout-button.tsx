"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { SponsorCheckoutEmbed } from "./sponsor-checkout-embed";

const TIER_RANK: Record<string, number> = {
  silver: 1,
  gold: 2,
  platinum: 3,
  diamond: 4,
};

function useCurrentTier(isLoggedIn: boolean) {
  const [tierId, setTierId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/sponsor/status")
      .then((res) => res.json())
      .then((data) => setTierId(data.sponsor?.tierId ?? null))
      .catch(() => {});
  }, [isLoggedIn]);

  return tierId;
}

export function SponsorCheckoutButton({
  checkoutUrl,
  planId,
  tierId,
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"a"> & {
  checkoutUrl: string;
  planId: string;
  tierId: string;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const currentTier = useCurrentTier(!!session?.user);
  const [showCheckout, setShowCheckout] = useState(false);

  const currentRank = currentTier ? (TIER_RANK[currentTier] ?? 0) : 0;
  const targetRank = TIER_RANK[tierId] ?? 0;
  const isDowngradeOrSame = currentRank > 0 && targetRank <= currentRank;

  return (
    <>
      <a
        {...props}
        href={isDowngradeOrSame ? undefined : checkoutUrl}
        className={className}
        aria-disabled={isDowngradeOrSame || undefined}
        style={
          isDowngradeOrSame
            ? { pointerEvents: "none", opacity: 0.5 }
            : undefined
        }
        onClick={(e) => {
          e.preventDefault();
          if (isDowngradeOrSame) return;
          if (!session?.user) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
          }
          setShowCheckout(true);
          onClick?.(e);
        }}
      >
        {isDowngradeOrSame
          ? currentRank === targetRank
            ? "Current plan"
            : children
          : children}
      </a>
      {showCheckout && (
        <SponsorCheckoutEmbed
          planId={planId}
          onComplete={(planId, receiptId) => {
            setShowCheckout(false);
            router.push(`/sponsor?checkout_status=success&payment_id=${receiptId ?? ""}`);
          }}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </>
  );
}
