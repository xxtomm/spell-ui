"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { DocSchema } from "@/lib/types";
import { useRouter } from "next/navigation";

export function SearchForm({ docSchema }: { docSchema: DocSchema }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size="sm"
        className="hidden sm:inline-flex cursor-text items-center gap-2 text-sm text-muted-foreground dark:bg-background dark:hover:bg-input/20 shadow-none"
      >
        <Search className="size-4" />
        <span className="pr-8">Search...</span>
        <kbd className="-me-1 font-mono place-content-center grid dark:shadow-[0_0_0_1px_var(--input)] shadow-[0_0_0_1px_var(--input)] text-foreground font-normal min-h-5 min-w-5 rounded text-xs">
          /
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen} showCloseButton={false}>
        <DialogClose className="absolute top-3.5 right-3.5 opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden disabled:pointer-events-none cursor-pointer">
          <span className="place-content-center grid dark:shadow-[0_0_0_1px_var(--input)] shadow-[0_0_0_1px_var(--input)] text-foreground font-normal min-h-5 px-1.5 rounded text-xs">
            Esc
          </span>
        </DialogClose>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>The search results could not be found.</CommandEmpty>
          {docSchema.map((section) => (
            <CommandGroup key={section.title} heading={section.title}>
              {section.items.map((item) => (
                <CommandItem
                  onSelect={() => {
                    router.push(`/docs/${item.id}`);
                    setOpen(false);
                  }}
                  key={item.id}
                >
                  {item.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
