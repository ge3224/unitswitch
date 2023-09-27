import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from "@/converters";
import { roundToDecimal } from "@/shared/round_number";
import { useEffect } from "react";
import Wrapper from "@/converters/Wrapper";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

/**
 * Rems Component
 *
 * This component converts a value from various CSS unit systems to Rems (root Em units)
 * and provides a hotkey to copy the converted value to the clipboard.
 *
 * @param {object} props - The component's properties.
 * @param {number} props.input - The input value to be converted.
 * @param {Unit} props.from - The unit of the input value.
 * @param {string} props.hotkey - The hotkey combination to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - A React element representing the Rems component.
 */
export default function Rems({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toRems.convert(from, input);

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
      base={Unit.Rems}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toRems}
    >
      <div className="font-space text-app-black">
        Based on a root font size of{" "}
        <span className="font-bold">{FONT_SIZE}px</span>
      </div>
    </Wrapper>
  );
}

/**
 * Spacing values for the Bootstrap CSS framework.
 *
 * This array maps index values to spacing values used in Bootstrap CSS classes.
 * For example, `bootstrap[1]` corresponds to `p-1`, which adds padding of 0.25rem.
 */

/**
 * Rem equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this object corresponds to a specific size in a Tailwind CSS class name. The
 * values represent the pixel equivalent of that Tailwind size class. For example,
 * `tailwind[4]` corresponds to the 'p-4' Tailwind class, which would correspond to 1rem
 * of padding applied to an HTML element.
 */
const tailwindInRems = [
  0, 0.063, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20,
  24,
];

/**
 * toRems Converter
 *
 * This object provides conversion functions from various unit systems to Rems.
 */
export const toRems: Converter = {
  convert: (from: Unit, input: number) => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        const bs = [0, 0.25, 0.5, 1, 1.5, 3];
        return input <= bs.length - 1 && input % 1 === 0
          ? bs[input]
          : -1;
      case Unit.Centimetres:
        return roundToDecimal((input * 0.3937008 * DPI) / FONT_SIZE, 3);
      case Unit.Ems:
        return roundToDecimal(input, 3);
      case Unit.Feet:
        return roundToDecimal((input * 12 * DPI) / FONT_SIZE, 3);
      case Unit.Inches:
        return roundToDecimal((input * DPI) / FONT_SIZE, 3);
      case Unit.Millimetres:
        return roundToDecimal((DPI / 25.4 / FONT_SIZE) * input, 3);
      case Unit.Picas:
        return roundToDecimal((DPI / 6 / FONT_SIZE) * input, 3);
      case Unit.Pixels:
        return roundToDecimal(input / FONT_SIZE, 3);
      case Unit.Points:
        return roundToDecimal((input / 72) * (DPI / FONT_SIZE), 3);
      case Unit.Rems:
        return roundToDecimal(input, 3);
      case Unit.Tailwind:
        return roundToDecimal(
          getIntersectingValue(tailwindSizes, tailwindInRems, input),
          4,
        );
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in rems to a
   * string representation.
   *
   * @param {number} conversion - The converted value in rems.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
