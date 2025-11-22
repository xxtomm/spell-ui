import { WordsStagger } from "@/components/words-stagger";

export function Demo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-sm font-mono text-muted-foreground">SLOW (1)</p>
        <WordsStagger speed={1} className="text-xl font-medium">
          You can just ship things.
        </WordsStagger>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-mono text-muted-foreground">NORMAL (0.5)</p>
        <WordsStagger speed={0.5} className="text-xl font-medium">
          You can just ship things.
        </WordsStagger>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-mono text-muted-foreground">FAST (0.3)</p>
        <WordsStagger speed={0.3} className="text-xl font-medium">
          You can just ship things.
        </WordsStagger>
      </div>
    </div>
  );
}
