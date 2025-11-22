"use client";

import { AnimationOptions, motion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface SlideUpTextProps {
  children: React.ReactNode;
  split?: "words" | "characters" | "lines";
  stagger?: number;
  from?: "first" | "last" | "center";
  transition?: AnimationOptions;
  className?: string;
  wordClass?: string;
  charClass?: string;
  autoStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
}

export interface SlideUpTextRef {
  startAnimation: () => void;
  reset: () => void;
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

const SlideUpText = forwardRef<SlideUpTextRef, SlideUpTextProps>(
  (
    {
      children,
      split = "words",
      stagger = 0.1,
      from = "first",
      transition = {
        type: "tween",
        ease: [0.625, 0.05, 0, 1],
        duration: 0.5,
      },
      className,
      wordClass,
      charClass,
      autoStart = true,
      onStart,
      onComplete,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const text = typeof children === "string"
      ? children
      : children?.toString() || "";
    const [isAnimating, setIsAnimating] = useState(false);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
        const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
        return Array.from(segmenter.segment(text), ({ segment }) => segment);
      }
      return Array.from(text);
    };

    const elements = useMemo(() => {
      const words = text.split(" ");
      if (split === "characters") {
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      return split === "words" ? text.split(" ") : text.split("\n");
    }, [text, split]);

    const getStaggerDelay = useCallback(
      (index: number) => {
        const total = split === "characters"
          ? elements.reduce(
            (acc, word) =>
              acc +
              (typeof word === "string"
                ? 1
                : word.characters.length + (word.needsSpace ? 1 : 0)),
            0,
          )
          : elements.length;

        if (from === "first") return index * stagger;
        if (from === "last") return (total - 1 - index) * stagger;
        if (from === "center") {
          const center = Math.floor(total / 2);
          return Math.abs(center - index) * stagger;
        }
        return index * stagger;
      },
      [elements, from, stagger, split],
    );

    const startAnimation = useCallback(() => {
      setIsAnimating(true);
      onStart?.();
    }, [onStart]);

    useImperativeHandle(ref, () => ({
      startAnimation,
      reset: () => setIsAnimating(false),
    }));

    useEffect(() => {
      if (autoStart) {
        startAnimation();
      }
    }, [autoStart, startAnimation]);

    const variants = {
      hidden: { y: "100%" },
      visible: (i: number) => ({
        y: 0,
        transition: {
          ...transition,
          delay: ((transition?.delay as number) || 0) + getStaggerDelay(i),
        },
      }),
    };

    return (
      <span
        className={cn(
          className,
          "flex flex-wrap whitespace-pre-wrap",
          split === "lines" && "flex-col",
        )}
        ref={containerRef}
        {...props}
      >
        <span className="sr-only">{text}</span>

        {(split === "characters"
          ? (elements as WordObject[])
          : (elements as string[]).map((el, i, arr) => ({
            characters: [el],
            needsSpace: split === "words" && i !== arr.length - 1,
          }))).map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);

            return (
              <span
                key={wordIndex}
                aria-hidden="true"
                className={cn("inline-flex overflow-hidden", wordClass)}
              >
                {wordObj.characters.map((char, charIndex) => (
                  <span
                    className={cn(
                      charClass,
                      "whitespace-pre-wrap relative overflow-hidden",
                    )}
                    key={charIndex}
                  >
                    <motion.span
                      custom={previousCharsCount + charIndex}
                      initial="hidden"
                      animate={isAnimating ? "visible" : "hidden"}
                      variants={variants}
                      onAnimationComplete={wordIndex === array.length - 1 &&
                          charIndex === wordObj.characters.length - 1
                        ? onComplete
                        : undefined}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
                {wordObj.needsSpace && (
                  <span className="relative overflow-hidden">
                    <motion.span
                      custom={previousCharsCount + wordObj.characters.length}
                      initial="hidden"
                      animate={isAnimating ? "visible" : "hidden"}
                      variants={variants}
                      className="inline-block"
                    >
                      {" "}
                    </motion.span>
                  </span>
                )}
              </span>
            );
          })}
      </span>
    );
  },
);

SlideUpText.displayName = "SlideUpText";

export { SlideUpText };
export type { SlideUpTextProps };
