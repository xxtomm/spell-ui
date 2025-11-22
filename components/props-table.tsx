import { cn } from "@/lib/utils";
import { PropInformation } from "./prop-information";

interface PropsTableItem {
  name: string;
  nameDetails?: React.ReactNode;
  type: string;
  typeDetails?: React.ReactNode;
  default?: string;
  defaultDetails?: React.ReactNode;
}

interface PropsTableProps {
  data: PropsTableItem[];
}

export function PropsTable({ data }: PropsTableProps) {
  if (data.length === 0) {
    return (
      <div className="mt-6 flex h-[42px] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30">
        <div className="text-center text-sm text-muted-foreground">
          No Additional Props
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 w-full overflow-x-scroll rounded-lg border border-border">
      <table className="w-full not-prose">
        <thead className="border-b border-border bg-muted/30 text-left">
          <tr>
            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
              Prop
            </th>
            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
              Type
            </th>
            <th className="px-4 py-3 text-sm font-medium text-muted-foreground">
              Default
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.name}
              className={cn(
                "text-left",
                index !== data.length - 1 && "border-b border-border",
              )}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <code className="rounded-md dark:bg-muted/50 bg-muted/75 px-2 py-0.5 font-mono text-neutral-600 dark:text-neutral-300 text-sm">
                    {item.name}
                  </code>
                  {item.nameDetails && (
                    <PropInformation content={item.nameDetails} />
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                {item.type
                  ? (
                    <div className="flex items-center gap-1">
                      <code className="rounded-md dark:bg-muted/50 bg-muted/75 px-2 py-0.5 font-mono text-neutral-600 dark:text-neutral-300 text-sm">
                        {item.type}
                      </code>
                      {item.typeDetails && (
                        <PropInformation content={item.typeDetails} />
                      )}
                    </div>
                  )
                  : <span className="text-muted-foreground">-</span>}
              </td>
              <td className="px-4 py-3">
                {item.default
                  ? (
                    <div className="flex items-center gap-1">
                      <code className="rounded-md dark:bg-muted/50 bg-muted/75 px-2 py-0.5 font-mono text-neutral-600 dark:text-neutral-300 text-sm">
                        {item.default}
                      </code>
                      {item.defaultDetails && (
                        <PropInformation content={item.defaultDetails} />
                      )}
                    </div>
                  )
                  : <span className="text-muted-foreground">-</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
