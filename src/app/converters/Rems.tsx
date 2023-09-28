import { Unit } from "@/units";
import { Converter, PPI, FONT_SIZE, ConverterProps } from "@/converters";
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
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Rems Converter component.
 */
export default function Rems({
  input,
  from,
  hotkey,
}: ConverterProps
): JSX.Element {
  const result = toRems.convert(from, input);

  const onRemKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onRemKey);

    return () => {
      document.removeEventListener("keydown", onRemKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Rems}
      input={input}
      from={from}
      hotkey={hotkey}
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
const bootstrapInRems = [0, 0.25, 0.5, 1, 1.5, 3];

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
 * Convert Pixels to Rems
 *
 * This function converts a value from pixels to rems based on a specified DPI (dots per inch).
 *
 * @param {number} px - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in rem.
 */
function pixelsToRems(px: number): number {
  return px / FONT_SIZE;
}

/**
 * toRems Converter
 *
 * This object provides conversion functions from various unit systems to Rems.
 */
export const toRems: Converter = {

  /**
   * Converts a value from the specified unit to rems.
   *
   * @param {Unit} from    - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number}     - The converted value in rems, or -1 if the
   *                         conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number) => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        return input <= bootstrapInRems.length - 1 && input % 1 === 0
          ? bootstrapInRems[input]
          : -1;
      case Unit.Centimetres:
        return (input * 0.3937008 * PPI) / FONT_SIZE;
      case Unit.Ems:
        return input;
      case Unit.Feet:
        return (input * 12 * PPI) / FONT_SIZE;
      case Unit.Inches:
        return (input * PPI) / FONT_SIZE;
      case Unit.Millimetres:
        return (PPI / 25.4 / FONT_SIZE) * input;
      case Unit.Picas:
        return (PPI / 6 / FONT_SIZE) * input;
      case Unit.Pixels:
        return pixelsToRems(input);
      case Unit.Points:
        return (input / 72) * (PPI / FONT_SIZE);
      case Unit.Rems:
        return input;
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInRems, input);
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

    const str = roundToDecimal(conversion, 3).toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
