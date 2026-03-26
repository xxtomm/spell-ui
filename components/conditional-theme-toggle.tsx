"use client";

import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";

export function ConditionalThemeToggle() {
  const { data: session, isPending } = authClient.useSession();
  if (session?.user) return null;
  return <ThemeToggle />;
}
