import { FlowButton } from "@/registry/spell-ui/flow-button";

export function Demo() {
  return (
    <div className="flex items-center gap-4">
      <FlowButton size="sm">Small</FlowButton>
      <FlowButton size="default">Default</FlowButton>
      <FlowButton size="lg">Large</FlowButton>
    </div>
  );
}
