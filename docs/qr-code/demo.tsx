import { QRCode } from "@/registry/spell-ui/qr-code";

export function Demo() {
  return (
    <div className="w-[140px] rounded-lg p-2 shadow-[0_0_0_1px_rgba(0,0,0,.08),_0px_2px_2px_rgba(0,0,0,.04)] dark:border-input dark:border [&_svg]:w-full [&_svg]:h-auto">
      <QRCode value="https://spell.sh" size={140} />
    </div>
  );
}
