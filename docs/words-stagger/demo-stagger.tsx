import { WordsStagger } from "@/components/words-stagger";

export function Demo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-mono">SMALL STAGGER (0.05s)</p>
        <WordsStagger stagger={0.05} className="text-xl font-medium">
          You can just ship things.
        </WordsStagger>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-mono">NORMAL STAGGER (0.1s)</p>
        <WordsStagger stagger={0.1} className="text-xl font-medium">
          You can just ship things.
        </WordsStagger>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground font-mono">LARGE STAGGER (0.2s)</p>
        <WordsStagger stagger={0.2} className="text-xl font-medium">
          You can just ship things.
        </WordsStagger>
      </div>
    </div>
  );
}
