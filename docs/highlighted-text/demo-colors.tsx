import { HighlightedText } from "@/registry/spell-ui/highlighted-text";

export function Demo() {
  return (
    <div className="flex flex-col gap-4">
      <HighlightedText variant="blue">
        Thinking longer for a better answer
      </HighlightedText>
      <HighlightedText variant="green">
        Thinking longer for a better answer
      </HighlightedText>
      <HighlightedText variant="purple">
        Thinking longer for a better answer
      </HighlightedText>
      <HighlightedText variant="rose">
        Thinking longer for a better answer
      </HighlightedText>
    </div>
  );
}
