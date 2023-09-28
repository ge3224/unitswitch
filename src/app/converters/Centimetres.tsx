import { useEffect } from "react";
import { Unit } from "@/units";
import { getIntersectingValue } from "@/shared/arrays";
import { roundToDecimal } from "@/shared/round_number";
import { Converter, ConverterProps, PPI, FONT_SIZE } from "@/converters";
import Wrapper from "@/converters/Wrapper";
import { tailwindSizes } from "@/converters/Tailwind";

/**
 * Centimetres Component
 *
 * This component is used to convert a value from a specified unit to centimetres (cm).
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Centimetres Converter component.
 */
export default function Centimetres({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toCentimetres.convert(from, input);

  const onCmKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onCmKey);

    return () => {
      document.removeEventListener("keydown", onCmKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Centimetres}
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toCentimetres}
    >
      {""}
    </Wrapper>
  );
}

/**
 * Centimetre equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the centimetre equivalent of that Tailwind
 * size. For example, the 'p-4' Tailwind class would correspond to 0.42333328 cm.
 */
export const tailwindInCm = [
  0, 0.02645833, 0.05291666, 0.10583332, 0.15874997999999998, 0.21166664,
  0.26458329999999997, 0.31749995999999997, 0.37041662, 0.42333328,
  0.5291665999999999, 0.6349999199999999, 0.74083324, 0.84666656, 0.95249988,
  1.0583331999999999, 1.16416652, 1.2699998399999999, 1.48166648, 1.69333312,
  2.1166663999999997, 2.5399996799999998, 2.96333296, 3.38666624, 3.80999952,
  4.2333327999999995, 4.65666608, 5.0799993599999995, 5.50333264, 5.92666592,
  6.3499992, 6.77333248, 7.61999904, 8.466665599999999, 10.159998719999999,
];

/**
 * Centimetre equivalent values for Bootstrap CSS spacing and sizing classes.
 *
 * Each key in this array correspond to a specific size in Bootstrap. The values
 * represent the centimetre equivalent of that Bootstrap size. For example, the
 * 'p-4' Bootstrap class would correspond to 0.25 cm.
 */
const bootstrapInCm = [
  0, 0.041666666666666664, 0.08333333333333333, 0.16666666666666666, 0.25, 0.5,
];

/**
 * The `toCentimetres` object implements the `Converter` type by providing both
 * the `convert` and `render` functions used to process incoming values from
 * other units into centimetres.
 */
export const toCentimetres: Converter = {
  /**
   * Converts a value from the specified unit to centimetres (cm).
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in centimetres (cm), or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;

    const pixelsToCentimeters = (pixels: number): number => {
      return (pixels / PPI) * 2.54;
    };

    switch (from) {
      case Unit.Bootstrap:
        return input <= bootstrapInCm.length - 1 ? bootstrapInCm[input] : -1;
      case Unit.Centimetres:
        return input;
      case Unit.Ems:
        return pixelsToCentimeters(input * FONT_SIZE);
      case Unit.Feet:
        return input * 30.48;
      case Unit.Inches:
        return input * 2.54;
      case Unit.Millimetres:
        return input / 10;
      case Unit.Picas:
        return input * ((1 / 6) * 2.54);
      case Unit.Pixels:
        return pixelsToCentimeters(input);
      case Unit.Points:
        return input * (2.54 / 72);
      case Unit.Rems:
        return pixelsToCentimeters(input * FONT_SIZE);
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInCm, input);
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in centimetres to a
   * string representation.
   *
   * @param {number} conversion - The converted value in centimetres.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = roundToDecimal(conversion, 5).toString();
    return str.length < 9 ? str : str.slice(0, 7) + "..";
  },
};
