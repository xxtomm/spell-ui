import { Marquee } from "@/registry/spell-ui/marquee";
import {
  SiApple,
  SiClaude,
  SiDiscord,
  SiFramer,
  SiLinear,
  SiMeta,
  SiNike,
  SiOpenai,
  SiOpensea,
  SiVercel,
} from "@icons-pack/react-simple-icons";

export function Demo() {
  return (
    <Marquee className="flex py-4 text-muted-foreground [&_svg]:size-8 [&_svg]:hover:cursor-pointer [&_svg]:transition-colors [&_svg]:duration-300">
      <div className="mx-6">
        <SiMeta className="hover:text-[#0082FB]" />
      </div>
      <div className="mx-6">
        <SiVercel className="hover:text-primary" />
      </div>
      <div className="mx-6">
        <SiDiscord className="hover:text-[#5965F2]" />
      </div>
      <div className="mx-6">
        <SiFramer className="hover:text-primary" />
      </div>
      <div className="mx-6">
        <SiOpenai className="hover:text-primary" />
      </div>
      <div className="mx-6">
        <SiOpensea className="hover:text-[#0086FF]" />
      </div>
      <div className="mx-6">
        <SiLinear className="hover:text-primary" />
      </div>
      <div className="mx-6">
        <SiApple className="hover:text-primary" />
      </div>
      <div className="mx-6">
        <SiNike className="hover:text-primary" />
      </div>
      <div className="mx-6">
        <SiClaude className="hover:text-[#D97757]" />
      </div>
    </Marquee>
  );
}
