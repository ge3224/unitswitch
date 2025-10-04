import type { Converter } from "@/lib/converter";
import { FONT_SIZE, PPI } from "@/lib/constants";
import { Units, type Unit } from "@/lib/units";
import { getIntersectingValue } from "@/lib/arrays";
import { tailwindSizes } from "@/lib/converters/tailwind";

/**
 * Inch equivalent values for Tailwind CSS spacing and sizing classes.
 */
export const _tailwindToInches = [
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
 * Converts a value from pixels to inches based on a specified DPI (dots per inch).
 */
function _pixelsToInches(px: number): number {
  return px / PPI;
}

export const convertToInches: Converter = function convertToInches(
  from: Unit,
  input: number
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Bootstrap:
      const bs = [
        0, 0.041666666666666664, 0.08333333333333333, 0.16666666666666666,
        0.25, 0.5,
      ];
      return input <= bs.length - 1 && input % 1 === 0 ? bs[input] : -1;
    case Units.Centimeters:
      return input * 0.393701;
    case Units.Ems:
      return (input * FONT_SIZE) / PPI;
    case Units.Feet:
      return input * 12;
    case Units.Inches:
      return input;
    case Units.Millimeters:
      return input * 0.0393701;
    case Units.Picas:
      return input / 6;
    case Units.Pixels:
      return _pixelsToInches(input);
    case Units.Points:
      return input / 72;
    case Units.Rems:
      return (input * FONT_SIZE) / PPI;
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, _tailwindToInches, input);
    default:
      return -1;
  }
}
