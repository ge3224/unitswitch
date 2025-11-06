import { FONT_SIZE } from "@/lib/constants.ts";
import { createDomElement } from "@pkg/just-jsx/src/index.ts";

export default function DetailsRems() {
  return (
    <div className="text-app-black">
      Based on a root font size of <span class="font-bold">{FONT_SIZE}px</span>
    </div>
  );
}
