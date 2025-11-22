import { Badge } from "@/registry/spell-ui/badge";

export function Demo() {
  return (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="default">Default</Badge>
    </div>
  );
}
