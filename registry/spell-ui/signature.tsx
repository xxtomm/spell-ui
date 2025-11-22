"use client";
import React, { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import opentype from "opentype.js";

export function Signature({
  text = "Signature",
  color = "#000",
  fontSize = 14,
  duration = 1.5,
  className,
}: {
  text?: string;
  color?: string;
  fontSize?: number;
  duration?: number;
  className?: string;
}) {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const height = 100;
  const horizontalPadding = fontSize * 0.1;
  const topMargin = Math.max(5, (height - fontSize) / 2);
  const baseline = Math.min(height - 5, topMargin + fontSize);
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    async function load() {
      const font = await opentype.load("/LaStoriaBoldRegular.otf");

      let x = horizontalPadding;
      const newPaths: string[] = [];

      for (const char of text) {
        const glyph = font.charToGlyph(char);
        const path = glyph.getPath(x, baseline, fontSize);
        newPaths.push(path.toPathData(3));

        const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
        x += advanceWidth * (fontSize / font.unitsPerEm);
      }

      setPaths(newPaths);
      setWidth(x + horizontalPadding);
    }

    load();
  }, [text, fontSize, baseline, horizontalPadding]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="white"
              strokeWidth={fontSize * 0.22}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  delay: i * 0.2,
                  duration,
                  ease: "easeInOut",
                },
                opacity: {
                  delay: i * 0.2 + 0.01,
                  duration: 0.01,
                },
              }}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2}
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: {
              delay: i * 0.2,
              duration,
              ease: "easeInOut",
            },
            opacity: {
              delay: i * 0.2 + 0.01,
              duration: 0.01,
            },
          }}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      ))}

      <g mask={`url(#${maskId})`}>
        {paths.map((d, i) => <path key={i} d={d} fill={color} />)}
      </g>
    </svg>
  );
}
