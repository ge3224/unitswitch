import { Unit } from "@/units";
import { Converter, ConverterProps, FONT_SIZE } from "@/converters";
import { useEffect } from "react";
import Wrapper from "@/converters/wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { tailwindSizes } from "@/converters/tailwind";
import { getIntersectingValue } from "@/shared/arrays";

/**
 * Millimetres Component
 *
 * This component is used to convert a value from a specified unit to millimetres (mm).
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Millimetres Converter component.
 */
export default function Millimetres({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toMillimetres.convert(from, input);

  const onMmKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onMmKey);

    return () => {
      document.removeEventListener("keydown", onMmKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Millimetres}
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toMillimetres}
    />
  );
}

/**
 * Millimetre equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the millimetre equivalent of that Tailwind
 * size class. For example, the 'p-4' Tailwind class, which would correspond to
 * 9.525 mm.
 */
const tailwindInMillimetres = [
  0, 0.264583, 0.529167, 1.058333, 1.5875, 2.116667, 2.645833, 3.175, 3.704167,
  4.233333, 5.291667, 6.35, 7.408333, 8.466667, 9.525, 10.58333, 11.64167, 12.7,
  14.81667, 16.93333, 21.16667, 25.4, 29.63333, 33.86667, 38.1, 42.33333,
  46.56667, 50.8, 55.03333, 59.26667, 63.5, 67.73333, 76.2, 84.66667, 101.6,
];

/**
 * Millimetre equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the millimetre equivalent of that Tailwind
 * size class. For example, the 'p-4' Tailwind class, which would correspond to
 * 9.525 mm.
 */
const bootstrapInMillimetres = [
  0, 1.0583332, 2.1166664, 4.2333328, 6.349999200000001, 12.699998400000002,
];

/**
 * Convert Pixels to Millimetres
 *
 * This function converts a value from pixels to millimetres based on a specified DPI (dots per inch).
 *
 * @param {number} px - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in millimetres.
 */
function pixelsToMillimetres(px: number): number {
  return px * 0.2645833;
}

/**
 * The `toMillimetres` object implements the Converter type by provising a function
 * that convert various units into millimeters.
 *
 * @type {Converter}
 */
export const toMillimetres: Converter = {
  /**
   * Converts a value from the specified unit to millimeters.
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in millimeters, or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;

    switch (from) {
      case Unit.Bootstrap:
        return input <= bootstrapInMillimetres.length - 1 && input % 1 === 0
          ? roundToDecimal(bootstrapInMillimetres[input], 4)
          : -1;
      case Unit.Centimetres:
        return input * 10;
      case Unit.Ems:
        return pixelsToMillimetres(input * FONT_SIZE);
      case Unit.Feet:
        return input * 304.8;
      case Unit.Inches:
        return input * 25.4;
      case Unit.Millimetres:
        return input;
      case Unit.Picas:
        return input * 4.23333333;
      case Unit.Pixels:
        return pixelsToMillimetres(input);
      case Unit.Points:
        return input * 0.352778;
      case Unit.Rems:
        return pixelsToMillimetres(input * FONT_SIZE);
      case Unit.Tailwind:
        return getIntersectingValue(
          tailwindSizes,
          tailwindInMillimetres,
          input,
        );
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in millimeters to a
   * string representation.
   *
   * @param {number} conversion - The converted value in millimeters.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = roundToDecimal(conversion, 5).toString();
    return str.length < 9 ? str : str.slice(0, 7) + "..";
  },
};
