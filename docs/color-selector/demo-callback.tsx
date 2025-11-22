"use client";

import { ColorSelector } from "@/registry/spell-ui/color-selector";
import { useState } from "react";

export function Demo() {
  const [selectedColor, setSelectedColor] = useState("purple");

  return (
    <div className="flex flex-col gap-4 items-center">
      <ColorSelector
        colors={["red", "blue", "green", "yellow", "purple", "pink", "orange"]}
        defaultValue={selectedColor}
        onColorSelect={(color) => setSelectedColor(color)}
      />
      <p className="text-sm text-muted-foreground">
        Selected color: <span className="font-semibold">{selectedColor}</span>
      </p>
    </div>
  );
}
