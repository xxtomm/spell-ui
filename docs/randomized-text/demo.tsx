import { RandomizedText } from "@/registry/spell-ui/randomized-text";

export function Demo() {
  return (
    <div className="flex justify-start items-center min-h-[200px] w-[400px]">
      <div className="flex flex-col items-start gap-2">
        <RandomizedText className="text-2xl md:text-3xl font-semibold tracking-tighter">
          Introducing Spell UI
        </RandomizedText>
        <RandomizedText split="words" className="text-base font-[550] tracking-tight">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi architecto soluta modi facilis fugit possimus commodi! Ipsam delectus unde repellendus.</RandomizedText>
      </div>
    </div>
  );
}