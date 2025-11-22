import { Signature } from "@/registry/spell-ui/signature";

export function DemoContrast() {
  return (
    <div className="rounded-2xl p-6">
      <Signature
        text="Tomm."
        fontSize={16}
        color="#F29900"
      />
    </div>
  );
}
