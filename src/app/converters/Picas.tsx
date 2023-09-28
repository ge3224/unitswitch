import { Unit } from "@/units";
import Wrapper from "./Wrapper";
import { useEffect } from "react";
import { ConverterProps, PPI, FONT_SIZE } from ".";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";
import { roundToDecimal } from "@/shared/round_number";

/**
 * Picas Converter Component
 *
 * The Picas component converts a value from a specified unit to picas (pc).
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Picas Converter component.
 */
export default function Picas({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toPicas.convert(from, input);

  const onPcKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onPcKey);

    return () => {
      document.removeEventListener("keydown", onPcKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Picas}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toPicas}
    >
      {""}
    </Wrapper>
  );
}

/**
 * Pica equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the pica (pc) equivalent of that Tailwind size.
 * For example, the 'p-4' Tailwind class would correspond to 1 pica.
 */
export const tailwindInPicas = [
  0, 0.0625, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20,
  24,
];


/**
 * Pica equivalent values for Bootstrap CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Bootstrap CSS
 * class name. The values represent the pica (pc) equivalent of that Bootstrap size.
 * For example, the 'p-1' Bootstrap class would correspond to 0.25 picas.
 */
const bootstrapInPicas = [0, 0.25, 0.5, 1, 1.5, 3];

/**
 * Convert Pixels to Picas
 *
 * This function converts a value from pixels to picas based on a specified DPI (dots per inch).
 *
 * @param {number} pixels - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in picas.
 */
function pixelsToPicas(pixels: number): number {
  return (pixels * 6) / PPI;
}

/**
 * The `toPicas` object implements the `Converter` type by providing both
 * the `convert` and `render` functions used to process incoming values from
 * other units into picas.
 */
export const toPicas = {
  /**
   * Converts a value from the specified unit to picas (pc).
   *
   * @param {Unit} from    - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number}     - The converted value in picas (pc), or -1 if the
   *                         conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        return input <= bootstrapInPicas.length - 1 && input % 1 === 0 ? bootstrapInPicas[input] : -1;
      case Unit.Centimetres:
        return input * 2.362204724;
      case Unit.Ems:
        return pixelsToPicas(input * FONT_SIZE);
      case Unit.Feet:
        return input * 72;
      case Unit.Inches:
        return input * 6;
      case Unit.Millimetres:
        return input * 0.236220472;
      case Unit.Picas:
        return input;
      case Unit.Pixels:
        return pixelsToPicas(input);
      case Unit.Points:
        return input * 0.0833;
      case Unit.Rems:
        return pixelsToPicas(input * FONT_SIZE);
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInPicas, input);
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in picas (pc) to a
   * string representation.
   *
   * @param {number} conversion - The converted value in picas (pc).
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = roundToDecimal(conversion, 4).toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
