import type { Converter } from "@/lib/converter";
import { FONT_SIZE, PPI } from "@/lib/constants";
import { Units, type Unit } from "@/lib/units";
import { getIntersectingValue } from "@/lib/arrays";
import { tailwindSizes } from "@/lib/converters/tailwind";

/**
 * Pica equivalent values for Bootstrap CSS spacing and sizing classes.
 */
const _bootstrapToPicas = [0, 0.25, 0.5, 1, 1.5, 3];

/**
 * Pica equivalent values for Tailwind CSS spacing and sizing classes.
 */
export const _tailwindToPicas = [
  0, 0.0625, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20,
  24,
];

/**
 * Converts a value from pixels to picas based on a specified DPI (dots per inch).
 */
function _pixelsToPicas(pixels: number): number {
  return (pixels * 6) / PPI;
}

export const convertToPicas: Converter = function convertToPicas(
  from: Unit,
  input: number
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Bootstrap:
      return input <= _bootstrapToPicas.length - 1 && input % 1 === 0 ? _bootstrapToPicas[input] : -1;
    case Units.Centimeters:
      return input * 2.362204724;
    case Units.Ems:
      return _pixelsToPicas(input * FONT_SIZE);
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
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, _tailwindToPicas, input);
    default:
      return -1;
  }
}
