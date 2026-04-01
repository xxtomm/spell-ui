"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { DocSchema } from "@/lib/types";
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
  const data = {
    navMain: docSchema,
  };

  return (
    <Sidebar
      className="mt-0"
      style={{
        backgroundColor: "#D4D0C8",
        borderRight: "2px solid",
        borderRightColor: "#808080",
        fontFamily: "Tahoma, Verdana, Arial, sans-serif",
      }}
      {...props}
    >
      {/* Explorer-style sidebar header */}
      <div
        className="px-2 py-1.5 text-[11px] font-bold"
        style={{
          backgroundColor: "#D4D0C8",
          borderBottom: "1px solid #808080",
          color: "#000080",
        }}
      >
        📁 Explorer
      </div>

      <SidebarContent
        className="max-h-[calc(100vh-140px)] overflow-y-auto"
        style={{ backgroundColor: "#D4D0C8", maskImage: "none" }}
      >
        <div className="h-1 shrink-0" />
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title} style={{ padding: "0" }}>
            <SidebarGroupLabel
              style={{
                fontFamily: "Tahoma, Verdana, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: "bold",
                color: "#000000",
                padding: "4px 8px 2px 8px",
                textTransform: "none",
                letterSpacing: "0",
              }}
            >
              📂 {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu style={{ gap: "0" }}>
                {group.items.map((navItem) => {
                  const isActive = pathname === `/docs/${navItem.id}`;
                  return (
                    <SidebarMenuItem key={navItem.id} style={{ margin: "0" }}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => {
                          if (isMobile) {
                            toggleSidebar();
                          }
                        }}
                        style={{
                          borderRadius: "0",
                          padding: "2px 8px 2px 20px",
                          fontFamily: "Tahoma, Verdana, Arial, sans-serif",
                          fontSize: "11px",
                          color: isActive ? "#FFFFFF" : "#000000",
                          backgroundColor: isActive ? "#0A246A" : "transparent",
                          margin: "0",
                          height: "auto",
                          minHeight: "20px",
                        }}
                      >
                        <Link href={`/docs/${navItem.id}`}>
                          <span style={{ userSelect: "none" }}>
                            📄 {navItem.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <div className="h-4 shrink-0" />
      </SidebarContent>
    </Sidebar>
  );
}
