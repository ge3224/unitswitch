import { PPI } from "@/lib/constants.ts";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";

export default function DetailsPixels() {
  return (
    <div class="text-app-black">
      Based on a resolution of <span class="font-bold">{PPI} DPI</span>
    </div>
  );
}
