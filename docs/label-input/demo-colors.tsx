import { LabelInput } from "@/registry/spell-ui/label-input";

export function Demo() {
  return (
    <div className="flex gap-4">
      <LabelInput label="Primary" ringColor="primary" className="max-w-40" />
      <LabelInput label="Orange" ringColor="orange" className="max-w-40" />
      <LabelInput label="Blue" ringColor="blue" className="max-w-40" />
      <LabelInput label="Green" ringColor="green" className="max-w-40" />
    </div>
  );
}
