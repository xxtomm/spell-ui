"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCcw } from "lucide-react";
import React from "react";
import { Suspense } from "react";
import { Spinner } from "@/registry/spell-ui/spinner";

export function DemoCanvas({
  children,
}: {
  children: React.ReactNode;
  className?: string;
  center?: boolean;
}) {
  const [key, setKey] = React.useState(0);
  const [isRotating, setIsRotating] = React.useState(false);

  const handleRefresh = () => {
    setIsRotating(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setIsRotating(false), 500);
  };

  return (
    <Tabs defaultValue="preview">
      <div className="flex items-center justify-between not-prose">
        <TabsList className="bg-transparent">
          <TabsTrigger
            value="preview"
            className="rounded-md data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="rounded-md data-[state=active]:bg-white px-2 text-center data-[state=active]:shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] data-[state=active]:dark:bg-[#0B0B09]"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <button
          onClick={handleRefresh}
          className="cursor-pointer p-1.5 hover:bg-muted rounded-md"
          title="Refresh component"
        >
          <RefreshCcw
            className={cn(
              "h-4 w-4 transition-transform duration-500",
              isRotating && "rotate-180",
            )}
          />
        </button>
      </div>
      <div key={key}>
        {children}
      </div>
    </Tabs>
  );
}

export function DemoPreview({
  children,
  center,
  className,
}: {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <TabsContent value="preview">
      <div
        className={cn(
          "flex w-full p-10 border rounded-sm not-prose preview min-h-64 justify-center md:min-h-80 h-full items-center",
          center && "flex items-center justify-center",
          className,
        )}
      >
        <Suspense fallback={<Spinner size="md" />}>
          {children}
        </Suspense>
      </div>
    </TabsContent>
  );
}

export function DemoCode({ children }: { children: React.ReactNode }) {
  return (
    <TabsContent value="code" className="[&_pre]:my-0">
      {children}
    </TabsContent>
  );
}
