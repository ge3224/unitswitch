import { PPI } from "@/lib/constants";
import { createDomElement } from "@pkg/just-jsx"

export default function DetailsPixels() {
  return (
    <div class="text-app-black">
      Based on a resolution of <span class="font-bold">{PPI} DPI</span>
    </div>
  );
}
