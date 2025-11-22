"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyPageButtonProps {
  content: string;
}

export function CopyPageButton({ content }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Button
      className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 relative cursor-pointer"
      variant="outline"
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
            <Copy className="h-4 w-4" />
          </div>
        </div>
        <span>Copy this page</span>
      </div>
    </Button>
  );
}