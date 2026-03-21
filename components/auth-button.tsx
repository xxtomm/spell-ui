"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function AuthButton() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  if (isPending) {
    return <Skeleton className="size-8 shrink-0 rounded-full" aria-hidden />;
  }

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
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-foreground">
                {session.user.name || "User"}
              </span>
              <span className="text-xs text-muted-foreground">
                {session.user.email}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
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
      <Link href="/login">Sign In</Link>
    </Button>
  );
}
