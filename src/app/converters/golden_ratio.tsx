import { Unit } from "@/units";
import { Converter, ConverterProps } from "@/converters";
import Wrapper from "@/converters/wrapper";
import { useEffect } from "react";

/**
 * GoldenRatio Component
 *
 * This component converts a value from one unit of measurement to its corresponding value
 * in golden ratios and provides an option to copy the result to the clipboard using
 * a specified hotkey combination.
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the GoldenRatio component.
 */
export default function GoldenRatio({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toGolden.convert(from, input);

  const onGrKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onGrKey);

    return () => {
      document.removeEventListener("keydown", onGrKey);
    };
  });

  return (
    <Wrapper
      base="Golden Ratio"
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toGolden}
    >
      <div className="flex justify-center pt-4">
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
            className="fill-app-green-300 stroke-app-green-600"
          />
          <path
            d="M52.0223 2.69029L192.841 88.7806"
            className="stroke-app-green-600"
            strokeDasharray="2 2"
          />
          <path
            d="M134.092 88.7806V1.79352"
            className="stroke-app-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M134.092 88.7806L193.113 1.79352"
            className="stroke-app-green-600"
            strokeDasharray="2 2"
          />
          <rect
            x="213.074"
            y="88.2806"
            width="85.9871"
            height="51.9192"
            transform="rotate(-90 213.074 88.2806)"
            className="fill-app-green-300 stroke-app-green-600"
          />
          <path
            d="M212.574 88.7806L265.317 1.79349"
            className="stroke-app-green-600"
            strokeDasharray="2 2"
          />
          <path
            d="M264.596 37.6645L213.471 37.6645"
            className="stroke-app-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M265.317 37.6645L212.574 1.61973"
            className="stroke-app-green-600"
            strokeDasharray="2 2"
          />

          <path className="stroke-app-green-400" d="M292 0.89679V37.6645" />
          <path className="stroke-app-green-400" d="M284 0.89679L300 0.89679" />
          <path className="stroke-app-green-400" d="M284 37.6645L300 37.6645" />

          <path
            className="stroke-app-green-400"
            d="M264.596 114.787L212.574 114.787"
          />
          <path className="stroke-app-green-400" d="M212.574 124.203V106.716" />
          <path className="stroke-app-green-400" d="M264.596 124.203V106.716" />
          <path
            className="stroke-app-green-600"
            d="M19.17548 2.69031H36.6657"
          />
          <path className="stroke-app-green-600" d="M27.6448 87.8839V2.69031" />
          <path
            className="stroke-app-green-600"
            d="M19.17548 87.8839H36.6657"
          />
          <path
            className="stroke-app-green-400"
            d="M192.841 114.787L51.1254 114.787"
          />
          <path className="stroke-app-green-400" d="M51.1254 124.203V106.716" />
          <path className="stroke-app-green-400" d="M192.841 124.203V106.716" />
          <text
            className="fill-app-green-600 text-sm font-bold "
            x="16"
            y="44"
            transform="rotate(-90,16,44)"
            textAnchor="middle"
          >
            {input.toFixed(2)}
          </text>
          <text
            className="fill-app-green-400 text-sm font-bold"
            x="125"
            y="140"
            textAnchor="middle"
          >
            {longer(input).toFixed(2)}
          </text>
          <text
            className="fill-app-green-400 text-sm font-bold"
            x="297"
            y="50"
            transform="rotate(-90,297,50)"
            textAnchor="end"
          >
            {shorter(shorter(input)).toFixed(2)}
          </text>
          <text
            className="fill-app-green-400 text-sm font-bold"
            x="239"
            y="140"
            textAnchor="middle"
          >
            {shorter(input).toFixed(2)}
          </text>
        </svg>
      </div>
    </Wrapper>
  );
}

/**
 * Calculate the value increased by the golden ratio (1.61803 times).
 *
 * @param {number} input - The input value to be increased.
 *
 * @returns {number} - The input value multiplied by the golden ratio.
 */
function longer(input: number): number {
  return input * 1.61803;
}

/**
 * Calculate the value decreased by the golden ratio (1.61803 times).
 *
 * @param {number} input - The input value to be decreased.
 *
 * @returns {number} - The input value divided by the golden ratio.
 */
function shorter(input: number): number {
  return input / 1.61803;
}

/**
 * Converter for Golden Ratio
 *
 * This object provides methods to convert a value to a longer length based on the golden ratio
 * and to render the converted value as a string representation.
 */
export const toGolden: Converter = {
  /**
   * Converts a value from the specified unit to a longer length based on the golden ratio.
   *
   * @param {Unit} _from - The unit to convert from (unused in this implementation).
   * @param {number} input - The value to be converted.
   *
   * @returns {number} - The converted value, or -1 if the
   *                     conversion is not supported or the input is invalid.
   */
  convert: (_from: Unit, input: number): number => {
    // Check for invalid input values
    return input < 0 ? -1 : longer(input);
  },

  /**
   * Renders a converted value to a string representation.
   *
   * @param {number} conversion - The value to convert.
   *
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    // Handle invalid conversions
    if (conversion < 0) return "N/A";

    // Limit the string length to ensure readability
    const str = conversion.toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
