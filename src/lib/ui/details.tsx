import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { ViewInputState } from "../types.ts";

export function DetailsRemsEms() {
  return (
    <div className="text-app-black">
      Based on a root font size of <span class="font-bold">{FONT_SIZE}px</span>
    </div>
  );
}

export function DetailsPixels() {
  return (
    <div class="text-app-black">
      Based on a resolution of <span class="font-bold">{PPI} DPI</span>
    </div>
  );
}

export function DetailsTailwind(
  { conversion }: { conversion: ViewInputState<number> },
) {
  const initial = conversion.get();

  const exampleText = document.createTextNode(
    initial >= 0 ? `p-${initial}` : `N/A`,
  );

  conversion.subscribe(function detailsTailwindCallback(newValue): void {
    exampleText.textContent = newValue >= 0 ? `p-${newValue}` : `N/A`;
  });

  return (
    <div class="text-app-black">
      <strong>Example</strong>: {initial >= 0
        ? (
          <code class="font-mono">
            <span class="text-app-gray-200">{`"class"=`}</span>
            <strong class="text-app-green-500">"{exampleText}"</strong>
          </code>
        )
        : exampleText}
    </div>
  );
}

export function DetailsBootstrap() {
  return (
    <div className="text-app-black">
      Only six possible values: <strong>0-5</strong>
    </div>
  );
}
