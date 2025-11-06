import { FONT_SIZE } from "@/lib/constants";
import { createDomElement } from "@pkg/just-jsx";

export default function DetailsRems() {
  return (
    <div className="text-app-black">
      Based on a root font size of{" "}
      <span class="font-bold">{FONT_SIZE}px</span>
    </div>
  );
}
