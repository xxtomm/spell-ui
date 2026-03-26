"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { AuthBrandMark } from "@/components/auth/auth-brand-mark";
import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user && !isPending) router.push("/");
  }, [session, isPending, router]);

  async function handleSignIn(provider: "google" | "github") {
    setIsSigningIn(provider);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      setIsSigningIn(null);
    }
  }

  if (isPending) return null;
  if (session?.user) return null;

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center">
          <AuthBrandMark />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Create New Account</h1>
      </div>

      <div className="mt-4 w-full">
        <div className="mx-auto flex w-full max-w-sm flex-col gap-3">
          {/* <Button
            type="button"
            className="w-full bg-zinc-100 hover:bg-zinc-100/90 text-zinc-900 transition-transform duration-150 ease-out will-change-transform active:scale-[0.97] cursor-pointer shadow-none"
            size="lg"
            onClick={() => handleSignIn("google")}
            disabled={isSigningIn !== null}
            aria-label="Sign up with Google"
          >
            <GoogleIcon />
          </Button> */}

          <Button
            type="button"
            className="w-full bg-zinc-800 hover:bg-zinc-800/90 transition-transform duration-150 ease-out will-change-transform active:scale-[0.97] cursor-pointer shadow-none"
            size="lg"
            onClick={() => handleSignIn("github")}
            disabled={isSigningIn !== null}
            aria-label="Sign up with GitHub"
          >
            <SiGithub className="size-5 text-white" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center">
        <span>Already have an account?</span>
        <Link
          href="/login"
          className="inline-flex w-fit items-center gap-x-0.5 rounded text-sm font-medium leading-none tracking-tight text-primary transition-colors duration-300 hover:text-primary/85 focus-ring lg:leading-none [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:translate-x-0.5"
        >
          <span>Sign in</span>
          <ArrowRight aria-hidden />
        </Link>
      </p>
    </>
  );
}
