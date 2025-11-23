import { RichButton } from "@/registry/spell-ui/rich-button";

export function Demo() {
  return (
    <div className="relative flex gap-4">
      <RichButton color="zinc">Button</RichButton>
      <RichButton color="amber">Button</RichButton>
      <RichButton color="purple">Button</RichButton>
    </div>
  );
}
