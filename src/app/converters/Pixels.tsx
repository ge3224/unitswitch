import { useEffect } from "react";
import { Unit } from "@/units";
import Wrapper from "@/converters/Wrapper";
import { Converter, ConverterProps, DPI, FONT_SIZE } from "@/converters";
import { RoundingMethod, roundToDecimal } from "@/shared/round_number";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

/**
 * Pixels Component
 *
 * This component converts a value from one unit of measurement to pixels, and
 * allows users to copy the result to the clipboard using a specified
 * hotkey combination.
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Pixels Converter component.
 */
export default function Pixels({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toPixels.convert(from, input);

  const onPxKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onPxKey);

    return () => {
      document.removeEventListener("keydown", onPxKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Pixels}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toPixels}
    >
      <div className="font-space text-app-black">
        Based on a resolution of <span className="font-bold">{DPI} DPI</span>
      </div>
    </Wrapper>
  );
}

/**
 * Pixel equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the pixel equivalent of that Tailwind size.
 * For example, the 'p-4' Tailwind class would correspond to 16px.
 */
export const tailwindInPixels = [
  0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80,
  96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 288, 320, 384,
];

/**
 * Converts a value from a specified unit to pixels.
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number} The converted value in pixels. Returns -1 if the unit is not supported.
 */
export const toPixels: Converter = {

  /**
   * Converts a value from the specified unit to pixels (px).
   *
   * @param {Unit} from    - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number}     - The converted value in pixels (px), or -1 if the
   *                         conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        const bs = [0, 4, 8, 16, 24, 48];
        return input <= bs.length - 1 ? bs[input] : -1;
      case Unit.Centimetres:
        return roundToDecimal(input * (DPI / 2.54), 0, RoundingMethod.Ceil);
      case Unit.Ems:
        return roundToDecimal(input * FONT_SIZE, 0, RoundingMethod.Ceil);
      case Unit.Feet:
        return roundToDecimal(input * 12 * DPI, 0, RoundingMethod.Ceil);
      case Unit.Inches:
        return roundToDecimal(input * DPI, 0, RoundingMethod.Ceil);
      case Unit.Millimetres:
        return roundToDecimal(input * (DPI / 25.4), 0, RoundingMethod.Ceil);
      case Unit.Picas:
        return roundToDecimal(input * (1 / 6) * DPI, 0, RoundingMethod.Ceil);
      case Unit.Pixels:
        return roundToDecimal(input, 0, RoundingMethod.Ceil);
      case Unit.Points:
        return roundToDecimal(input * (DPI / 72), 0, RoundingMethod.Ceil);
      case Unit.Rems:
        return roundToDecimal(input * FONT_SIZE, 0, RoundingMethod.Ceil);
      case Unit.Tailwind:
        return (getIntersectingValue(tailwindSizes, tailwindInPixels, input));
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in pixels to a
   * string representation.
   *
   * @param {number} conversion - The converted value in pixels.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 9 ? str : str.slice(0, 6) + "..";
  },
};
