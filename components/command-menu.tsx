"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { CornerDownLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
} from "@/components/ui/command";
import { DocSchema } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useIsMac } from "@/hooks/use-is-mac";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useConfig } from "@/hooks/use-config";

interface PageItem {
  value: string;
  label: string;
  url: string;
  isComponent: boolean;
}

interface PageGroup {
  value: string;
  items: PageItem[];
}

export function SearchForm({ docSchema }: { docSchema: DocSchema }) {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"page" | "component" | null>(
    null,
  );
  const [copyPayload, setCopyPayload] = useState("");
  const router = useRouter();
  const isMac = useIsMac();
  const { copyToClipboard } = useCopyToClipboard();
  const [config] = useConfig();
  const packageManager = config.packageManager;

  const groupedItems = useMemo<PageGroup[]>(() => {
    return docSchema.map((group) => {
      const isComponentGroup = group.title !== "Getting Started";
      return {
        value: group.title,
        items: group.items.map((item) => ({
          value: item.id,
          label: item.title,
          url: `/docs/${item.id}`,
          isComponent: isComponentGroup,
        })),
      };
    });
  }, [docSchema]);

  const handlePageHighlight = useCallback(
    (item: PageItem | null) => {
      if (!item) {
        setSelectedType(null);
        setCopyPayload("");
        return;
      }

      if (item.isComponent) {
        const componentName = item.url.split("/").pop();
        setSelectedType("component");
        const componentArg = `@spell/${componentName}`;
        let cmd: string;
        switch (packageManager) {
          case "pnpm":
            cmd = `pnpm dlx shadcn@latest add ${componentArg}`;
            break;
          case "bun":
            cmd = `bunx --bun shadcn@latest add ${componentArg}`;
            break;
          case "yarn":
            cmd = `yarn dlx shadcn@latest add ${componentArg}`;
            break;
          default:
            cmd = `npx shadcn@latest add ${componentArg}`;
        }
        setCopyPayload(cmd);
      } else {
        setSelectedType("page");
        setCopyPayload("");
      }
    },
    [packageManager],
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
        if (selectedType === "page" || selectedType === "component") {
          copyToClipboard(copyPayload);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, selectedType, copyToClipboard]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="hidden sm:inline-flex cursor-text items-center gap-2 text-sm text-muted-foreground dark:bg-background dark:hover:bg-input/20 shadow-none"
      >
        <Search className="size-4" />
        <span className="pr-6 lg:hidden">Search...</span>
        <span className="pr-8 hidden lg:inline">Search documentation...</span>
        <kbd className="-me-1 font-mono place-content-center grid dark:shadow-[0_0_0_1px_var(--input)] shadow-[0_0_0_1px_var(--input)] text-foreground font-normal min-h-5 min-w-5 rounded text-xs">
          /
        </kbd>
      </Button>
      <CommandDialog onOpenChange={setOpen} open={open}>
        <CommandDialogPopup>
          <Command
            items={groupedItems}
            onItemHighlighted={(highlightedValue) => {
              const item = highlightedValue as PageItem | null;
              handlePageHighlight(item);
            }}
          >
            <CommandInput placeholder="Type a command or search..." />
            <CommandPanel>
              <CommandEmpty>The search results could not be found.</CommandEmpty>
              <CommandList>
                {(group: PageGroup, _index: number) => (
                  <Fragment key={group.value}>
                    <CommandGroup items={group.items}>
                      <CommandGroupLabel>{group.value}</CommandGroupLabel>
                      <CommandCollection>
                        {(item: PageItem) => (
                          <CommandItem
                            key={item.value}
                            onClick={() => {
                              router.push(item.url);
                              setOpen(false);
                            }}
                            value={item.value}
                          >
                            {item.label}
                          </CommandItem>
                        )}
                      </CommandCollection>
                    </CommandGroup>
                    <CommandSeparator />
                  </Fragment>
                )}
              </CommandList>
            </CommandPanel>
            <CommandFooter>
              <div className="flex items-center gap-1.5">
                <span className="whitespace-nowrap">Go to Page</span>
                <kbd className="font-mono place-content-center grid shadow-[0_0_0_1px_var(--border)] font-normal min-h-4 px-1 rounded text-xs">
                  <CornerDownLeft className="size-2.5" />
                </kbd>
              </div>
              {copyPayload ? (
                <div className="flex min-w-0 items-center gap-2">
                  <span className="truncate font-mono">
                    {copyPayload}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="inline-flex items-center shadow-[0_0_0_1px_var(--border)] font-normal min-h-4 px-1 rounded text-[10px]">
                      {isMac ? "⌘" : "Ctrl"}
                      <span>C</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="place-content-center grid shadow-[0_0_0_1px_var(--border)] font-normal min-h-4 px-1 rounded text-xs">
                    Esc
                  </span>
                </div>
              )}
            </CommandFooter>
          </Command>
        </CommandDialogPopup>
      </CommandDialog>
    </>
  );
}
