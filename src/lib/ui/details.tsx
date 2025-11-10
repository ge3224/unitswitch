import { createDomElement } from "@pkg/just-jsx/src/index.ts";
import {
  GOLDEN_RATIO,
  GOLDEN_RATIO_SQUARED,
  ROOT_TWO,
  ROOT_TWO_SQUARED,
} from "@/lib/constants.ts";
import { ViewInputState } from "@/lib/types.ts";
import { configState } from "@/lib/config.ts";

export function DetailsRemsEms() {
  const fontSize = configState.get().fontSize;
  const fontSizeTextNode = document.createTextNode(`${fontSize}px`);

  configState.subscribe((config) => {
    fontSizeTextNode.textContent = `${config.fontSize}px`;
  });

  return (
    <div class="text-app-black dark:text-app-gray-200">
      Based on a{" "}
      <span
        class="cursor-help border-b border-dotted border-app-gray-200 dark:border-app-gray-300 hover:border-app-green-400 hover:text-app-green-500 transition-colors"
        title="rem is relative to the root element's font size, while em is relative to the parent element's font size"
      >
        root*
      </span>{" "}
      font size of <span class="font-bold">{fontSizeTextNode}</span>
    </div>
  );
}

export function DetailsPixels() {
  const ppi = configState.get().ppi;
  const ppiTextNode = document.createTextNode(`${ppi} DPI`);

  configState.subscribe((config) => {
    ppiTextNode.textContent = `${config.ppi} DPI`;
  });

  return (
    <div class="text-app-black dark:text-app-gray-200">
      Based on a resolution of <span class="font-bold">{ppiTextNode}</span>
    </div>
  );
}


export function DetailsGoldenRatio(
  { input }: { input: ViewInputState<number> },
) {
  const initialValue = input.get();

  const inputTextNode = document.createTextNode(initialValue.toFixed(2));

  const longSideTextNode = document.createTextNode(
    (initialValue * GOLDEN_RATIO).toFixed(2),
  );

  const shortSideTextNode = document.createTextNode(
    (initialValue / GOLDEN_RATIO).toFixed(2),
  );

  const shortestSideTextNode = document.createTextNode(
    (initialValue / GOLDEN_RATIO_SQUARED).toFixed(2),
  );

  input.subscribe(function updateRatioVariantsGolden(newValue: number) {
    inputTextNode.textContent = newValue.toFixed(2);
    longSideTextNode.textContent = (newValue * GOLDEN_RATIO).toFixed(2);
    shortSideTextNode.textContent = (newValue / GOLDEN_RATIO).toFixed(2);
    shortestSideTextNode.textContent = (newValue / GOLDEN_RATIO_SQUARED)
      .toFixed(2);
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
          class="fill-app-green-300 dark:fill-app-teal-500/20 stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M52.0223 2.69029L192.841 88.7806"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-dasharray="2 2"
        />
        <path
          d="M134.092 88.7806V1.79352"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M134.092 88.7806L193.113 1.79352"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-dasharray="2 2"
        />
        <rect
          x="213.074"
          y="88.2806"
          width="85.9871"
          height="51.9192"
          transform="rotate(-90 213.074 88.2806)"
          class="fill-app-green-300 dark:fill-app-teal-500/20 stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M212.574 88.7806L265.317 1.79349"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-dasharray="2 2"
        />
        <path
          d="M264.596 37.6645L213.471 37.6645"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M265.317 37.6645L212.574 1.61973"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-dasharray="2 2"
        />

        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M292 0.89679V37.6645" />
        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M284 0.89679L300 0.89679" />
        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M284 37.6645L300 37.6645" />

        <path
          class="stroke-app-green-400 dark:stroke-app-green-200"
          d="M264.596 114.787L212.574 114.787"
        />
        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M212.574 124.203V106.716" />
        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M264.596 124.203V106.716" />
        <path
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          d="M19.17548 2.69031H36.6657"
        />
        <path class="stroke-app-green-600 dark:stroke-app-teal-500" d="M27.6448 87.8839V2.69031" />
        <path
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          d="M19.17548 87.8839H36.6657"
        />
        <path
          class="stroke-app-green-400 dark:stroke-app-green-200"
          d="M192.841 114.787L51.1254 114.787"
        />
        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M51.1254 124.203V106.716" />
        <path class="stroke-app-green-400 dark:stroke-app-green-200" d="M192.841 124.203V106.716" />
        <text
          class="fill-app-green-600 dark:fill-app-green-400 text-sm font-bold "
          x="16"
          y="44"
          transform="rotate(-90,16,44)"
          text-anchor="middle"
        >
          {inputTextNode}
        </text>
        <text
          class="fill-app-green-400 dark:fill-app-green-300 text-sm font-bold"
          x="125"
          y="140"
          text-anchor="middle"
        >
          {longSideTextNode}
        </text>
        <text
          class="fill-app-green-400 dark:fill-app-green-300 text-sm font-bold"
          x="297"
          y="50"
          transform="rotate(-90,297,50)"
          text-anchor="end"
        >
          {shortestSideTextNode}
        </text>
        <text
          class="fill-app-green-400 dark:fill-app-green-300 text-sm font-bold"
          x="239"
          y="140"
          text-anchor="middle"
        >
          {shortSideTextNode}
        </text>
      </svg>
    </div>
  );
}

export function DetailsSixteenNine(
  { input }: { input: ViewInputState<number> },
) {
  const initialValue = input.get();

  const inputTextNode = document.createTextNode(initialValue.toFixed(2));

  const inputTextNodeInner = document.createTextNode(initialValue.toFixed(2));

  const longSideTextNode = document.createTextNode(
    ((16 * initialValue) / 9).toFixed(2),
  );

  const shortSideTextNode = document.createTextNode(
    ((9 * initialValue) / 16).toFixed(2),
  );

  input.subscribe(function updateRatioVariants16_9(newValue: number): void {
    const fixed = newValue.toFixed(2);
    inputTextNode.textContent = fixed;
    inputTextNodeInner.textContent = fixed;
    longSideTextNode.textContent = ((16 * newValue) / 9).toFixed(2);
    shortSideTextNode.textContent = ((9 * newValue) / 16).toFixed(2);
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
          class="fill-app-green-300 dark:fill-app-teal-500/20 stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="1.00157"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M203 37H125V79"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="1.00157"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M59 1L203 79"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="0.999999"
          stroke-dasharray="2 2"
        />
        <path d="M203 110L59 110" class="stroke-app-green-400 dark:stroke-app-green-200" />
        <path d="M59 120.5V101" class="stroke-app-green-400 dark:stroke-app-green-200" />
        <path d="M203 120.5V101" class="stroke-app-green-400 dark:stroke-app-green-200" />
        <path d="M34 0V80" class="stroke-app-green-600 dark:stroke-app-teal-500" />
        <path d="M24 1H43.5" class="stroke-app-green-600 dark:stroke-app-teal-500" />
        <path d="M24 79H43.5" class="stroke-app-green-600 dark:stroke-app-teal-500" />
        <path d="M229 38V80" class="stroke-app-green-400 dark:stroke-app-green-200" />
        <path d="M219 37L238.5 37" class="stroke-app-green-400 dark:stroke-app-green-200" />
        <path d="M219 79L238.5 79" class="stroke-app-green-400 dark:stroke-app-green-200" />
        <text
          class="fill-app-green-400 dark:fill-app-green-300 text-sm font-bold"
          x="256"
          y="58"
          transform="rotate(-90,256,58)"
          text-anchor="middle"
        >
          {shortSideTextNode}
        </text>
        <text
          class="fill-app-green-400 dark:fill-app-green-300 text-sm font-bold"
          x="128"
          y="140"
          text-anchor="middle"
        >
          {longSideTextNode}
        </text>
        <text
          class="fill-app-green-600 dark:fill-app-green-400 text-sm font-bold"
          x="162"
          y="27"
          text-anchor="middle"
        >
          {inputTextNodeInner}
        </text>
        <text
          class="fill-app-green-600 dark:fill-app-green-400 text-sm font-bold"
          x="18"
          y="42"
          transform="rotate(-90,18,42)"
          text-anchor="middle"
        >
          {inputTextNode}
        </text>
      </svg>
    </div>
  );
}

export function DetailsRootTwo(
  { input }: { input: ViewInputState<number> },
) {
  const initialValue = input.get();

  const inputText = document.createTextNode(initialValue.toFixed(2));

  const longSideText = document.createTextNode(
    (initialValue * ROOT_TWO).toFixed(2),
  );

  const shortSideText = document.createTextNode(
    (initialValue / ROOT_TWO).toFixed(2),
  );

  const shortestSideText = document.createTextNode(
    (initialValue / ROOT_TWO_SQUARED).toFixed(
      2,
    ),
  );

  input.subscribe(function updateRatioVariantsRoot2(newValue: number) {
    inputText.textContent = newValue.toFixed(2);
    longSideText.textContent = (newValue * ROOT_TWO).toFixed(2);
    shortSideText.textContent = (newValue / ROOT_TWO).toFixed(2);
    shortestSideText.textContent = (newValue / ROOT_TWO_SQUARED).toFixed(2);
  });

  return (
    <div class="flex justify-center pt-4">
      <svg
        width="293"
        height="149"
        viewBox="0 0 293 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M53.5 78.5V1.45311H163.351V78.5H53.5Z"
          class="fill-app-green-300 dark:fill-app-teal-500/20 stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M53.8046 1.75771L163.231 78.1954"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="0.999999"
          stroke-dasharray="2 2"
        />
        <path
          d="M108.518 78.1954V0.953114"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M108.518 78.1954L164.036 1.75771"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="0.999999"
          stroke-dasharray="2 2"
        />
        <path
          d="M234.175 78.5L179.823 78.5L179.823 1.45309L234.175 1.45309L234.175 78.5Z"
          class="fill-app-green-300 dark:fill-app-teal-500/20 stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M179.506 78.8068L234.676 0.759884"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="0.999999"
          stroke-dasharray="2 2"
        />
        <path
          d="M233.953 40.3788L179.5 40.3788"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M234.841 40.3788L179.323 0.953082"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
          stroke-width="0.999999"
          stroke-dasharray="2 2"
        />
        <path
          d="M32 0V80"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M22 1H41.5"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M22 79H41.5"
          class="stroke-app-green-600 dark:stroke-app-teal-500"
        />
        <path
          d="M163 110H53"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M53 120.5V101"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M163 120.5V101"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M234 110H180"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M180 120.5V101"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M234 120.5V101"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M263 1V40"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M252.5 1L273 1"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <path
          d="M252.5 40L273 40"
          class="stroke-app-green-400 dark:stroke-app-green-200"
        />
        <text
          class="fill-app-green-400 dark:fill-app-green-300 font-bold text-sm"
          x="268"
          y="50"
          transform="rotate(-90,268,50)"
          text-anchor="end"
        >
          {shortestSideText}
        </text>
        <text
          class="fill-app-green-400 dark:fill-app-green-300 font-bold text-sm"
          x="207"
          y="142"
          text-anchor="middle"
        >
          {shortSideText}
        </text>
        <text
          class="fill-app-green-600 dark:fill-app-green-400 font-bold text-sm"
          x="18"
          y="40"
          transform="rotate(-90,18,40)"
          text-anchor="middle"
        >
          {inputText}
        </text>
        <text
          class="fill-app-green-400 dark:fill-app-green-300 font-bold text-sm"
          x="110"
          y="142"
          text-anchor="middle"
        >
          {longSideText}
        </text>
      </svg>
    </div>
  );
}
