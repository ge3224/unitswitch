import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

function _pixelsToPoints(px: number): number {
  return px * (72 / PPI);
}

/**
 * Converts a value from the specified unit to points (pt).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in points(pt), or -1 if the
 *                         conversion is not supported or input is invalid.
 */
export const convertToPoints: Converter = function convertToPoints(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Centimeters:
      return input * 28.3464567;
    case Units.Feet:
      return input * 864;
    case Units.Inches:
      return input * 72;
    case Units.Millimeters:
      return input * 2.83464567;
    case Units.Picas:
      return input * 12;
    case Units.Pixels:
      return _pixelsToPoints(input);
    case Units.Points:
      return input;
    case Units.Rems:
      return _pixelsToPoints(input * FONT_SIZE);
    default:
      return -1;
  }
};
