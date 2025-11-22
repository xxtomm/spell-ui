"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type RingColor =
  | "muted"
  | "primary"
  | "secondary"
  | "destructive"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "pink"
  | "orange"
  | "cyan"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "lime"
  | "emerald"
  | "sky"
  | "slate"
  | "fuchsia";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  ringColor?: RingColor;
  containerClassName?: string;
}

const ringColorMap: Record<RingColor, string> = {
  muted: "focus:ring-muted",
  primary: "focus:ring-primary",
  secondary: "focus:ring-secondary",
  destructive: "focus:ring-destructive",
  red: "focus:ring-red-600",
  blue: "focus:ring-blue-600",
  green: "focus:ring-green-600",
  yellow: "focus:ring-yellow-600",
  purple: "focus:ring-purple-600",
  pink: "focus:ring-pink-600",
  orange: "focus:ring-orange-600",
  cyan: "focus:ring-cyan-600",
  indigo: "focus:ring-indigo-600",
  violet: "focus:ring-violet-600",
  rose: "focus:ring-rose-600",
  amber: "focus:ring-amber-600",
  lime: "focus:ring-lime-600",
  emerald: "focus:ring-emerald-600",
  sky: "focus:ring-sky-600",
  slate: "focus:ring-slate-600",
  fuchsia: "focus:ring-fuchsia-600",
};

export function LabelInput({
  label = "Your Email",
  ringColor = "muted",
  containerClassName,
  className,
  type = "email",
  placeholder = "",
  ...props
}: LabelInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType ? (isVisible ? "text" : "password") : type;

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={cn("group relative max-w-72 w-full", containerClassName)}>
      <input
        className={cn(
          "block outline-none peer text-primary w-full px-3.5 h-10 text-sm rounded-lg border focus:ring-2 dark:bg-neutral-950 dark:border-neutral-700/75",
          isPasswordType && "pr-9",
          ringColorMap[ringColor],
          className,
        )}
        placeholder={placeholder}
        type={inputType}
        {...props}
      />
      <label className="absolute block inset-y-0 px-2 bg-white dark:bg-neutral-950 text-sm left-[7px] h-fit text-nowrap my-auto -translate-y-[19px] peer-focus:-translate-y-[19px] text-muted-foreground pointer-events-none transition-transform will duration-200 scale-[.8] origin-top-left peer-placeholder-shown:scale-100 peer-focus:scale-[.8] peer-placeholder-shown:translate-y-0">
        {label}
      </label>
      {isPasswordType && (
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
        >
          {isVisible
            ? <EyeOffIcon size={16} aria-hidden="true" />
            : <EyeIcon size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

export default LabelInput;
