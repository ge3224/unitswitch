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

export function DetailsSixteenNine(
  { input }: { input: ViewInputState<number> },
) {
  const initialValue = input.get();

  // Helper functions
  const longer = (value: number): number => (16 * value) / 9;
  const shorter = (value: number): number => (9 * value) / 16;

  // Create text nodes for dynamic values
  const inputTopText = document.createTextNode(initialValue.toFixed(2));
  const inputLeftText = document.createTextNode(initialValue.toFixed(2));
  const longerText = document.createTextNode(longer(initialValue).toFixed(2));
  const shorterText = document.createTextNode(shorter(initialValue).toFixed(2));

  input.subscribe(function detailsSixteenNineCallback(newValue: number): void {
    const fixed = newValue.toFixed(2);
    inputTopText.textContent = fixed;
    inputLeftText.textContent = fixed;
    longerText.textContent = longer(newValue).toFixed(2);
    shorterText.textContent = shorter(newValue).toFixed(2);
  });

  return (
    <div class="flex justify-center pt-4">
      <svg
        width="263"
        height="149"
        viewBox="0 0 263 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M203 1H59V79H203V1Z"
          class="fill-app-green-300 stroke-app-green-600"
          stroke-width="1.00157"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M203 37H125V79"
          class="stroke-app-green-600"
          stroke-width="1.00157"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M59 1L203 79"
          class="stroke-app-green-600"
          stroke-width="0.999999"
          stroke-dasharray="2 2"
        />
        <path d="M203 110L59 110" class="stroke-app-green-400" />
        <path d="M59 120.5V101" class="stroke-app-green-400" />
        <path d="M203 120.5V101" class="stroke-app-green-400" />
        <path d="M34 0V80" class="stroke-app-green-600" />
        <path d="M24 1H43.5" class="stroke-app-green-600" />
        <path d="M24 79H43.5" class="stroke-app-green-600" />
        <path d="M229 38V80" class="stroke-app-green-400" />
        <path d="M219 37L238.5 37" class="stroke-app-green-400" />
        <path d="M219 79L238.5 79" class="stroke-app-green-400" />
        <text
          class="fill-app-green-400 text-sm font-bold"
          x="256"
          y="58"
          transform="rotate(-90,256,58)"
          text-anchor="middle"
        >
          {shorterText}
        </text>
        <text
          class="fill-app-green-400 text-sm font-bold"
          x="128"
          y="140"
          text-anchor="middle"
        >
          {longerText}
        </text>
        <text
          class="fill-app-green-600 text-sm font-bold"
          x="162"
          y="27"
          text-anchor="middle"
        >
          {inputTopText}
        </text>
        <text
          class="fill-app-green-600 text-sm font-bold"
          x="18"
          y="42"
          transform="rotate(-90,18,42)"
          text-anchor="middle"
        >
          {inputLeftText}
        </text>
      </svg>
    </div>
  );
}
