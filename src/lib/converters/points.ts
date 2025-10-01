import type { Converter } from "@/lib/converter";
import { FONT_SIZE, PPI } from "@/lib/constants";
import { Units, type Unit } from "@/lib/units";
import { getIntersectingValue } from "@/lib/arrays";
import { tailwindSizes } from "@/lib/converters/tailwind";

function _pixelsToPoints(px: number): number {
  return px * (72 / PPI);
}

/**
 * Points equivalent values for Bootstrap CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Bootstrap CSS
 * class name. The values represent the points (pt) equivalent of that Bootstrap size.
 * For example, the 'p-1' Bootstrap class would correspond to 5.333333333333333 points.
 */
const _bootstrapToPoints = [0, 3, 6, 12, 18, 36];

/**
 * Points equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the centimetre equivalent of that Tailwind
 * size. For example, the 'p-4' Tailwind class would correspond to 12 points (pt).
 */
const _tailwindToPoints = [
  0, 0.75, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 15, 18, 21, 24, 27, 30, 33, 36, 42,
  48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 216, 240, 288,
];

/**
 * Converts a value from the specified unit to points (pt).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in points(pt), or -1 if the
 *                         conversion is not supported or input is invalid.
 */
export const convertToPoints: Converter = function convertToPoints(from: Unit, input: number): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Bootstrap:
      return input <= _bootstrapToPoints.length - 1 && input % 1 === 0
        ? _bootstrapToPoints[input]
        : -1;
    case Units.Centimetres:
      return input * 28.3464567;
    case Units.Ems:
      return _pixelsToPoints(input * FONT_SIZE);
    case Units.Feet:
      return input * 864;
    case Units.Inches:
      return input * 72;
    case Units.Millimetres:
      return input * 2.83464567;
    case Units.Picas:
      return input * 12;
    case Units.Pixels:
      return _pixelsToPoints(input);
    case Units.Points:
      return input;
    case Units.Rems:
      return _pixelsToPoints(input * FONT_SIZE);
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, _tailwindToPoints, input);
    default:
      return -1;
  }
}
