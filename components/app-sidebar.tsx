"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DISCORD_URL, GITHUB_URL, X_URL } from "@/lib/constants";
import { DocSchema } from "@/lib/types";
import { SiDiscord, SiGithub, SiX } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({
  docSchema,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  docSchema: DocSchema;
}) {
  const pathname = usePathname();
  const { toggleSidebar, isMobile } = useSidebar();
  //   const { theme, setTheme } = useTheme();
  const data = {
    navMain: docSchema,
  };

  return (
    <Sidebar className="mt-18" {...props}>
      {/* mt-16 > for header height */}
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="data-[active=true]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[active=true]:not-dark:bg-white transition-all"
                      asChild
                      isActive={pathname === `/docs/${item.id}`}
                      onClick={() => {
                        if (isMobile) {
                          toggleSidebar();
                        }
                      }}
                    >
                      <Link href={`/docs/${item.id}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="flex-1"></span>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <SiGithub />
              <span className="sr-only">Open Github Repository</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href={X_URL} target="_blank" rel="noopener noreferrer">
              <SiX />
              <span className="sr-only">Open X</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              <SiDiscord />
              <span className="sr-only">Open Discord</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
