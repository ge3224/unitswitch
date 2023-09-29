import { useEffect } from "react";
import { Converter, ConverterProps } from ".";
import Wrapper from "./Wrapper";
import { Unit } from "@/units";

export default function SixteenNine({ input, from, hotkey }: ConverterProps): JSX.Element {
  const result = toSixteenNine.convert(from, input);

  const on16_9Key = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", on16_9Key);

    return () => {
      document.removeEventListener("keydown", on16_9Key);
    };
  });

  return (
    <Wrapper
      base="16:9"
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toSixteenNine}
    >
      <div className="flex justify-center pt-4">
        <svg
          width="263"
          height="149"
          viewBox="0 0 263 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M203 1H59V79H203V1Z"
            className="fill-app-green-300 stroke-app-green-600"
            strokeWidth="1.00157"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M203 37H125V79"
            className="stroke-app-green-600"
            strokeWidth="1.00157"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M59 1L203 79"
            className="stroke-app-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M203 110L59 110"
            className="stroke-app-green-400"
          />
          <path
            d="M59 120.5V101"
            className="stroke-app-green-400"
          />
          <path
            d="M203 120.5V101"
            className="stroke-app-green-400"
          />
          <path
            d="M34 0V80"
            className="stroke-app-green-600"
          />
          <path
            d="M24 1H43.5"
            className="stroke-app-green-600"
          />
          <path
            d="M24 79H43.5"
            className="stroke-app-green-600"
          />
          <path
            d="M229 38V80"
            className="stroke-app-green-400"
          />
          <path
            d="M219 37L238.5 37"
            className="stroke-app-green-400"
          />
          <path
            d="M219 79L238.5 79"
            className="stroke-app-green-400"
          />
          <text
            className="fill-app-green-400 font-bold text-sm"
            x="256"
            y="58"
            transform="rotate(-90,256,58)"
            textAnchor="middle">{shorter(input).toFixed(2)}
          </text>
          <text
            className="fill-app-green-400 font-bold text-sm"
            x="128"
            y="140"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
          <text
            className="fill-app-green-600 font-bold text-sm"
            x="162"
            y="27"
            textAnchor="middle">{input.toFixed(2)}
          </text>
          <text
            className="fill-app-green-600 font-bold text-sm"
            x="18"
            y="42"
            transform="rotate(-90,18,42)"
            textAnchor="middle">{input.toFixed(2)}
          </text>
        </svg>
      </div>
    </Wrapper>
  );

}

function longer(input: number): number {
  return (16 * input) / 9;
}

function shorter(input: number): number {
  return (9 * input) / 16;
}

export const toSixteenNine: Converter = {

  /**
   * Converts a value from the specified unit to inches (in).
   * @param {Unit} _from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in inches (in), or -1 if the
    conversion is not supported or input is invalid.
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
