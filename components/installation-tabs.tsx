"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlockCommand } from "@/components/code-block-command";

interface InstallationTabsProps {
  item: string;
  children?: React.ReactNode;
}

export function InstallationTabs({ item, children }: InstallationTabsProps) {
  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList className="not-prose bg-transparent">
        <TabsTrigger
          value="cli"
          className="rounded-md data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]"
        >
          CLI
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="rounded-md data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]"
        >
          Manual
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cli">
        <CodeBlockCommand item={item} />
      </TabsContent>

      <TabsContent value="manual" className="[&_pre]:my-0">
        {children}
      </TabsContent>
    </Tabs>
  );
}
