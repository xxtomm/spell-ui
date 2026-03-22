import { DocSchema } from "@/lib/types";
import { SearchForm } from "./command-menu";
import { MobileNav } from "./mobile-nav";
import { SpellLogo } from "./spell-logo";
import { ConditionalThemeToggle } from "./conditional-theme-toggle";
import { GithubStars } from "./github-stars";
import { AuthButton } from "./auth-button";
import Link from "next/link";

export default function SiteHeader({ docSchema }: { docSchema?: DocSchema }) {
  return (
    <header className="fixed bg-background top-0 left-0 right-0 z-50 w-full border-b border-border">
      <div className="flex justify-between w-full h-14 items-center gap-4 3xl:max-w-screen-2xl px-4 mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {docSchema && <MobileNav docSchema={docSchema} className="md:hidden" />}
            <Link href="/" className="flex items-center gap-1.5">
              <SpellLogo size={24} />
              <h1 className="hidden md:inline font-medium text-nowrap" translate="no">
                Spell UI
              </h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm">
            <Link
              href="/docs/introduction"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/docs/components"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Components
            </Link>
            <Link
              href="/docs/mcp"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              MCP
            </Link>
            <Link
              href="/sponsor"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sponsor
            </Link>
          </nav>
        </div>
        <div className="flex gap-2 lg:gap-3 items-center">
          {docSchema && <SearchForm docSchema={docSchema} />}
          <GithubStars />
          <AuthButton />
          <ConditionalThemeToggle />
        </div>
      </div>
    </header>
  );
}
