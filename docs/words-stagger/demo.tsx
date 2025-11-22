import { WordsStagger } from "@/components/words-stagger";

export function Demo() {
  return (
    <div className="flex items-center justify-center">
      <WordsStagger className="text-2xl md:text-3xl font-[550] tracking-tight max-w-[600px]">
        Spell UI is an open source collection of elegant, user friendly
        components that seamlessly integrate with frameworks and AI models.
      </WordsStagger>
    </div>
  );
}
