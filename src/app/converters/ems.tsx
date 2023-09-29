import { useEffect } from "react";
import { Unit } from "@/units";
import { getIntersectingValue } from "@/shared/arrays";
import { roundToDecimal } from "@/shared/round_number";
import { Converter, ConverterProps, PPI, FONT_SIZE } from "@/converters";
import Wrapper from "@/converters/Wrapper";
import { tailwindSizes } from "@/converters/tailwind";

/**
 * Ems Component
 *
 * This component converts a value from various CSS unit systems to Ems
 * and provides a hotkey to copy the converted value to the clipboard.
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - A React element representing the Ems component.
 */
export default function Ems({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toEms.convert(from, input);

  const onEmKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onEmKey);

    return () => {
      document.removeEventListener("keydown", onEmKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Ems}
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toEms}
    >
      <div className="text-app-black">
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
 * For example, `bootstrapInEms[1]` corresponds to `p-1`, which adds padding of 0.25em.
 */
const bootstrapInEms = [0, 0.25, 0.5, 1, 1.5, 3];

/**
 * Em equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this object corresponds to a specific size in a Tailwind CSS class name. The
 * values represent the em equivalent of that Tailwind size class. For example, `tailwindInEms[4]` 
 * corresponds to the 'p-4' Tailwind class, which would correspond to 0.25em of padding 
 * applied to an HTML element.
 */
const tailwindInEms = [
  0, 0.0625, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20,
  24,
];

/**
 * Convert Pixels to Ems
 *
 * This function converts a value from pixels to ems based on a specified DPI (dots per inch).
 *
 * @param {number} px - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in em.
 */
function pixelsToEms(px: number): number {
  return px / FONT_SIZE;
}

/**
 * toEms Converter
 *
 * This object provides conversion functions from various unit systems to Ems.
 */
export const toEms: Converter = {
  convert: (from: Unit, input: number) => {
    switch (from) {
      case Unit.Bootstrap:
        return input >= 0 && input <= bootstrapInEms.length - 1
          ? bootstrapInEms[input]
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
        return pixelsToEms(input);
      case Unit.Points:
        return (input / 72) * (PPI / FONT_SIZE);
      case Unit.Rems:
        return input;
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInEms, input);
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in ems to a
   * string representation.
   *
   * @param {number} conversion - The converted value in ems.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = roundToDecimal(conversion, 5).toString();
    return str.length < 9 ? str : str.slice(0, 6) + "..";
  },
};
