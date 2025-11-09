import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from pixels to picas based on a specified DPI (dots per inch).
 */
function _pixelsToPicas(pixels: number): number {
  return (pixels * 6) / PPI;
}

export const convertToPicas: Converter = function convertToPicas(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Centimeters:
      return input * 2.362204724;
    case Units.Feet:
      return input * 72;
    case Units.Inches:
      return input * 6;
    case Units.Millimeters:
      return input * 0.236220472;
    case Units.Picas:
      return input;
    case Units.Pixels:
      return _pixelsToPicas(input);
    case Units.Points:
      return input * 0.0833;
    case Units.Rems:
      return _pixelsToPicas(input * FONT_SIZE);
    default:
      return -1;
  }
};
