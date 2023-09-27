import { useEffect } from "react";
import { Unit } from "@/units";
import Wrapper from "@/converters/Wrapper";
import { Converter, DPI, FONT_SIZE } from "@/converters";
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
 * @param {object} props - The component's properties.
 * @param {number} props.input - The input value to be converted to pixels.
 * @param {Unit} props.from - The unit of measurement to convert from (defined as an enum 'Unit').
 * @param {string} props.hotkey - The hotkey combination to trigger clipboard copying.
 * @returns {JSX.Element} - A React JSX element that displays the converted value.
 */
export default function Pixels({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toPixels.convert(from, input);

  const hotkeyHandler = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hotkeyHandler);

    return () => {
      document.removeEventListener("keydown", hotkeyHandler);
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
  convert: (from: Unit, input: number): number => {
    switch (from) {
      case Unit.Bootstrap:
        const bs = [0, 4, 8, 16, 24, 48];
        return input >= 0 && input <= bs.length - 1 ? bs[input] : -1;
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
        return getIntersectingValue(tailwindSizes, tailwindInPixels, input);
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
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
