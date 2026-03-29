import FallbackAvatar from "@/registry/spell-ui/fallback-avatar";

const names = ["xxtomm", "max", "hugh", "diana", "solo"];

export function Demo() {
  return (
    <div className="flex items-center gap-3">
      {names.map((name) => (
        <div key={name} className="flex flex-col items-center gap-1">
          <FallbackAvatar className="border" name={name} size={32} />
          <span className="text-[11px] text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}
