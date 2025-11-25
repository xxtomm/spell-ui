import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Color =
  | "default"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "sky"
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "fuchsia"
  | "emerald";

type SizeVariant = "sm" | "default" | "lg";

interface RichButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: Color;
  size?: SizeVariant;
  className?: string;
  asChild?: boolean;
}

const colorMap: Record<Color, string> = {
  default:
    "from-zinc-900/85 to-zinc-900 dark:from-zinc-100/85 dark:to-zinc-100",
  emerald: "from-emerald-600/85 to-emerald-600 dark:from-emerald-600/75",
  blue: "from-blue-600/85 to-blue-600 dark:from-blue-600/75",
  purple: "from-purple-600/85 to-purple-600 dark:from-purple-600/75",
  pink: "from-pink-600/85 to-pink-600 dark:from-pink-600/75",
  red: "from-red-600/85 to-red-600 dark:from-red-600/75",
  orange: "from-orange-600/85 to-orange-600 dark:from-orange-600/75",
  yellow: "from-yellow-600/85 to-yellow-600 dark:from-yellow-600/75",
  green: "from-green-600/85 to-green-600 dark:from-green-600/75",
  teal: "from-teal-600/85 to-teal-600 dark:from-teal-600/75",
  cyan: "from-cyan-600/85 to-cyan-600 dark:from-cyan-600/75",
  indigo: "from-indigo-600/85 to-indigo-600 dark:from-indigo-600/75",
  violet: "from-violet-600/85 to-violet-600 dark:from-violet-600/75",
  rose: "from-rose-600/85 to-rose-600 dark:from-rose-600/75",
  amber: "from-amber-600/85 to-amber-600 dark:from-amber-600/75",
  lime: "from-lime-600/85 to-lime-600 dark:from-lime-600/75",
  sky: "from-sky-600/85 to-sky-600 dark:from-sky-600/75",
  slate: "from-slate-600/85 to-slate-600 dark:from-slate-600/75",
  gray: "from-gray-600/85 to-gray-600 dark:from-gray-600/75",
  zinc: "from-zinc-700/85 to-zinc-700 dark:from-zinc-700/75",
  neutral: "from-neutral-600/85 to-neutral-600 dark:from-neutral-600/75",
  stone: "from-stone-600/85 to-stone-600 dark:from-stone-600/75",
  fuchsia: "from-fuchsia-600/85 to-fuchsia-600 dark:from-fuchsia-600/75",
};

const textShadowMap: Record<Color, string> = {
  default:
    "[text-shadow:0_1px_0_rgb(0,0,0)] dark:[text-shadow:0_1px_0_rgb(255,255,255)]",
  emerald: "[text-shadow:0_1px_0_var(--color-emerald-800)]",
  blue: "[text-shadow:0_1px_0_var(--color-blue-800)]",
  purple: "[text-shadow:0_1px_0_var(--color-purple-800)]",
  pink: "[text-shadow:0_1px_0_var(--color-pink-800)]",
  red: "[text-shadow:0_1px_0_var(--color-red-800)]",
  orange: "[text-shadow:0_1px_0_var(--color-orange-800)]",
  yellow: "[text-shadow:0_1px_0_var(--color-yellow-800)]",
  green: "[text-shadow:0_1px_0_var(--color-green-800)]",
  teal: "[text-shadow:0_1px_0_var(--color-teal-800)]",
  cyan: "[text-shadow:0_1px_0_var(--color-cyan-800)]",
  indigo: "[text-shadow:0_1px_0_var(--color-indigo-800)]",
  violet: "[text-shadow:0_1px_0_var(--color-violet-800)]",
  rose: "[text-shadow:0_1px_0_var(--color-rose-800)]",
  amber: "[text-shadow:0_1px_0_var(--color-amber-800)]",
  lime: "[text-shadow:0_1px_0_var(--color-lime-800)]",
  sky: "[text-shadow:0_1px_0_var(--color-sky-800)]",
  slate: "[text-shadow:0_1px_0_var(--color-slate-800)]",
  gray: "[text-shadow:0_1px_0_var(--color-gray-800)]",
  zinc: "[text-shadow:0_1px_0_var(--color-zinc-800)]",
  neutral: "[text-shadow:0_1px_0_var(--color-neutral-800)]",
  stone: "[text-shadow:0_1px_0_var(--color-stone-800)]",
  fuchsia: "[text-shadow:0_1px_0_var(--color-fuchsia-800)]",
};

const sizeMap: Record<SizeVariant, string> = {
  sm: "h-8 rounded-md gap-1.5 px-3 text-sm",
  default: "h-9 px-4 py-2 text-sm rounded-md",
  lg: "h-10 rounded-md px-6 text-base",
};

const RichButton = React.forwardRef<HTMLButtonElement, RichButtonProps>(
  (
    {
      children,
      color = "default",
      size = "default",
      className,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const colorClasses = colorMap[color];
    const textShadowClasses = textShadowMap[color];
    const sizeClasses = sizeMap[size];
    const textColor = color === "default"
      ? "text-white dark:text-zinc-900"
      : "text-white";

    return (
      <Comp
        ref={ref}
        className={cn(
          "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 inset-shadow-2xs inset-shadow-white/25 bg-linear-to-b dark:bg-linear-to-t border border-zinc-950/35 shadow-md shadow-zinc-950/20 ring-0 transition-[filter] duration-200 hover:brightness-110 active:brightness-95 dark:border-0 dark:border-zinc-950/50",
          colorClasses,
          sizeClasses,
          textColor,
          className,
        )}
        {...props}
      >
        {asChild
          ? children
          : typeof children === "string"
          ? (
            <span className={cn("relative", textShadowClasses)}>
              {children}
            </span>
          )
          : (
            <div
              className={cn(
                "relative flex items-center gap-2",
                textShadowClasses,
              )}
            >
              {children}
            </div>
          )}
      </Comp>
    );
  },
);

RichButton.displayName = "RichButton";

export { RichButton };
