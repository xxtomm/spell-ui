"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, Copy } from "lucide-react";
import { useState } from "react";

export function CopyCodeButton() {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Button
      variant="outline"
      size="icon"
      className="size-7 dark:bg-[#191919] dark:hover:bg-[#212121]"
      onClick={(e) => {
        const container = e.currentTarget.closest("[data-code-container]");
        const pre = container?.querySelector("pre");

        if (!pre) return;

        navigator.clipboard.writeText(pre.textContent ?? "");
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }}
    >
      {isCopied
        ? <CheckIcon className="size-3.5 text-emerald-500" />
        : <Copy className="size-3.5" />}
    </Button>
  );
}
