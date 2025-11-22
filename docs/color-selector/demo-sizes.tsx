import { ColorSelector } from "@/registry/spell-ui/color-selector";

export function Demo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm text-muted-foreground font-mono">SMALL</span>
        <ColorSelector
          colors={["red", "blue", "green", "yellow"]}
          defaultValue="red"
          size="sm"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm text-muted-foreground font-mono">DEFAULT</span>
        <ColorSelector
          colors={["red", "blue", "green", "yellow"]}
          defaultValue="blue"
          size="default"
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <span className="text-sm text-muted-foreground font-mono">LARGE</span>
        <ColorSelector
          colors={["red", "blue", "green", "yellow"]}
          defaultValue="green"
          size="lg"
        />
      </div>
    </div>
  );
}
