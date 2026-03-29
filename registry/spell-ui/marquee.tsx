"use client";

import React from "react";
import { motion, useAnimationControls } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
  gap?: number;
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  gap = 48,
  ...props
}: MarqueeProps) {
  const controls = useAnimationControls();
  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";
  const isReverse = direction === "right" || direction === "down";

  const from = isReverse ? "-50%" : "0%";
  const to = isReverse ? "0%" : "-50%";

  const getAnimation = () => {
    const target = isVertical
      ? { y: [from, to] }
      : { x: [from, to] };
    return {
      ...target,
      transition: {
        duration,
        ease: "linear" as const,
        repeat: Infinity,
      },
    };
  };

  React.useEffect(() => {
    controls.start(getAnimation());
  }, [controls, isVertical, from, to, duration]);

  const handleHoverStart = () => {
    if (pauseOnHover) controls.stop();
  };

  const handleHoverEnd = () => {
    if (pauseOnHover) {
      controls.start(getAnimation());
    }
  };

  return (
    <div
      className={cn(
        "flex w-full overflow-hidden",
        isVertical && "flex-col",
        className,
      )}
      style={{
        ...(fade && {
          maskImage: isVertical
            ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
            : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
          WebkitMaskImage: isVertical
            ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
            : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
        }),
      }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      {...props}
    >
      <motion.div
        className={cn(
          "flex shrink-0",
          isVertical && "flex-col",
        )}
        style={{ gap }}
        animate={controls}
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
      </motion.div>
    </div>
  );
}
