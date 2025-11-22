import { RichButton } from "@/registry/spell-ui/rich-button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-svh">
      <Link href={"/docs/introduction"}>
        <RichButton asChild>
            See Docs
        </RichButton>
      </Link>
    </div>
  );
}
