"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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
  tierId,
  children,
  className,
  onClick,
  ...props
}: React.ComponentProps<"a"> & {
  checkoutUrl: string;
  tierId: string;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();
  const currentTier = useCurrentTier(!!session?.user);

  const currentRank = currentTier ? (TIER_RANK[currentTier] ?? 0) : 0;
  const targetRank = TIER_RANK[tierId] ?? 0;
  const isDowngradeOrSame = currentRank > 0 && targetRank <= currentRank;

  return (
    <a
      {...props}
      href={isDowngradeOrSame ? undefined : checkoutUrl}
      target={isDowngradeOrSame ? undefined : "_blank"}
      rel={isDowngradeOrSame ? undefined : "noopener noreferrer"}
      className={className}
      aria-disabled={isDowngradeOrSame || undefined}
      style={
        isDowngradeOrSame
          ? { pointerEvents: "none", opacity: 0.5 }
          : undefined
      }
      onClick={(e) => {
        if (isDowngradeOrSame) {
          e.preventDefault();
          return;
        }
        if (!session?.user) {
          e.preventDefault();
          router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
          return;
        }
        onClick?.(e);
      }}
    >
      {isDowngradeOrSame
        ? currentRank === targetRank
          ? "Current plan"
          : children
        : children}
    </a>
  );
}
