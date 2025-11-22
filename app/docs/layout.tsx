import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { getDocSchema } from "@/lib/doc";
import SiteHeader from "@/components/site-header";

const docSchema = await getDocSchema();

export default function DocLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SidebarProvider className="flex flex-col">
        <SiteHeader docSchema={docSchema} />
        <div className="3xl:max-w-screen-2xl mx-auto flex w-full pt-14">
          <AppSidebar docSchema={docSchema} />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
