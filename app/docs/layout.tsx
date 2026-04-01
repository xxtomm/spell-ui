import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { getDocSchema } from "@/lib/doc";
import SiteHeader from "@/components/site-header";

const docSchema = await getDocSchema();

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ fontFamily: "Tahoma, Verdana, Arial, sans-serif" }}>
      <SidebarProvider className="flex flex-col">
        <SiteHeader docSchema={docSchema} />
        {/* Offset for the 3-row Win2k header: titlebar(28px) + menubar(28px) + toolbar(30px) = ~86px */}
        <div
          className="3xl:max-w-screen-2xl mx-auto flex w-full"
          style={{ paddingTop: "86px" }}
        >
          <AppSidebar docSchema={docSchema} />
          <SidebarInset style={{ backgroundColor: "#D4D0C8" }}>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>

      {/* Win2k Status Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-2 py-0.5 text-[11px]"
        style={{
          backgroundColor: "#D4D0C8",
          borderTop: "2px solid",
          borderColor: "#FFFFFF #808080 #808080 #FFFFFF",
          fontFamily: "Tahoma, Verdana, Arial, sans-serif",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="px-4 py-0.5 text-[11px]"
            style={{
              borderRight: "1px solid #808080",
              borderBottom: "1px solid #FFFFFF",
            }}
          >
            ✓ Done
          </span>
          <span className="text-[11px] text-[#444444]">Spell UI Documentation</span>
        </div>
        <div
          className="flex items-center gap-1 text-[11px] px-2"
          style={{ borderLeft: "1px solid #808080" }}
        >
          <span>🌐 Internet</span>
        </div>
      </div>
    </div>
  );
}
