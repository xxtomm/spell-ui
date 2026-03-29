"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";

  return (
    <>
      <style jsx>
        {`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes scroll-y {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-y-reverse {
          from {
            transform: translateY(-50%);
          }
          to {
            transform: translateY(0);
          }
        }

        .marquee-scroller {
          display: flex;
          animation: ${
          isVertical
            ? (direction === "up" ? "scroll-y" : "scroll-y-reverse")
            : (direction === "left" ? "scroll" : "scroll-reverse")
        } ${duration}s linear infinite;
        }

        .marquee-scroller.paused {
          animation-play-state: paused;
        }
      `}
      </style>
      <div
        ref={containerRef}
        className={cn(
          "flex w-full overflow-hidden",
          isVertical && "flex-col",
          className,
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "marquee-scroller flex shrink-0",
            isVertical && "flex-col",
            isPaused && "paused",
          )}
        >
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
