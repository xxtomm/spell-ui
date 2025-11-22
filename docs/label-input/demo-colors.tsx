import { LabelInput } from "@/registry/spell-ui/label-input";

export function Demo() {
  return (
    <div className="flex gap-4">
      <LabelInput label="Primary" ringColor="primary" />
      <LabelInput label="Orange" ringColor="orange" />
      <LabelInput label="Blue" ringColor="blue" />
      <LabelInput label="Green" ringColor="green" />
    </div>
  );
}
