import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from pixels to rems based on a specified DPI (dots per inch).
 */
function _pixelsToRems(px: number): number {
  return px / FONT_SIZE;
}

export const convertToRems: Converter = function convertToRems(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Centimeters:
      return (input * 0.3937008 * PPI) / FONT_SIZE;
    case Units.Feet:
      return (input * 12 * PPI) / FONT_SIZE;
    case Units.Inches:
      return (input * PPI) / FONT_SIZE;
    case Units.Millimeters:
      return (PPI / 25.4 / FONT_SIZE) * input;
    case Units.Picas:
      return (PPI / 6 / FONT_SIZE) * input;
    case Units.Pixels:
      return _pixelsToRems(input);
    case Units.Points:
      return (input / 72) * (PPI / FONT_SIZE);
    case Units.Rems:
      return input;
    default:
      return -1;
  }
};
