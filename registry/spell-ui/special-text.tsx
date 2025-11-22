"use client";

import { useEffect, useRef, useState } from "react";

interface SpecialTextProps {
  children: string;
  speed?: number;
  className?: string;
}

const RANDOM_CHARS = "_!X$0-+*#";

function getRandomChar(prevChar?: string): string {
  let char: string;
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
  } while (char === prevChar);
  return char;
}

export function SpecialText({
  children,
  speed = 20,
  className = "",
}: SpecialTextProps) {
  const text = children;
  const [displayText, setDisplayText] = useState<string>(
    " ".repeat(text.length),
  );
  const [currentPhase, setCurrentPhase] = useState<"phase1" | "phase2">(
    "phase1",
  );
  const [animationStep, setAnimationStep] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runPhase1 = () => {
    const maxSteps = text.length * 2;
    const currentLength = Math.min(animationStep + 1, text.length);

    const chars: string[] = [];
    for (let i = 0; i < currentLength; i++) {
      const prevChar = i > 0 ? chars[i - 1] : undefined;
      chars.push(getRandomChar(prevChar));
    }

    for (let i = currentLength; i < text.length; i++) {
      chars.push("\u00A0");
    }

    setDisplayText(chars.join(""));

    if (animationStep < maxSteps - 1) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setCurrentPhase("phase2");
      setAnimationStep(0);
    }
  };

  const runPhase2 = () => {
    const revealedCount = Math.floor(animationStep / 2);
    const chars: string[] = [];

    for (let i = 0; i < revealedCount && i < text.length; i++) {
      chars.push(text[i]);
    }

    if (revealedCount < text.length) {
      if (animationStep % 2 === 0) {
        chars.push("_");
      } else {
        chars.push(getRandomChar());
      }
    }

    for (let i = chars.length; i < text.length; i++) {
      chars.push(getRandomChar());
    }

    setDisplayText(chars.join(""));

    if (animationStep < text.length * 2 - 1) {
      setAnimationStep((prev) => prev + 1);
    } else {
      setDisplayText(text);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (currentPhase === "phase1") {
        runPhase1();
      } else {
        runPhase2();
      }
    }, speed);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentPhase, animationStep, text, speed]);

  useEffect(() => {
    setDisplayText(" ".repeat(text.length));
    setCurrentPhase("phase1");
    setAnimationStep(0);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [text]);

  return (
    <span
      className={`h-4.5 leading-5 inline-flex font-mono font-medium ${className}`}
    >
      {displayText}
    </span>
  );
}
