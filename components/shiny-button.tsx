import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const shinyButtonKeyframes = `@keyframes shiny-button-shine{0%{left:-110%}60%,100%{left:120%}}`;

const shinyButtonVariants = cva(
  "group relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 isolate",
  {
    variants: {
      variant: {
        default:
          "cursor-pointer bg-[#FFD700] text-zinc-900 shadow-xs hover:brightness-95 dark:bg-[#E8C547] dark:text-zinc-950",
        black:
          "cursor-pointer border border-border bg-background text-foreground shadow-xs hover:brightness-95",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function ShinyButtonSheen() {
  return (
    <span
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
        "opacity-0 transition-opacity duration-300 ease-out",
        "group-hover:opacity-100 group-focus-visible:opacity-100",
      )}
      aria-hidden
    >
      <span
        className={cn(
          "pointer-events-none absolute top-[-20px] bottom-0 h-[calc(100%+40px)] w-[50px]",
          "rotate-[20deg] bg-[hsla(0,0%,100%,0.8)] blur-[20px]",
          "[backface-visibility:hidden] dark:bg-[hsla(0,0%,100%,0.6)]",
          "[animation:none] motion-safe:group-hover:[animation:shiny-button-shine_3s_ease-in-out_infinite]",
          "motion-safe:group-focus-visible:[animation:shiny-button-shine_3s_ease-in-out_infinite]",
        )}
      />
    </span>
  );
}

function ShinyButton({
  className,
  variant,
  size,
  asChild = false,
  sheen = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof shinyButtonVariants> & {
    asChild?: boolean;
    sheen?: boolean;
  }) {
  const classes = cn(shinyButtonVariants({ variant, size, className }));

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    if (!sheen) {
      return (
        <Slot data-slot="shiny-button" className={classes} {...props}>
          {child}
        </Slot>
      );
    }
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: shinyButtonKeyframes }} />
        <Slot data-slot="shiny-button" className={classes} {...props}>
          {React.cloneElement(child, {
            children: (
              <>
                <span className="relative z-[1]">{child.props.children}</span>
                <ShinyButtonSheen />
              </>
            ),
          })}
        </Slot>
      </>
    );
  }

  if (!sheen) {
    return (
      <button
        type="button"
        data-slot="shiny-button"
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shinyButtonKeyframes }} />
      <button
        type="button"
        data-slot="shiny-button"
        className={classes}
        {...props}
      >
        <span className="relative z-[1]">{children}</span>
        <ShinyButtonSheen />
      </button>
    </>
  );
}

export { ShinyButton, shinyButtonVariants };
