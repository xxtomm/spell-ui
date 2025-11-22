import { CopyButton } from "@/registry/spell-ui/copy-button";

export function Demo() {
  return (
    <div className="flex items-center gap-4">
      <CopyButton
        value="Small"
        size="sm"
      />
      <CopyButton value="Default" />
      <CopyButton
        value="Large"
        size="lg"
      />
    </div>
  );
}
