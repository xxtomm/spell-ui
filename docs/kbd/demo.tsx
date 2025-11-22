import { Kbd } from "@/registry/spell-ui/kbd";

export function Demo() {
  return (
    <div className="flex gap-4">
      <Kbd keys={["alt"]} />
      <Kbd keys={["enter"]} />
      <Kbd keys={["space"]} />
      <Kbd keys={["command", "k"]} />
      <Kbd keys={["hold"]} />
      <Kbd keys={["up"]} />
    </div>
  );
}
