"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
import { BlurReveal } from "@/registry/spell-ui/blur-reveal";
import { RichButton } from "@/registry/spell-ui/rich-button";

function shootFireworks() {
  const duration = 1500;
  const end = Date.now() + duration;
  const purples = ["#7c3aed", "#8b5cf6"];
  const whites = ["#ffffff", "#f0f0ff"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 1,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: purples,
      zIndex: 9999,
    });
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: whites,
      zIndex: 9999,
    });
    confetti({
      particleCount: 1,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: purples,
      zIndex: 9999,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: whites,
      zIndex: 9999,
    });

    requestAnimationFrame(frame);
  };

  frame();
}

export function SponsorSuccessOverlay() {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    shootFireworks();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
          />

          <div className="relative z-10 flex max-w-lg flex-col items-center gap-5 px-6 text-center">
            <BlurReveal
              as="h2"
              delay={0.15}
              speedReveal={3.5}
              speedSegment={1}
              className="text-balance text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl"
            >
              Thank you for sponsoring!
            </BlurReveal>

            <motion.p
              initial={{ opacity: 0, filter: "blur(5px)", y: 8 }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              className="text-pretty text-sm leading-relaxed text-white/70 sm:text-base"
            >
              Your sponsorship has been received. We appreciate your support for
              Spell UI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, filter: "blur(5px)", y: 8 }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: {
                  delay: 0.75,
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              className="mt-2"
            >
              <RichButton
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setVisible(false);
                  router.push("/settings");
                }}
              >
                Continue
              </RichButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
