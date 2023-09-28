import { Unit } from "@/units";
import { Converter, ConverterProps, PPI, FONT_SIZE } from ".";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

/**
 * Inches Converter Component
 *
 * The Inches component converts a value from a specified unit to inches (in).
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Inches Converter component.
 */
export default function Inches({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toInches.convert(from, input);

  const onInchKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onInchKey);

    return () => {
      document.removeEventListener("keydown", onInchKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Inches}
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toInches}
    />
  );
}

/**
 * Inch equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the Inches (in) equivalent of that Tailwind size.
 * For example, the 'p-4' Tailwind class would correspond to 0.16666666666666666 inch.
 */
export const tailwindInInches = [
  0, 0.010416666666666666, 0.020833333333333332, 0.041666666666666664, 0.0625,
  0.08333333333333333, 0.10416666666666667, 0.125, 0.14583333333333334,
  0.16666666666666666, 0.20833333333333334, 0.25, 0.2916666666666667,
  0.3333333333333333, 0.375, 0.4166666666666667, 0.4583333333333333, 0.5,
  0.5833333333333334, 0.6666666666666666, 0.8333333333333334, 1,
  1.1666666666666667, 1.3333333333333333, 1.5, 1.6666666666666667,
  1.8333333333333333, 2, 2.1666666666666665, 2.3333333333333335, 2.5,
  2.6666666666666665, 3, 3.3333333333333335, 4,
];

/**
 * Convert Pixels to Inches
 *
 * This function converts a value from pixels to inches based on a specified DPI (dots per inch).
 *
 * @param {number} px - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in inches.
 */
function pixelsToInches(px: number): number {
  return px / PPI;
}

/**
 * The `toInches` object implements the `Converter` type by providing both
 * the `convert` and `render` functions used to process incoming values from
 * other units into inches (in).
 */
export const toInches: Converter = {
  /**
   * Converts a value from the specified unit to inches (in).
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in inches (in), or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        const bs = [
          0, 0.041666666666666664, 0.08333333333333333, 0.16666666666666666,
          0.25, 0.5,
        ];
        return input <= bs.length - 1 && input % 1 === 0 ? bs[input] : -1;
      case Unit.Centimetres:
        return input * 0.393701;
      case Unit.Ems:
        return (input * FONT_SIZE) / PPI;
      case Unit.Feet:
        return input * 12;
      case Unit.Inches:
        return input;
      case Unit.Millimetres:
        return input * 0.0393701;
      case Unit.Picas:
        return input / 6;
      case Unit.Pixels:
        return pixelsToInches(input);
      case Unit.Points:
        return input / 72;
      case Unit.Rems:
        return (input * FONT_SIZE) / PPI;
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInInches, input);
      default:
        return -1;
    }
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

    const str = roundToDecimal(conversion, 5).toString();
    return str.length < 9 ? str : str.slice(0, 6) + "..";
  },
};
