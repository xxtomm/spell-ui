import FallbackAvatar from "@/registry/spell-ui/fallback-avatar";

const sizes = [20, 28, 36, 44] as const;

export function DemoSizes() {
  return (
    <div className="flex items-end gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-1">
          <FallbackAvatar className="border" name="spell" size={size} />
          <span className="text-[11px] text-muted-foreground">{size}px</span>
        </div>
      ))}
    </div>
  );
}
