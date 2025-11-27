"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import LabelInput from "@/registry/spell-ui/label-input";
import { Spinner } from "@/registry/spell-ui/spinner";
import { Check } from "lucide-react";
import Link from "next/link";

export default function EarlyAccessPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const [response] = await Promise.all([
        fetch("/api/access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }),
        new Promise((resolve) => setTimeout(resolve, 500)),
      ]);

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setShowSpinner(true);
            router.push("/docs/introduction");
            router.refresh();
          }, 400);
        }, 600);
      } else {
        setError("Invalid password");
        setTimeout(() => setError(""), 2000);
      }
    } catch {
      setError("Something went wrong");
      setTimeout(() => setError(""), 2000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      animate={exiting ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {showSpinner ? (
        <Spinner size="md" speed="fast" />
      ) : (
        <div className="w-full max-w-xs space-y-6">
          <div className="text-center space-y-2">
            <div
              className={cn(
                "relative flex items-center justify-center size-8 mx-auto transition-colors duration-200",
                error && "text-destructive"
              )}
            >
              <motion.div
                className="absolute"
                animate={
                  error
                    ? { x: [0, -5, 5, 0] }
                    : success
                      ? { scale: 0.75, opacity: 0, filter: "blur(4px)" }
                      : { scale: 1, opacity: 1, filter: "blur(0px)" }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><g fill="currentColor"><path d="m6.5,9v-2.5c0-1.933,1.567-3.5,3.5-3.5h0c1.933,0,3.5,1.567,3.5,3.5v2.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="m14,8H6c-1.6543,0-3,1.3457-3,3v4c0,1.6543,1.3457,3,3,3h8c1.6543,0,3-1.3457,3-3v-4c0-1.6543-1.3457-3-3-3Zm-3,5.5c0,.5522-.4473,1-1,1s-1-.4478-1-1v-1c0-.5522.4473-1,1-1s1,.4478,1,1v1Z" strokeWidth="0" fill="currentColor"></path></g></svg>
              </motion.div>
              <motion.div
                className="absolute"
                initial={{ scale: 0.75, opacity: 0, filter: "blur(4px)" }}
                animate={
                  success
                    ? { scale: 1, opacity: 1, filter: "blur(0px)" }
                    : { scale: 0.75, opacity: 0, filter: "blur(4px)" }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Check className="size-8 text-emerald-500" strokeWidth={2.5} />
              </motion.div>
            </div>
            <p className="mx-auto flex-col flex text-sm text-center font-medium text-muted-foreground">
              <span>Early access only. </span>
              <span>Enter the password to access the site.</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <LabelInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            <Button type="submit" variant="secondary" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" speed="fast" /> : "Submit"}
            </Button>
          </form>
        </div>
      )}
      <Link href="/docs/introduction" prefetch className="hidden" aria-hidden />
    </motion.div>
  );
}
