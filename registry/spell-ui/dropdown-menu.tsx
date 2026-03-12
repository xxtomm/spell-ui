"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { ChevronRight, ChevronDown } from "lucide-react";


interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = React.useContext(DropdownContext);
  if (!ctx) throw new Error("useDropdown must be used within a DropdownMenu");
  return ctx;
}

interface SubContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}
const SubContext = React.createContext<SubContextValue | null>(null);


interface DropdownMenuProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: DropdownMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const open = controlledOpen ?? internalOpen;
  const setOpen = React.useCallback(
    (val: boolean) => {
      setInternalOpen(val);
      onOpenChange?.(val);
    },
    [onOpenChange]
  );

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, setOpen]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div ref={rootRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}



const triggerBase = [
  "inline-flex items-center justify-center gap-1.5",
  "text-sm font-medium select-none cursor-pointer",
  "border border-[#2e2e2e] bg-[#141414] text-[#e0e0e0]",
  "shadow-sm shadow-black/30",
  "transition-all duration-150",
  "hover:bg-[#1f1f1f] hover:text-white hover:border-[#3a3a3a]",
  "active:scale-[0.97] active:brightness-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");



interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

function DropdownMenuTrigger({ children, asChild, className }: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdown();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        (children as any).props.onClick?.(e);
        setOpen(!open);
      },
      "aria-expanded": open,
      "aria-haspopup": "menu",
    });
  }

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen(!open)}
      className={cn(triggerBase, "h-9 rounded-lg px-4", className)}
    >
      {children}
      <ChevronDown
        className={cn(
          "size-3.5 text-[#666] transition-transform duration-200",
          open && "rotate-180"
        )}
      />
    </button>
  );
}



interface DropdownMenuSplitTriggerProps {
  children: React.ReactNode;
  onActionClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function DropdownMenuSplitTrigger({
  children,
  onActionClick,
  className,
  disabled,
}: DropdownMenuSplitTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdown();

  return (
    <div
      className={cn(
        "inline-flex items-stretch h-9 rounded-lg overflow-hidden",
        "border border-[#2e2e2e] shadow-sm shadow-black/30",
        "transition-all duration-150",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
    >
      
      <button
        type="button"
        disabled={disabled}
        onClick={onActionClick}
        className={cn(
          "inline-flex items-center px-4 text-sm font-medium select-none cursor-pointer",
          "bg-[#141414] text-[#e0e0e0]",
          "hover:bg-[#1f1f1f] hover:text-white",
          "active:brightness-90",
          "focus-visible:outline-none",
          "transition-colors duration-150"
        )}
      >
        {children}
      </button>

      
      <div className="w-px bg-[#2e2e2e] self-stretch" />

      
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center justify-center px-2.5 cursor-pointer",
          "bg-[#141414] text-[#666]",
          "hover:bg-[#1f1f1f] hover:text-white",
          "active:brightness-90",
          "focus-visible:outline-none",
          "transition-colors duration-150"
        )}
      >
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
    </div>
  );
}


interface DropdownMenuIconTriggerProps {
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function DropdownMenuIconTrigger({
  icon,
  className,
  disabled,
}: DropdownMenuIconTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdown();

  return (
    <button
      ref={triggerRef}
      type="button"
      disabled={disabled}
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen(!open)}
      className={cn(triggerBase, "h-9 w-9 rounded-lg p-0", className)}
    >
      {icon ?? (
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      )}
    </button>
  );
}



interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

function DropdownMenuContent({
  children,
  className,
  align = "start",
  sideOffset = 4,
}: DropdownMenuContentProps) {
  const { open, triggerRef } = useDropdown();
  const [pos, setPos] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const top = rect.bottom + sideOffset + window.scrollY;
    const left =
      align === "end"
        ? rect.right + window.scrollX
        : align === "center"
        ? rect.left + rect.width / 2 + window.scrollX
        : rect.left + window.scrollX;
    setPos({ top, left });
  }, [open, align, sideOffset, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      role="menu"
      aria-orientation="vertical"
      style={{
        ...pos,
        position: "absolute",
        animation: "ddEnter 0.12s ease-out forwards",
        ...(align === "end" ? { transform: "translateX(-100%)" } : {}),
        ...(align === "center" ? { transform: "translateX(-50%)" } : {}),
      }}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden",
        "rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-[#e0e0e0]",
        "shadow-xl shadow-black/50 py-1",
        className
      )}
    >
      <style>{`
        @keyframes ddEnter {
          from { opacity:0; transform:scale(0.96) translateY(-6px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
      {children}
    </div>,
    document.body
  );
}



function DropdownMenuPortal({ children }: { children: React.ReactNode }) {
 
  return <>{children}</>;
}


function DropdownMenuGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div role="group" className={cn(className)}>{children}</div>;
}



function DropdownMenuLabel({
  children,
  className,
  inset,
}: {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}) {
  return (
    <div className={cn("px-3 py-1.5 text-xs font-semibold text-[#555]", inset && "pl-8", className)}>
      {children}
    </div>
  );
}


interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
}

function DropdownMenuItem({ children, className, inset, disabled, onClick, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useDropdown();

  return (
    <button
      role="menuitem"
      type="button"
      disabled={disabled}
      onClick={(e) => {
        if (!disabled) { onClick?.(e); setOpen(false); }
      }}
      className={cn(
        "flex w-full items-center justify-between px-3 py-1.5 text-sm",
        "text-[#d0d0d0] hover:bg-[#262626] hover:text-white",
        "focus:outline-none focus:bg-[#262626]",
        "transition-colors duration-100 cursor-default select-none",
        "disabled:pointer-events-none disabled:opacity-35",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}


function DropdownMenuShortcut({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("ml-auto pl-4 text-xs tracking-widest text-[#444]", className)}>
      {children}
    </span>
  );
}


function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn("my-1 h-px bg-[#272727]", className)} />;
}


function DropdownMenuSub({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <SubContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative" onMouseLeave={() => setOpen(false)}>
        {children}
      </div>
    </SubContext.Provider>
  );
}


function DropdownMenuSubTrigger({
  children,
  className,
  inset,
}: {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}) {
  const sub = React.useContext(SubContext);
  if (!sub) return null;

  return (
    <button
      ref={sub.triggerRef}
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded={sub.open}
      onMouseEnter={() => sub.setOpen(true)}
      onClick={() => sub.setOpen(!sub.open)}
      className={cn(
        "flex w-full items-center justify-between px-3 py-1.5 text-sm",
        "text-[#d0d0d0] hover:bg-[#262626] hover:text-white",
        "focus:outline-none transition-colors duration-100 cursor-default select-none",
        inset && "pl-8",
        className
      )}
    >
      {children}
      <ChevronRight className="ml-auto h-3.5 w-3.5 text-[#555]" />
    </button>
  );
}


function DropdownMenuSubContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const sub = React.useContext(SubContext);
  const [pos, setPos] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (!sub?.open || !sub.triggerRef.current) return;
    const rect = sub.triggerRef.current.getBoundingClientRect();
    setPos({
      top: rect.top + window.scrollY,
      left: rect.right + 4 + window.scrollX,
    });
  }, [sub?.open]);

  if (!sub?.open) return null;

  return createPortal(
    <div
      role="menu"
      style={{ position: "absolute", ...pos, animation: "ddEnter 0.1s ease-out forwards" }}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden",
        "rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-[#e0e0e0]",
        "shadow-xl shadow-black/50 py-1",
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
}



export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSplitTrigger,
  DropdownMenuIconTrigger,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};