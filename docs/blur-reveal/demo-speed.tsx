import { BlurReveal } from "@/registry/spell-ui/blur-reveal";

export function Demo() {
  return (
    <div className="flex flex-col gap-8 *:flex-col">
      <div>
        <p className="font-mono text-sm text-muted-foreground">SLOW (0.5)</p>
        <BlurReveal className="tracking-tight text-2xl font-medium" speedReveal={0.5}>
          You can just ship things
        </BlurReveal>
      </div>
      <div>
        <p className="font-mono text-sm text-muted-foreground">NORMAL (1.5)</p>
        <BlurReveal className="tracking-tight text-2xl font-medium" speedReveal={1.5}>
          You can just ship things
        </BlurReveal>
      </div>
      <div>
        <p className="font-mono text-sm text-muted-foreground">FAST (2)</p>
        <BlurReveal className="tracking-tight text-2xl font-medium" speedReveal={2}>
          You can just ship things
        </BlurReveal>
      </div>
    </div>
  );
}
