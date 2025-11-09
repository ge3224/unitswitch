import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from pixels to inches based on a specified DPI (dots per inch).
 */
function _pixelsToInches(px: number): number {
  return px / PPI;
}

export const convertToInches: Converter = function convertToInches(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Centimeters:
      return input * 0.393701;
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
    default:
      return -1;
  }
};
