"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import React, { lazy, Suspense, useMemo } from "react";
import { Spinner } from "@/registry/spell-ui/spinner";

interface DemoWrapperProps {
  file: string;
  code: React.ReactNode;
  center?: boolean;
  className?: string;
}

export function DemoWrapper({
  file,
  code,
  center,
  className,
}: DemoWrapperProps) {
  const Component = useMemo(() => {
    const path = file.replace("./", "");
    const modulePath = `/docs/${path.replace(".tsx", "")}`;
    return lazy(() =>
      import(modulePath).then((module) => ({
        default: module.Demo || module.default,
      }))
    );
  }, [file]);

  return (
    <Tabs defaultValue="preview">
      <TabsList className="not-prose">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview">
        <div
          className={cn(
            "p-10 border rounded-md not-prose preview flex min-h-64 w-full justify-center md:min-h-64 items-center",
            center && "flex items-center justify-center",
            className,
          )}
        >
          <Suspense fallback={<Spinner size="lg" />}>
            <Component />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="code" className="[&_pre]:my-0">
        {code}
      </TabsContent>
    </Tabs>
  );
}
