import { FlowButton } from "@/registry/spell-ui/flow-button";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-4">
      <FlowButton borderColor="var(--primary)">
        Primary
      </FlowButton>
      <FlowButton borderColor="var(--color-red-500)">
        Red
      </FlowButton>
      <FlowButton borderColor="var(--color-blue-500)">
        Blue
      </FlowButton>
      <FlowButton borderColor="var(--color-purple-500)">
        Purple
      </FlowButton>
      <FlowButton borderColor="var(--color-green-500)">
        Green
      </FlowButton>
    </div>
  );
}
