"use client";

import { Button } from "@/components/ui/button";
import { Check, Terminal } from "lucide-react";
import { useState } from "react";

export function CommandCopyButton({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    navigator.clipboard.writeText(command);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-1 h-7 items-center gap-1 overflow-hidden rounded-md border p-[2px]">
      <Button
        variant="ghost"
        className="w-full text-left h-5 rounded-sm"
        onClick={handleClick}
      >
        {copied
          ? <Check className="size-4" />
          : <Terminal className="size-4" />}
        <span className="block flex-1 truncate">{command}</span>
      </Button>
    </div>
  );
}
