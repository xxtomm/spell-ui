import { RichButton } from "@/registry/spell-ui/rich-button";

export function Demo() {
  return (
    <div className="relative flex gap-4">
      <RichButton variant="zinc">Button</RichButton>
      <RichButton variant="amber">Button</RichButton>
      <RichButton variant="purple">Button</RichButton>
    </div>
  );
}
