import { Kbd } from "@/registry/spell-ui/kbd";

export function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Save:</span>
        <Kbd keys={["cmd", "S"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Copy:</span>
        <Kbd keys={["cmd", "C"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Paste:</span>
        <Kbd keys={["cmd", "V"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Undo:</span>
        <Kbd keys={["cmd", "Z"]} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Find:</span>
        <Kbd keys={["cmd", "F"]} />
      </div>
    </div>
  );
}
