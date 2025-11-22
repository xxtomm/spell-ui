import type { MDXComponents } from "mdx/types";
import { DemoCanvas, DemoCode, DemoPreview } from "./components/demo-canvas";
import { RegistryItemHeader } from "./components/registry-item-header";
import { CopyCodeButton } from "./components/copy-code-button";
import { InstallationTabs } from "./components/installation-tabs";
import { PropsTable } from "./components/props-table";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    DemoCanvas,
    DemoPreview,
    DemoCode,
    RegistryItemHeader,
    InstallationTabs,
    PropsTable,
    h2: ({ children, ...props }) => {
      return (
        <h2
          className="font-heading mt-16 scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0"
          {...props}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      return (
        <h3
          className="font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
          {...props}
        >
          {children}
        </h3>
      );
    },
    a: ({ children, ...props }) => {
      const isExternal = props.href?.startsWith("http");

      return (
        <a {...props} target={isExternal ? "_blank" : undefined}>
          {children}
        </a>
      );
    },
    pre: ({ children, ...props }) => {
      return (
        <div className="relative" data-code-container="true">
          <pre
            style={props.style}
            className={`max-h-80 overflow-x-auto font-mono border ${
              props.className ?? ""
            }`}
          >
            {children}
          </pre>
          <div className="absolute top-2.5 right-2.5">
            <CopyCodeButton />
          </div>
        </div>
      );
    },
  };
}
