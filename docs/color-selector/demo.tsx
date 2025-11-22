import { ColorSelector } from "@/registry/spell-ui/color-selector";

export function Demo() {
  return (
    <ColorSelector
      colors={["red", "blue", "green", "yellow", "purple"]}
      defaultValue="blue"
    />
  );
}
