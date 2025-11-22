"use client";

import { motion } from "motion/react";

type Props = {
  children: string;
  className?: string;
  duration?: number;
  split?: 'words' | 'characters';
};

export function RandomizedText({ children, className, duration = 0.75, split = 'characters' }: Props) {

  let units: string[];

  if (split === 'words') {
    units = children.split(/\s+/).filter(unit => unit.length > 0);
  } else {
    units = Array.from(children);
  }

  const total = units.length;
  const effectiveTotal = Math.max(1, total);

  const shuffle = <T,>(arr: T[]) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const order = shuffle([...Array(total).keys()]);

  const baseStagger = duration / (effectiveTotal * 1.2);

  const staggerDelay = baseStagger * 0.9;
  const neighborDelay = baseStagger * 2;

  const charDuration = 0.15;

  const delays = units.map((_, i) => {
    const orderIndex = order.indexOf(i);
    let delay = orderIndex * staggerDelay;

    for (let offset = -2; offset <= 2; offset++) {
      if (offset === 0) continue;

      const neighborIndex = i + offset;
      if (neighborIndex >= 0 && neighborIndex < total) {
        const neighborOrderIndex = order.indexOf(neighborIndex);

        if (neighborOrderIndex < orderIndex) {
          const distance = Math.abs(offset);
          const neighborBaseDelay = neighborOrderIndex * staggerDelay;
          const additionalDelay = distance === 1 ? neighborDelay : neighborDelay * 0.5;

          delay = Math.max(delay, neighborBaseDelay + additionalDelay);
        }
      }
    }

    return delay;
  });

  return (
    <motion.span initial="hidden" animate="visible" className={className || "inline-block"}>
      {units.map((unit, i) => (
        <span key={i}>
          <motion.span
            className="inline-block"
            style={split === 'words' ? {} : { whiteSpace: "pre" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  delay: delays[i],
                  duration: charDuration,
                  ease: "easeOut",
                },
              },
            }}
          >
            {split === 'characters' && unit === " " ? "\u00A0" : unit}
          </motion.span>

          {split === 'words' && i < total - 1 && ' '}
        </span>
      ))}
    </motion.span>
  );
}