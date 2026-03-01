"use client";
import { Moon, Sun } from "lucide-react";
import { DocSchema } from "@/lib/types";
import { SearchForm } from "./command-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { GithubStars } from "./github-stars";
import { MobileNav } from "./mobile-nav";
import { SpellLogo } from "./spell-logo";
import Link from "next/link";
export default function SiteHeader({ docSchema }: { docSchema?: DocSchema }) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="fixed bg-background top-0 left-0 right-0 z-50 w-full border-b border-border">
      <div className="flex justify-between w-full h-14 items-center gap-4 3xl:max-w-screen-2xl px-4 mx-auto">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {docSchema && <MobileNav docSchema={docSchema} className="md:hidden" />}
            <Link href={"/"} className="flex items-center gap-1.5">
              <SpellLogo size={24} />
              <h1 className="hidden md:inline font-medium" translate="no">Spell UI</h1>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-4 md:gap-6 text-sm">
            <Link href="/docs/introduction" className="text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/docs/components" className="text-muted-foreground hover:text-foreground transition-colors">
              Components
            </Link>
            <Link href="/docs/mcp" className="text-muted-foreground hover:text-foreground transition-colors">
              MCP
            </Link>
            <Link href="#" className="pointer-events-none text-muted-foreground/50 hover:text-foreground transition-colors" aria-disabled="true">
              Sponsor
            </Link>
          </nav>
        </div>
        <div className="flex gap-2 lg:gap-3">
          {/* <Button
            variant="outline"
            className="h-8 px-3 cursor-pointer dark:bg-background dark:hover:bg-input/20 shadow-none"
          >
            <SiGithub />
            12k
            <span className="sr-only">Open Github</span>
          </Button> */}
          {docSchema && <SearchForm docSchema={docSchema} />}
          <GithubStars />
          <Button
            variant="outline"
            size="icon"
            className="size-8 cursor-pointer rounded-full dark:bg-background dark:hover:bg-input/20 shadow-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Switch Theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
