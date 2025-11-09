import type { Converter } from "./types.ts";
import { FONT_SIZE } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { roundToDecimal } from "@/lib/round_number.ts";

/**
 * Converts a value from pixels to millimetres based on a specified DPI (dots per inch).
 */
function _pixelsToMillimeters(px: number): number {
  return px * 0.2645833;
}

export const convertToMillimeters: Converter = function convertToMillimeters(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Centimeters:
      return input * 10;
    case Units.Feet:
      return input * 304.8;
    case Units.Inches:
      return input * 25.4;
    case Units.Millimeters:
      return input;
    case Units.Picas:
      return input * 4.23333333;
    case Units.Pixels:
      return _pixelsToMillimeters(input);
    case Units.Points:
      return input * 0.352778;
    case Units.Rems:
      return _pixelsToMillimeters(input * FONT_SIZE);
    default:
      return -1;
  }
};
