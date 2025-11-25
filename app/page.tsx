import { RichButton } from "@/registry/spell-ui/rich-button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-svh">
      <RichButton className="rounded-full" asChild>
        <Link href={"/docs/introduction"}>
          See Docs
        </Link>
      </RichButton>
    </div>
  );
}
