import { PerspectiveBook } from "@/registry/spell-ui/perspective-book";
import { BookOpen } from "lucide-react";

export function Demo() {
  return (
    <PerspectiveBook>
      <div className="flex flex-col gap-4">
        <h1 className="font-semibold leading-5">
          Your complete platform for the Design.
        </h1>
        <BookOpen className="size-5" />
      </div>
    </PerspectiveBook>
  );
}
