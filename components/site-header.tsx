"use client";
import { Moon, Sun } from "lucide-react";
import { DocSchema } from "@/lib/types";
import { SearchForm } from "./command-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { SidebarTrigger } from "./ui/sidebar";

export default function SiteHeader({ docSchema }: { docSchema?: DocSchema }) {
  const { theme, setTheme } = useTheme();
  return (
    <header className="fixed bg-background top-0 left-0 right-0 z-50 w-full border-b border-border">
      <div className="flex justify-between w-full h-14 items-center gap-4 3xl:max-w-screen-2xl px-4 mx-auto">
        <div className="flex items-center">
          <SidebarTrigger className="md:hidden mr-1" />
          <h1 className="font-medium" translate="no">Spell UI</h1>
        </div>
        <div className="flex gap-2 lg:gap-3">
          <Button
            variant="outline"
            className="h-8 px-3 cursor-pointer dark:bg-background dark:hover:bg-input/20 shadow-none"
          >
            <SiGithub />
            12k
            <span className="sr-only">Open Github</span>
          </Button>
          {docSchema && <SearchForm docSchema={docSchema} />}
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
