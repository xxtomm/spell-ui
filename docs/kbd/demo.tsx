import { Kbd } from "@/registry/spell-ui/kbd";

export function Demo() {
  return (
    <div className="flex gap-4">
      <Kbd keys={["alt"]} listenToKeyboard />
      <Kbd keys={["enter"]} listenToKeyboard />
      <Kbd keys={["space"]} listenToKeyboard />
      <Kbd keys={["ctrl", "j"]} listenToKeyboard />
      <Kbd keys={[{ display: "HOLD", key: "H" }]} listenToKeyboard />
      <Kbd keys={["up"]} listenToKeyboard />
    </div>
  );
}
