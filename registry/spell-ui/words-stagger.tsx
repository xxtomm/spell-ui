"use client";

import React from "react";
import { motion, Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface WordsStaggerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  speed?: number;
  autoStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

export function WordsStagger({
  children,
  className,
  stagger = 0.1,
  speed = 0.5,
  autoStart = true,
  onStart,
  onComplete,
}: WordsStaggerProps) {
  const text = React.Children.toArray(children)
    .filter((child) => typeof child === "string")
    .join("");

  const words = text.split(" ").filter((word) => word.length > 0);

  const transition: Transition = {
    type: "tween",
    ease: "easeOut",
    duration: speed,
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition,
    },
  };

  return (
    <motion.div
      className={cn("flex flex-wrap", className)}
      variants={containerVariants}
      initial={autoStart ? "hidden" : false}
      animate={autoStart ? "visible" : undefined}
      onAnimationStart={onStart}
      onAnimationComplete={onComplete}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          variants={wordVariants}
        >
          {word}
          {index < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}
