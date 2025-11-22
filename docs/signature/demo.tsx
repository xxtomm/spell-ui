import { Signature } from "@/registry/spell-ui/signature";

export function Demo() {
  return (
    <div className="flex items-center justify-center">
      <Signature className="dark:invert-100" text="Spell Studio" fontSize={16} color="#1D1D1F" />
    </div>
  );
}
