import { PerspectiveBook } from "@/registry/spell-ui/perspective-book";
import { Cog } from "lucide-react";

export function Demo() {
  return (
    <div className="flex flex-wrap gap-8">
      <PerspectiveBook
        className="bg-[#4D4E41] text-yellow-300 justify-start h-full"
        textured
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold leading-4">
              The Art of Doing Science and Engineering
            </h2>
            <Cog className="size-5" />
          </div>
          <span className="font-medium text-sm font-serif">
            Richard<br />W. Hamming
          </span>
        </div>
      </PerspectiveBook>
    </div>
  );
}
