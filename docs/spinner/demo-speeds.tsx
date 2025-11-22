import { Spinner } from "@/registry/spell-ui/spinner";

export default function SpinnerDemoSpeeds() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="slow" />
        <span className="text-xs text-muted-foreground">Slow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="normal" />
        <span className="text-xs text-muted-foreground">Normal</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="fast" />
        <span className="text-xs text-muted-foreground">Fast</span>
      </div>
    </div>
  );
}
