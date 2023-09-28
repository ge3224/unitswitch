import { Unit } from "@/units";
import { Converter, ConverterProps, PPI, FONT_SIZE } from ".";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";
import { bootstrapInPixels } from "./Bootstrap";
import { tailwindInPixels } from "./Pixels";

/**
 * Points Component
 *
 * This component is used to convert a value from a specified unit to Points (pt).
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Points Converter component.
 */
export default function Points({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toPoints.convert(from, input);

  console.log(
    "points->\n",
    tailwindInPixels.map((x) => pixelsToPoints(x)),
  );

  const onKeyPT = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(3) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyPT);

    return () => {
      document.removeEventListener("keydown", onKeyPT);
    };
  });

  return (
    <Wrapper
      base={Unit.Points}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toPoints}
    />
  );
}

/**
 * Points equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the centimetre equivalent of that Tailwind
 * size. For example, the 'p-4' Tailwind class would correspond to 12 points (pt).
 */
const tailwindInPoints = [
  0, 0.75, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 15, 18, 21, 24, 27, 30, 33, 36, 42,
  48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 216, 240, 288,
];

/**
 * Points equivalent values for Bootstrap CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Bootstrap CSS
 * class name. The values represent the points (pt) equivalent of that Bootstrap size.
 * For example, the 'p-1' Bootstrap class would correspond to 5.333333333333333 points.
 */
const bootstrapInPoints = [0, 3, 6, 12, 18, 36];

/**
 * Convert Pixels to Points
 *
 * This function converts a value from pixels to points based on a specified DPI (dots per inch).
 *
 * @param {number} px - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in points.
 */
const pixelsToPoints = (px: number): number => {
  return px * (72 / PPI);
};

/**
 * Converts a value from a specified unit to points (pt).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number}     - The converted value in points.
 *                         Returns -1 if the unit is not supported.
 */
export const toPoints: Converter = {
  /**
   * Converts a value from the specified unit to points (pt).
   *
   * @param {Unit} from    - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number}     - The converted value in points(pt), or -1 if the
   *                         conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;

    switch (from) {
      case Unit.Bootstrap:
        return input <= bootstrapInPoints.length - 1 && input % 1 === 0
          ? bootstrapInPoints[input]
          : -1;
      case Unit.Centimetres:
        return input * 28.3464567;
      case Unit.Ems:
        return pixelsToPoints(input * FONT_SIZE);
      case Unit.Feet:
        return input * 864;
      case Unit.Inches:
        return input * 72;
      case Unit.Millimetres:
        return input * 2.83464567;
      case Unit.Picas:
        return input * 12;
      case Unit.Pixels:
        return pixelsToPoints(input);
      case Unit.Points:
        return input;
      case Unit.Rems:
        return pixelsToPoints(input * FONT_SIZE);
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInPoints, input);
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in points (pt) to a
   * string representation.
   *
   * @param {number} conversion - The converted value in points (pt).
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = roundToDecimal(conversion, 5).toString();
    return str.length < 9 ? str : str.slice(0, 6) + "..";
  },
};
