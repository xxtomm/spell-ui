"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface LogosCarouselProps {
  children: React.ReactNode;
  stagger?: number;
  count?: number;
  className?: string;
  duration?: number;
  interval?: number;
  initialDelay?: number;
}

export function LogosCarousel({
  children,
  stagger = 0.14,
  count,
  className,
  duration = 600,
  interval = 2500,
  initialDelay = 500,
}: LogosCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [animate, setAnimate] = React.useState(false);
  const [nextIndex, setNextIndex] = React.useState(1);

  const childrenArray = React.Children.toArray(children);
  const logosPerGroup = count || childrenArray.length;
  const groups: React.ReactNode[][] = [];

  for (let i = 0; i < childrenArray.length; i += logosPerGroup) {
    groups.push(childrenArray.slice(i, i + logosPerGroup));
  }

  const groupsLength = groups.length;

  React.useEffect(() => {
    const id = setTimeout(() => {
      setAnimate(true);
    }, initialDelay);

    return () => {
      clearTimeout(id);
    };
  }, [initialDelay]);

  React.useEffect(() => {
    if (!animate || groupsLength === 0) {
      return;
    }

    function loop() {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % groupsLength;
        setNextIndex((newIndex + 1) % groupsLength);
        return newIndex;
      });
    }

    const intervalId = setInterval(loop, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [animate, interval, groupsLength]);

  if (groupsLength === 0) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        @keyframes logos-enter {
          0% {
            transform: translateY(40px);
            filter: blur(4px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            filter: blur(0px);
            opacity: 1;
          }
        }

        @keyframes logos-exit {
          0% {
            transform: translateY(0);
            filter: blur(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(-40px);
            filter: blur(4px);
            opacity: 0;
          }
        }
      `}</style>
      <div
        className="max-w-[720px] grid place-items-center w-full"
      >
        {groups.map((group, groupIndex) => {
          const isCurrent = groupIndex === index;
          const isNext = groupIndex === nextIndex && animate;
          const isVisible = isCurrent || isNext;

          return (
            <div
              key={groupIndex}
              className={cn(
                "flex w-full justify-center gap-10",
                className
              )}
              style={{ 
                gridArea: "1 / 1", 
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              {group.map((logo, logoIndex) => {
                return (
                  <Logo
                    key={logoIndex}
                    state={isCurrent ? "exit" : "enter"}
                    animate={animate && isVisible}
                    index={logoIndex}
                    stagger={stagger}
                    duration={duration}
                  >
                    {logo}
                  </Logo>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

interface LogoProps {
  children: React.ReactNode;
  animate?: boolean;
  index: number;
  state?: "enter" | "exit";
  stagger?: number;
  duration?: number;
}

function Logo({
  children,
  animate,
  index,
  state = "enter",
  stagger = 0.14,
  duration = 500,
}: LogoProps) {
  const delay = index * stagger;
  const durationMs = duration;

  const animationStyles: React.CSSProperties = {
    animationDelay: `${delay}s`,
    animationDuration: `${durationMs}ms`,
    animationFillMode: "both",
  };

  if (!animate) {
    if (state === "enter") {
      return (
        <div
          className="opacity-0"
          style={animationStyles}
        >
          {children}
        </div>
      );
    }
    return (
      <div
        className="opacity-100"
        style={animationStyles}
      >
        {children}
      </div>
    );
  }

  const animationName = state === "enter" ? "logos-enter" : "logos-exit";

  return (
    <div
      style={{
        ...animationStyles,
        animationName,
        animationTimingFunction: "ease",
      }}
    >
      {children}
    </div>
  );
}

export default LogosCarousel;
