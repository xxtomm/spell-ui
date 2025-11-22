import { RandomizedText } from "@/registry/spell-ui/randomized-text";

export function Demo() {
  return (
    <div className="flex flex-col justify-start items-center min-h-[200px] w-[500px] gap-4">
        <div className="flex flex-col items-start gap-1 justif-start">
          <span className="text-sm font-mono text-muted-foreground">BY CHARACTERS</span>
          <RandomizedText className="text-base tracking-tight font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis debitis ipsam saepe incidunt laboriosam eaque quasi commodi beatae excepturi quos!</RandomizedText>
        </div>
        <div className="flex flex-col items-start gap-1 justif-start">
          <span className="text-sm font-mono text-muted-foreground">BY WORDS</span>
          <RandomizedText split="words" className="text-base tracking-tight font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis debitis ipsam saepe incidunt laboriosam eaque quasi commodi beatae excepturi quos!</RandomizedText>
        </div>
    </div>
  );
}