import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { ViewInputState } from "@/lib/types.ts";
import {
  conversionRatioLonger16_9,
  conversionRatioShorter16_9,
} from "@/lib/converters/sixteen_nine.ts";
import {
  conversionRatioLongGolden,
  conversionRatioShortGolden,
} from "@/lib/converters/golden.ts";

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

export function DetailsGoldenRatio(
  { input }: { input: ViewInputState<number> },
) {
  const initialValue = input.get();

  const inputText = document.createTextNode(initialValue.toFixed(2));

  const longSideText = document.createTextNode(
    conversionRatioLongGolden(initialValue).toFixed(2),
  );

  const shortSideText = document.createTextNode(
    conversionRatioShortGolden(initialValue).toFixed(2),
  );

  const shortestSideText = document.createTextNode(
    conversionRatioShortGolden(conversionRatioShortGolden(initialValue))
      .toFixed(2),
  );

  input.subscribe(function updateRatioVariantsGolden(newValue: number) {
    const fixed = newValue.toFixed(2);
    inputText.textContent = fixed;
    longSideText.textContent = conversionRatioLongGolden(newValue).toFixed(2);
    shortSideText.textContent = conversionRatioShortGolden(newValue).toFixed(2);
    shortestSideText.textContent = conversionRatioShortGolden(
      conversionRatioShortGolden(newValue),
    ).toFixed(2);
  });

  return (
    <div class="flex justify-center pt-4">
      <svg
        width="327"
        height="149"
        viewBox="0 0 327 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="51.6254"
          y="2.29352"
          width="141.613"
          height="85.9871"
          class="fill-app-green-300 stroke-app-green-600"
        />
        <path
          d="M52.0223 2.69029L192.841 88.7806"
          class="stroke-app-green-600"
          stroke-dasharray="2 2"
        />
        <path
          d="M134.092 88.7806V1.79352"
          class="stroke-app-green-600"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M134.092 88.7806L193.113 1.79352"
          class="stroke-app-green-600"
          stroke-dasharray="2 2"
        />
        <rect
          x="213.074"
          y="88.2806"
          width="85.9871"
          height="51.9192"
          transform="rotate(-90 213.074 88.2806)"
          class="fill-app-green-300 stroke-app-green-600"
        />
        <path
          d="M212.574 88.7806L265.317 1.79349"
          class="stroke-app-green-600"
          stroke-dasharray="2 2"
        />
        <path
          d="M264.596 37.6645L213.471 37.6645"
          class="stroke-app-green-600"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M265.317 37.6645L212.574 1.61973"
          class="stroke-app-green-600"
          stroke-dasharray="2 2"
        />

        <path class="stroke-app-green-400" d="M292 0.89679V37.6645" />
        <path class="stroke-app-green-400" d="M284 0.89679L300 0.89679" />
        <path class="stroke-app-green-400" d="M284 37.6645L300 37.6645" />

        <path
          class="stroke-app-green-400"
          d="M264.596 114.787L212.574 114.787"
        />
        <path class="stroke-app-green-400" d="M212.574 124.203V106.716" />
        <path class="stroke-app-green-400" d="M264.596 124.203V106.716" />
        <path
          class="stroke-app-green-600"
          d="M19.17548 2.69031H36.6657"
        />
        <path class="stroke-app-green-600" d="M27.6448 87.8839V2.69031" />
        <path
          class="stroke-app-green-600"
          d="M19.17548 87.8839H36.6657"
        />
        <path
          class="stroke-app-green-400"
          d="M192.841 114.787L51.1254 114.787"
        />
        <path class="stroke-app-green-400" d="M51.1254 124.203V106.716" />
        <path class="stroke-app-green-400" d="M192.841 124.203V106.716" />
        <text
          class="fill-app-green-600 text-sm font-bold "
          x="16"
          y="44"
          transform="rotate(-90,16,44)"
          text-anchor="middle"
        >
          {inputText}
        </text>
        <text
          class="fill-app-green-400 text-sm font-bold"
          x="125"
          y="140"
          text-anchor="middle"
        >
          {longSideText}
        </text>
        <text
          class="fill-app-green-400 text-sm font-bold"
          x="297"
          y="50"
          transform="rotate(-90,297,50)"
          text-anchor="end"
        >
          {shortestSideText}
        </text>
        <text
          class="fill-app-green-400 text-sm font-bold"
          x="239"
          y="140"
          text-anchor="middle"
        >
          {shortSideText}
        </text>
      </svg>
    </div>
  );
}

export function DetailsSixteenNine(
  { input }: { input: ViewInputState<number> },
) {
  const initialValue = input.get();

  const inputTextTop = document.createTextNode(initialValue.toFixed(2));

  const inputTextLeft = document.createTextNode(initialValue.toFixed(2));

  const longSideText = document.createTextNode(
    conversionRatioLonger16_9(initialValue).toFixed(2),
  );

  const shortSideText = document.createTextNode(
    conversionRatioShorter16_9(initialValue).toFixed(2),
  );

  input.subscribe(function updateRatioVariants16_9(newValue: number): void {
    const fixed = newValue.toFixed(2);
    inputTextLeft.textContent = fixed;
    longSideText.textContent = conversionRatioLonger16_9(newValue).toFixed(2);
    shortSideText.textContent = conversionRatioShorter16_9(newValue).toFixed(2);
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
          {shortSideText}
        </text>
        <text
          class="fill-app-green-400 text-sm font-bold"
          x="128"
          y="140"
          text-anchor="middle"
        >
          {longSideText}
        </text>
        <text
          class="fill-app-green-600 text-sm font-bold"
          x="162"
          y="27"
          text-anchor="middle"
        >
          {inputTextTop}
        </text>
        <text
          class="fill-app-green-600 text-sm font-bold"
          x="18"
          y="42"
          transform="rotate(-90,18,42)"
          text-anchor="middle"
        >
          {inputTextLeft}
        </text>
      </svg>
    </div>
  );
}
