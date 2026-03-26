"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/registry/spell-ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const TIER_LABELS: Record<string, string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
  diamond: "Diamond",
};

const TIER_ICON_COLORS: Record<string, string> = {
  silver: "currentColor",
  gold: "#d4a017",
  platinum: "#e8e8e8",
  diamond: "#1D9BF1",
};

function useSponsorStatus(isLoggedIn: boolean) {
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

export function AuthButton() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const tierId = useSponsorStatus(!!session?.user);

  if (session?.user) {
    const userInitial =
      session.user.name?.[0]?.toUpperCase() ||
      session.user.email?.[0]?.toUpperCase() ||
      "U";
    const userImage = session.user.image;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="User menu"
          >
            <Avatar className="size-8 cursor-pointer border">
              <AvatarImage
                src={userImage || undefined}
                alt={session.user.name || session.user.email || "User"}
              />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-[200px]">
          <DropdownMenuItem
            className="cursor-default focus:bg-transparent"
            onSelect={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium text-foreground">
                {session.user.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {session.user.email}
              </span>
              {tierId && TIER_LABELS[tierId] && (
                <Badge className="w-fit mt-0.5 gap-1" variant="outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-3.5 shrink-0"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.17112 3.16425C10.7332 1.60215 13.2659 1.60215 14.828 3.16425L14.9325 3.26879C15.2887 3.62495 15.7717 3.82504 16.2754 3.82504C18.4288 3.82504 20.1745 5.57074 20.1745 7.72417C20.1745 8.22786 20.3746 8.71091 20.7308 9.06707L20.8353 9.17161C22.3974 10.7337 22.3974 13.2664 20.8353 14.8285L20.7308 14.933C20.3746 15.2892 20.1745 15.7722 20.1745 16.2759C20.1745 18.4293 18.4288 20.175 16.2754 20.175C15.7717 20.175 15.2887 20.3751 14.9325 20.7313L14.828 20.8358C13.2659 22.3979 10.7332 22.3979 9.17112 20.8358L9.06658 20.7313C8.71042 20.3751 8.22737 20.175 7.72369 20.175C5.57025 20.175 3.82455 18.4293 3.82455 16.2759C3.82455 15.7722 3.62446 15.2892 3.2683 14.933L3.16376 14.8285C1.60166 13.2664 1.60166 10.7337 3.16376 9.17161L3.2683 9.06707C3.62446 8.71091 3.82455 8.22786 3.82455 7.72417C3.82455 5.57074 5.57025 3.82504 7.72369 3.82504C8.22737 3.82504 8.71042 3.62495 9.06658 3.26879L9.17112 3.16425ZM15.3187 10.3235C15.6355 9.87107 15.5254 9.24754 15.073 8.93083C14.6205 8.61411 13.997 8.72415 13.6803 9.1766L10.8193 13.2636L9.65802 12.2475C9.24238 11.8838 8.61062 11.9259 8.24693 12.3416C7.88325 12.7572 7.92537 13.389 8.34101 13.7526L10.341 15.5026C10.5547 15.6897 10.8379 15.777 11.1198 15.7428C11.4018 15.7086 11.6559 15.5562 11.8187 15.3235L15.3187 10.3235Z"
                      fill={TIER_ICON_COLORS[tierId] ?? "currentColor"}
                    />
                  </svg>
                  {TIER_LABELS[tierId]} Sponsor
                </Badge>
              )}
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/settings">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="size-4 shrink-0"
                aria-hidden
              >
                <path
                  d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx={12}
                  cy={12}
                  r={3}
                  stroke="currentColor"
                  strokeWidth={2}
                />
              </svg>
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="relative size-4 shrink-0">
              <Sun className="absolute inset-0 size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute inset-0 size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </span>
            Switch theme
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive [&_svg]:text-destructive hover:bg-accent hover:text-destructive focus:bg-accent focus:text-destructive"
            onSelect={async () => {
              await authClient.signOut();
              router.refresh();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 shrink-0 text-destructive"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 5C5.89543 5 5 5.89543 5 7L5 17C5 18.1046 5.89543 19 7 19H11.25C11.8023 19 12.25 19.4477 12.25 20C12.25 20.5523 11.8023 21 11.25 21H7C4.79086 21 3 19.2091 3 17L3 7C3 4.79086 4.79086 3 7 3L11.25 3C11.8023 3 12.25 3.44772 12.25 4C12.25 4.55228 11.8023 5 11.25 5L7 5ZM14.7929 6.79289C15.1834 6.40237 15.8166 6.40237 16.2071 6.79289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.2071 17.2071C15.8166 17.5976 15.1834 17.5976 14.7929 17.2071C14.4024 16.8166 14.4024 16.1834 14.7929 15.7929L17.5858 13H8.75C8.19772 13 7.75 12.5523 7.75 12C7.75 11.4477 8.19772 11 8.75 11L17.5858 11L14.7929 8.20711C14.4024 7.81658 14.4024 7.18342 14.7929 6.79289Z"
                fill="currentColor"
              />
            </svg>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      asChild
      variant="outline"
      className="h-8 px-3 cursor-pointer dark:bg-background dark:hover:bg-input/20 shadow-none"
    >
      <Link href="/login">Sign in</Link>
    </Button>
  );
}
