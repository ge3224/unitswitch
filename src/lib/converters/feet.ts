import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from pixels to feet based on a specified DPI (dots per
 * inch).
 */
function _pixelsToFeet(px: number): number {
  return px / PPI / 12;
}

/**
 * Converts a value from the specified unit to feet (ft).
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number} - The converted value in feet (ft), or -1 if the
 *                     conversion is not supported or input is invalid.
 */
export const convertToFeet: Converter = function convertToFeet(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Centimeters:
      return input / 30.48;
    case Units.Feet:
      return input;
    case Units.Inches:
      return input / 12;
    case Units.Millimeters:
      return input * 0.00328084;
    case Units.Picas:
      return (input * 0.1667) / 12;
    case Units.Pixels:
      return _pixelsToFeet(input);
    case Units.Points:
      return input / 72 / 12;
    case Units.Rems:
      return (input * FONT_SIZE) / (12 * PPI);
    default:
      return -1;
  }
};
