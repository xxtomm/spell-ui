import { SlideUpText } from "@/registry/spell-ui/slide-up-text";

export function Demo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-sm font-mono text-muted-foreground mb-2">FROM FIRST</span>
        <SlideUpText from="first" className="text-xl font-medium">
          Animation from first word
        </SlideUpText>
      </div>
      <div>
        <span className="text-sm font-mono text-muted-foreground mb-2">FROM LAST</span>
        <SlideUpText from="last" className="text-xl font-medium">
          Animation from last word
        </SlideUpText>
      </div>
      <div>
        <span className="text-sm font-mono text-muted-foreground mb-2">FROM CENTER</span>
        <SlideUpText from="center" className="text-xl font-medium">
          Animation from center outward
        </SlideUpText>
      </div>
    </div>
  );
}
