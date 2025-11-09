import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

function _pixelsToCentimeters(pixels: number): number {
  return (pixels / PPI) * 2.54;
}

export const convertToCentimeters: Converter = function convertToCentimeters(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Centimeters:
      return input;
    case Units.Feet:
      return input * 30.48;
    case Units.Inches:
      return input * 2.54;
    case Units.Millimeters:
      return input / 10;
    case Units.Picas:
      return input * ((1 / 6) * 2.54);
    case Units.Pixels:
      return _pixelsToCentimeters(input);
    case Units.Points:
      return input * (2.54 / 72);
    case Units.Rems:
      return _pixelsToCentimeters(input * FONT_SIZE);
    default:
      return -1;
  }
};
