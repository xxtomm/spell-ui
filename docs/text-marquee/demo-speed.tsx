import { TextMarquee } from "@/registry/spell-ui/text-marquee";

export function Demo() {
  return (
    <div className="flex gap-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Speed: 0.5</p>
        <TextMarquee speed={0.5}>
          <p className="text-xl font-medium">Tomato</p>
          <p className="text-xl font-medium">Apple</p>
          <p className="text-xl font-medium">Carrot</p>
          <p className="text-xl font-medium">Lettuce</p>
          <p className="text-xl font-medium">Onion</p>
        </TextMarquee>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Speed: 1</p>
        <TextMarquee speed={1}>
          <p className="text-xl font-medium">Tomato</p>
          <p className="text-xl font-medium">Apple</p>
          <p className="text-xl font-medium">Carrot</p>
          <p className="text-xl font-medium">Lettuce</p>
          <p className="text-xl font-medium">Onion</p>
        </TextMarquee>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Speed: 2</p>
        <TextMarquee speed={2}>
          <p className="text-xl font-medium">Tomato</p>
          <p className="text-xl font-medium">Apple</p>
          <p className="text-xl font-medium">Carrot</p>
          <p className="text-xl font-medium">Lettuce</p>
          <p className="text-xl font-medium">Onion</p>
        </TextMarquee>
      </div>
    </div>
  );
}
