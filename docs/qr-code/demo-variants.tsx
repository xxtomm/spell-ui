import { QRCode } from "@/registry/spell-ui/qr-code";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center">
      <div className="w-[105px] md:w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border dark:border-input [&_svg]:w-full [&_svg]:h-auto">
        <QRCode
          value="https://spell.sh"
          size={140}
          fgColor="#c2410c"
          bgColor="var(--background)"
        />
      </div>
      <div className="w-[105px] md:w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border dark:border-input [&_svg]:w-full [&_svg]:h-auto">
        <QRCode
          value="https://spell.sh"
          size={140}
          fgColor="#1d4ed8"
          bgColor="var(--background)"
        />
      </div>
      <div className="w-[105px] md:w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border dark:border-input [&_svg]:w-full [&_svg]:h-auto">
        <QRCode
          value="https://spell.sh"
          size={140}
          fgColor="#15803d"
          bgColor="var(--background)"
        />
      </div>
    </div>
  );
}
