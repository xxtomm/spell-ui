import { DocSchema } from "@/lib/types";
import { SearchForm } from "./command-menu";
import { MobileNav } from "./mobile-nav";
import { SpellLogo } from "./spell-logo";
import { GithubStars } from "./github-stars";
import { AuthButton } from "./auth-button";
import Link from "next/link";

export default function SiteHeader({ docSchema }: { docSchema?: DocSchema }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full" style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}>
      {/* Title bar — Win2000 gradient bar */}
      <div className="win2k-titlebar h-7 flex items-center justify-between px-2 select-none">
        <div className="flex items-center gap-1.5">
          <SpellLogo size={14} className="[&_path]:fill-white" />
          <span className="text-xs font-bold text-white tracking-tight">Spell UI — Documentation</span>
        </div>
        {/* Window control buttons */}
        <div className="flex items-center gap-0.5">
          <button className="win2k-button !px-1.5 !py-0 text-[10px] min-w-[16px] h-[14px] leading-none font-bold">_</button>
          <button className="win2k-button !px-1.5 !py-0 text-[10px] min-w-[16px] h-[14px] leading-none font-bold">□</button>
          <button className="win2k-button !px-1.5 !py-0 text-[10px] min-w-[16px] h-[14px] leading-none font-bold text-[#cc0000]">✕</button>
        </div>
      </div>

      {/* Menu bar */}
      <div className="win2k-menubar flex items-center justify-between">
        <div className="flex items-center gap-0">
          {docSchema && <MobileNav docSchema={docSchema} className="md:hidden mr-2" />}
          <Link href="/" className="win2k-menubar-item font-bold flex items-center gap-1">
            <SpellLogo size={14} />
            <span className="hidden md:inline">File</span>
          </Link>
          <Link href="/docs/introduction" className="win2k-menubar-item">
            <span className="underline">D</span>ocs
          </Link>
          <Link href="/docs/components" className="win2k-menubar-item">
            <span className="underline">C</span>omponents
          </Link>
          <Link href="/docs/mcp" className="win2k-menubar-item">
            <span className="underline">M</span>CP
          </Link>
          <Link href="/sponsor" className="win2k-menubar-item">
            <span className="underline">S</span>ponsor
          </Link>
          <span className="win2k-menubar-item text-[#808080] cursor-default">Help</span>
        </div>
        <div className="flex items-center gap-1 pr-1">
          {docSchema && <SearchForm docSchema={docSchema} />}
          <GithubStars />
          <AuthButton />
        </div>
      </div>

      {/* Toolbar / Address bar */}
      <div
        className="flex items-center gap-2 px-2 py-1 text-[11px]"
        style={{ backgroundColor: "#D4D0C8", borderBottom: "1px solid #808080" }}
      >
        <button className="win2k-button text-[10px]">◀ Back</button>
        <button className="win2k-button text-[10px]">▶ Forward</button>
        <button className="win2k-button text-[10px]">⟳ Refresh</button>
        <div className="flex items-center gap-1 flex-1">
          <span className="text-[11px] shrink-0">Address:</span>
          <div
            className="win2k-inset flex-1 px-1 py-0.5 text-[11px] truncate"
            style={{ backgroundColor: "#FFFFFF", minWidth: 0 }}
          >
            spell-ui.com/docs/introduction
          </div>
          <button className="win2k-button text-[10px]">Go</button>
        </div>
      </div>
    </header>
  );
}
