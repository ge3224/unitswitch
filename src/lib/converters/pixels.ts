import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from a specified unit to pixels.
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number} The converted value in pixels. Returns -1 if the unit is not supported.
 */
export const convertToPixels: Converter = function convertToPixels(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Centimeters:
      return Math.ceil(input * (PPI / 2.54));
    case Units.Feet:
      return Math.ceil(input * 12 * PPI);
    case Units.Inches:
      return Math.ceil(input * PPI);
    case Units.Millimeters:
      return Math.ceil(input * (PPI / 25.4));
    case Units.Picas:
      return Math.ceil(input * (1 / 6) * PPI);
    case Units.Pixels:
      return Math.ceil(input);
    case Units.Points:
      return Math.ceil(input * (PPI / 72));
    case Units.Rems:
      return Math.ceil(input * FONT_SIZE);
    default:
      return -1;
  }
};
