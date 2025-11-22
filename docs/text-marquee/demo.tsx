import { TextMarquee } from "@/registry/spell-ui/text-marquee";

export function Demo() {
  return (
    <TextMarquee
      height={250}
      speed={1}
      prefix={
        <span className="text-3xl text-muted-foreground/75 font-medium">
          spell.sh/
        </span>
      }
    >
      <p className="text-3xl font-medium">emily</p>
      <p className="text-3xl font-medium">dennis</p>
      <p className="text-3xl font-medium">max</p>
      <p className="text-3xl font-medium">michele</p>
      <p className="text-3xl font-medium">adgv</p>
      <p className="text-3xl font-medium">tomm</p>
      <p className="text-3xl font-medium">hugh</p>
      <p className="text-3xl font-medium">alex</p>
    </TextMarquee>
  );
}
