"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type SizeVariant = "sm" | "default" | "lg";

interface FlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: SizeVariant;
  borderColor?: string;
  className?: string;
  asChild?: boolean;
}

const sizeMap: Record<SizeVariant, string> = {
  sm: "h-8 rounded-full gap-1.5 px-3 text-sm",
  default: "h-9 px-4 py-2 text-sm rounded-full",
  lg: "h-10 rounded-full px-6 text-sm",
};

const borderRadiusMap: Record<SizeVariant, number> = {
  sm: 16,
  default: 18,
  lg: 20,
};

const FlowButton = React.forwardRef<
  HTMLButtonElement,
  FlowButtonProps
>(
  (
    {
      children,
      size = "default",
      borderColor = "var(--rotating-border-color)",
      className,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

    React.useImperativeHandle(ref, () => buttonRef.current!);

    const Comp = asChild ? Slot : "button";

    React.useEffect(() => {
      if (buttonRef.current) {
        const { offsetWidth, offsetHeight } = buttonRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    }, [children]);

    const buttonSize = sizeMap[size];
    const radius = borderRadiusMap[size];

    const createRoundedRectPath = (w: number, h: number, r: number) => {
      return `M${r},0.5 H${w - r} A${r},${r} 0 0 1 ${w - 0.5},${r} V${
        h - r
      } A${r},${r} 0 0 1 ${w - r},${h - 0.5} H${r} A${r},${r} 0 0 1 0.5,${
        h - r
      } V${r} A${r},${r} 0 0 1 ${r},0.5 Z`;
    };

    return (
      <>
        <style>
          {`
            @keyframes dash-flow {
              to {
                stroke-dashoffset: -10;
              }
            }
          `}
        </style>
        <div className="relative inline-block group pointer-events-none">
          <div
            className="absolute inset-[2px] group-hover:inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-all ease-out duration-200 z-10"
            style={{ borderRadius: `${radius}px` }}
          >
            <svg
              width={dimensions.width}
              height={dimensions.height}
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              aria-hidden="true"
              preserveAspectRatio="none"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
              <path
                d={createRoundedRectPath(
                  dimensions.width,
                  dimensions.height,
                  radius,
                )}
                fill="none"
                stroke={borderColor}
                strokeWidth="1"
                strokeDasharray="6,4"
                strokeDashoffset="0"
                className="group-hover:animate-[dash-flow_1s_linear_infinite]"
              />
            </svg>
          </div>
          <Comp
            ref={buttonRef}
            className={cn(
              "relative z-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 pointer-events-auto cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-[550] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-neutral-100 dark:bg-muted/50 text-primary dark:hover:bg-transparent hover:bg-transparent",
              buttonSize,
              className,
            )}
            {...props}
          >
            {children}
          </Comp>
        </div>
      </>
    );
  },
);

FlowButton.displayName = "FlowButton";

export { FlowButton };
export type { FlowButtonProps };
