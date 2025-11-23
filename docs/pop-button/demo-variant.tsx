import { PopButton } from "@/registry/spell-ui/pop-button";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-3 font-semibold">
      <PopButton color="default">Button</PopButton>
      <PopButton color="amber">Button</PopButton>
      <PopButton color="purple">Button</PopButton>
    </div>
  );
}