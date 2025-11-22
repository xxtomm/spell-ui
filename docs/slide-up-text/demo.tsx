import { SlideUpText } from "@/registry/spell-ui/slide-up-text";

export function Demo() {
  return (
    <SlideUpText
      split="words"
      className="text-2xl sm:text-4xl font-medium tracking-[-.03em]"
    >
      You can just ship things.
    </SlideUpText>
  );
}
