"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextMarqueeProps {
  children: React.ReactNode[];
  speed?: number;
  className?: string;
  prefix?: React.ReactNode;
  height?: number;
}

export function TextMarquee({
  children,
  speed = 1,
  className,
  prefix,
  height = 200,
}: TextMarqueeProps) {
  const count = React.Children.count(children);

  return (
    <>
      <style>
        {`
          @keyframes slide-vertical {
            to {
              translate: 0 var(--destination);
            }
          }
        `}
      </style>
      <div className={cn("flex relative", className)}>
        <div className="flex relative overflow-hidden flex-row gap-1 items-center w-min h-min">
          {prefix && (
            <div className="whitespace-pre size-auto relative">
              {prefix}
            </div>
          )}
          <div
            className="opacity-100 mask-[linear-gradient(rgba(0,0,0,0)_0%,rgb(0,0,0)_43.6902%,rgba(0,0,0,0)_100%)] relative w-auto overflow-hidden"
            style={{ height: `${height}px` }}
          >
            <div
              className="relative h-full"
              style={{
                "--count": count,
                "--speed": speed,
              } as React.CSSProperties}
            >
              {React.Children.map(children, (child, index) => (
                <div
                  key={index}
                  className="h-[40px] flex items-center"
                  style={{
                    "--index": index,
                    "--origin": `calc((var(--count) - var(--index)) * 100%)`,
                    "--destination": `calc((var(--index) + 1) * -100%)`,
                    "--duration": `calc(var(--speed) * ${count}s)`,
                    "--delay":
                      `calc((var(--duration) / var(--count)) * var(--index) - var(--duration))`,
                    translate: `0 var(--origin)`,
                    animation:
                      `slide-vertical var(--duration) var(--delay) infinite linear`,
                  } as React.CSSProperties}
                >
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
