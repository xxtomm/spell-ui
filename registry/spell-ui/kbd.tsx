import { cn } from "@/lib/utils";

interface KbdProps {
  keys: string[];
  className?: string;
}

const keySymbolMap = {
  command: "⌘",
  cmd: "⌘",
  control: "⌃",
  ctrl: "⌃",
  alt: "⌥",
  option: "⌥",
  enter: "↵",
  return: "↵",
  space: "␣",
  arrowleft: "←",
  left: "←",
  arrowdown: "↓",
  down: "↓",
  arrowup: "↑",
  up: "↑",
  arrowright: "→",
  right: "→",
} as const;

export function Kbd({ keys, className }: KbdProps) {
  const getKeyDisplay = (key: string): string => {
    const lowerKey = key.toLowerCase();
    return keySymbolMap[lowerKey as keyof typeof keySymbolMap] ||
      key.toUpperCase();
  };

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center rounded shadow-sm",
        className,
      )}
    >
      <div className="text-primary text-[10px] pointer-events-none h-4.5 select-none items-center rounded dark:shadow-[0_0_0_1px_rgba(255,255,255,0.145)] shadow-[0_0_0_1px_rgba(0,0,0,0.145)] justify-center font-medium opacity-100 flex px-1.5 gap-1">
        {keys.map((key, index) => (
          <code key={index}>
            {getKeyDisplay(key)}
          </code>
        ))}
      </div>
    </div>
  );
}
