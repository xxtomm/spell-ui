import { SpecialText } from "@/registry/spell-ui/special-text";

export function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20 font-mono">FAST:</span>
        <SpecialText speed={10} className="text-lg">FAST ANIMATION</SpecialText>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20 font-mono">NORMAL:</span>
        <SpecialText speed={20} className="text-lg">NORMAL SPEED</SpecialText>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20 font-mono">SLOW:</span>
        <SpecialText speed={40} className="text-lg">SLOW MOTION</SpecialText>
      </div>
    </div>
  );
}
