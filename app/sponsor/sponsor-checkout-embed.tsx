"use client";

import { useState } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

export function SponsorCheckoutEmbed({
  planId,
  onComplete,
  onClose,
}: {
  planId: string;
  onComplete?: (planId: string, receiptId?: string) => void;
  onClose: () => void;
}) {
  const { resolvedTheme } = useTheme();
  const [completed, setCompleted] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
        />
        <motion.div
          className="relative z-10 w-full max-w-md overflow-y-auto rounded-t-2xl bg-background shadow-lg sm:max-h-[90dvh] sm:rounded-2xl"
          style={{ maxHeight: "85dvh" }}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-medium">Checkout</span>
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close checkout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="size-4"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <WhopCheckoutEmbed
              planId={planId}
              theme={resolvedTheme === "dark" ? "dark" : "light"}
              skipRedirect
              onComplete={(planId, receiptId) => {
                setCompleted(true);
                onComplete?.(planId, receiptId);
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
