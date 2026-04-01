"use client";

import { useState } from "react";
import { Check, ChevronDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";
import { SiClaude, SiOpenai, SiV0 } from "@icons-pack/react-simple-icons";

interface DocCopySectionProps {
  content: string;
  url: string;
}

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${
    encodeURIComponent(
      `I'm looking at this spell ui documentation: https://spell.sh${url}.
Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`,
    )
  }`;
}

export function DocCopySection({ content, url }: DocCopySectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      trackEvent("copy_page", { url });
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  let pathname = "/docs";
  try {
    pathname = new URL(url).pathname;
  } catch {
    pathname = url;
  }

  const menuItems = {
    viewMarkdown: () => {
      const mdUrl = `${pathname}.md`;
      return (
        <a
          href={mdUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          onClick={() => trackEvent("view_markdown", { url: mdUrl })}
        >
          <svg strokeLinejoin="round" viewBox="0 0 22 16" className="h-4 w-4">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 2.25H2.5C1.80964 2.25 1.25 2.80964 1.25 3.5V12.5C1.25 13.1904 1.80964 13.75 2.5 13.75H19.5C20.1904 13.75 20.75 13.1904 20.75 12.5V3.5C20.75 2.80964 20.1904 2.25 19.5 2.25ZM2.5 1C1.11929 1 0 2.11929 0 3.5V12.5C0 13.8807 1.11929 15 2.5 15H19.5C20.8807 15 22 13.8807 22 12.5V3.5C22 2.11929 20.8807 1 19.5 1H2.5ZM3 4.5H4H4.25H4.6899L4.98715 4.82428L7 7.02011L9.01285 4.82428L9.3101 4.5H9.75H10H11V5.5V11.5H9V7.79807L7.73715 9.17572L7 9.97989L6.26285 9.17572L5 7.79807V11.5H3V5.5V4.5ZM15 8V4.5H17V8H19.5L17 10.5L16 11.5L15 10.5L12.5 8H15Z"
              fill="currentColor"
            />
          </svg>
          View as Markdown
        </a>
      );
    },
    v0: () => (
      <a
        href={getPromptUrl("https://v0.dev", url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
        onClick={() => trackEvent("open_in_v0", { url })}
      >
        <SiV0 />
        Open in v0
      </a>
    ),
    chatgpt: () => (
      <a
        href={getPromptUrl("https://chatgpt.com", url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
        onClick={() => trackEvent("open_in_chatgpt", { url })}
      >
        <SiOpenai />
        Open in ChatGPT
      </a>
    ),
    claude: () => (
      <a
        href={getPromptUrl("https://claude.ai/new", url)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2"
        onClick={() => trackEvent("open_in_claude", { url })}
      >
        <SiClaude />
        Open in Claude
      </a>
    ),
  };

  const dropdownContent = (
    <>
      {Object.entries(menuItems).map(([key, value]) => (
        <DropdownMenuItem key={key} asChild>
          {value()}
        </DropdownMenuItem>
      ))}
    </>
  );

  const popoverContent = (
    <>
      {Object.entries(menuItems).map(([key, value]) => (
        <Button
          key={key}
          variant="ghost"
          size="sm"
          asChild
          className="w-full justify-start"
        >
          {value()}
        </Button>
      ))}
    </>
  );

  return (
    <Popover>
      <div className="hidden md:inline-flex -space-x-px rounded-full shadow-none rtl:space-x-reverse mr-2">
        <Button
          className="rounded-none border-r-1 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 relative cursor-pointer"
          variant="secondary"
          size="sm"
          onClick={handleCopy}
        >
          <div className="flex items-center gap-2">
            <div className="relative w-4 h-4">
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-200 flex items-center justify-center",
                  copied
                    ? "scale-100 opacity-100 blur-none"
                    : "scale-70 opacity-0 blur-[2px]",
                )}
              >
                <Check className="h-4 w-4 text-emerald-500" />
              </div>
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-200 flex items-center justify-center",
                  copied
                    ? "scale-0 opacity-0 blur-[2px]"
                    : "scale-100 opacity-100 blur-none",
                )}
              >
                <Copy className="h-4 w-4 text-muted-foreground dark:text-[#b5b5b5]" />
              </div>
            </div>
            <span>Copy this page</span>
          </div>
        </Button>

        {/* Desktop Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden sm:flex">
            <Button
              className="cursor-pointer rounded-l-none size-8 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 "
              variant="secondary"
              size="icon"
              aria-label="Open options"
            >
              <ChevronDown size={16} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {dropdownContent}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Popover */}
        <PopoverTrigger asChild className="flex sm:hidden">
          <Button
            className="rounded-none size-8 shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10"
            variant="outline"
            size="icon"
            aria-label="Open options"
          >
            <ChevronDown size={16} aria-hidden="true" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="w-52"
        align="start"
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
}
