import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";

interface PropInformationProps {
  content: React.ReactNode;
}

export function PropInformation({ content }: PropInformationProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-1 transition-colors hover:bg-accent"
          aria-label="More information"
        >
          <InfoIcon className="size-4 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="inline-block w-min text-nowrap max-w-96 py-1.5 px-3 text-sm leading-[18px] text-muted-foreground items-center truncate"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}
