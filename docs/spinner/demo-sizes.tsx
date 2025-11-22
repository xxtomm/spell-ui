import { Spinner } from "@/registry/spell-ui/spinner";

export default function SpinnerDemoSizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
