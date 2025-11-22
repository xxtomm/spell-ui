import { Kbd } from "@/registry/spell-ui/kbd";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-4">
      <Kbd keys={["command"]} />
      <Kbd keys={["control"]} />
      <Kbd keys={["alt"]} />
      <Kbd keys={["space"]} />
      <Kbd keys={["up"]} />
      <Kbd keys={["down"]} />
      <Kbd keys={["left"]} />
      <Kbd keys={["right"]} />
    </div>
  );
}
