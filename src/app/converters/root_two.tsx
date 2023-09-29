import { useEffect } from "react";
import { ConverterProps, PPI, FONT_SIZE } from ".";
import Wrapper from "./Wrapper";
import { Unit } from "@/units";

export default function RootTwo({ input, from, hotkey }: ConverterProps): JSX.Element {
  const result = toRootTwo.convert(from, input);

  const onR2Key = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onR2Key);

    return () => {
      document.removeEventListener("keydown", onR2Key);
    };
  });

  return (
    <Wrapper
      base="Root 2 Rect."
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toRootTwo}
    >
      <div className="flex justify-center pt-4">
        <svg width="293"
          height="149"
          viewBox="0 0 293 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M53.5 78.5V1.45311H163.351V78.5H53.5Z"
            className="fill-app-green-300 stroke-app-green-600"
          />
          <path
            d="M53.8046 1.75771L163.231 78.1954"
            className="stroke-app-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M108.518 78.1954V0.953114"
            className="stroke-app-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M108.518 78.1954L164.036 1.75771"
            className="stroke-app-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M234.175 78.5L179.823 78.5L179.823 1.45309L234.175 1.45309L234.175 78.5Z"
            className="fill-app-green-300 stroke-app-green-600"
          />
          <path
            d="M179.506 78.8068L234.676 0.759884"
            className="stroke-app-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M233.953 40.3788L179.5 40.3788"
            className="stroke-app-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M234.841 40.3788L179.323 0.953082"
            className="stroke-app-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M32 0V80"
            className="stroke-app-green-600"
          />
          <path
            d="M22 1H41.5"
            className="stroke-app-green-600"
          />
          <path
            d="M22 79H41.5"
            className="stroke-app-green-600"
          />
          <path
            d="M163 110H53"
            className="stroke-app-green-400"
          />
          <path
            d="M53 120.5V101"
            className="stroke-app-green-400"
          />
          <path
            d="M163 120.5V101"
            className="stroke-app-green-400"
          />
          <path
            d="M234 110H180"
            className="stroke-app-green-400"
          />
          <path
            d="M180 120.5V101"
            className="stroke-app-green-400"
          />
          <path
            d="M234 120.5V101"
            className="stroke-app-green-400"
          />
          <path
            d="M263 1V40"
            className="stroke-app-green-400"
          />
          <path
            d="M252.5 1L273 1"
            className="stroke-app-green-400"
          />
          <path
            d="M252.5 40L273 40"
            className="stroke-app-green-400"
          />
          <text
            className="fill-app-green-400 font-bold text-sm"
            x="268"
            y="50"
            transform="rotate(-90,268,50)"
            textAnchor="end">{shorter(shorter(input)).toFixed(2)}
          </text>
          <text
            className="fill-app-green-400 font-bold text-sm"
            x="207"
            y="142"
            textAnchor="middle">{shorter(input).toFixed(2)}
          </text>
          <text
            className="fill-app-green-600 font-bold text-sm"
            x="18"
            y="40"
            transform="rotate(-90,18,40)"
            textAnchor="middle">{input.toFixed(2)}
          </text>
          <text
            className="fill-app-green-400 font-bold text-sm"
            x="110"
            y="142"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
        </svg>
      </div>
    </Wrapper>
  );

}
const tailwindInInches: number[] = [];

function longer(input: number): number {
  return input * 1.41;
}

function shorter(input: number): number {
  return input / 1.41;
}

const toRootTwo = {
  /**
   * Converts a value from the specified unit to inches (in).
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in inches (in), or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (_from: Unit, input: number): number => {
    return input < 0 ? -1 : longer(input);
  },

  /**
   * The `render` function converts a converted value in inches (in) to a
   * string representation.
   *
   * @param {number} conversion - The converted value in inches (in).
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
}
