import { Spinner } from "@/registry/spell-ui/spinner";

export default function SpinnerDemoColors() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="text-blue-600" />
      <Spinner className="text-green-600" />
      <Spinner className="text-red-600" />
      <Spinner className="text-purple-600" />
      <Spinner className="text-orange-600" />
      <Spinner className="text-pink-600" />
    </div>
  );
}
