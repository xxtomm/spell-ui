import { SlideUpText } from "@/registry/spell-ui/slide-up-text";

export function Demo() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-sm font-mono text-muted-foreground mb-2">BY WORDS</span>
        <SlideUpText split="words" className="text-xl font-medium">
          Beautiful animated text
        </SlideUpText>
      </div>
      <div>
        <span className="text-sm font-mono text-muted-foreground mb-2">BY CHARACTERS</span>
        <SlideUpText
          split="characters"
          stagger={0.02}
          className="text-xl font-medium"
        >
          You just can ship things.
        </SlideUpText>
      </div>
      <div>
        <span className="text-sm font-mono text-muted-foreground mb-2">BY LINES</span>
        <SlideUpText
          split="lines"
          stagger={0.2}
          className="text-xl font-medium"
        >
          {"First line\nSecond line\nThird line"}
        </SlideUpText>
      </div>
    </div>
  );
}
