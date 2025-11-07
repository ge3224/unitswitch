import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { getIntersectingValue } from "@/lib/arrays.ts";
import { tailwindSizes } from "@/lib/converters/tailwind.ts";

/**
 * Pixel equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the pixel equivalent of that Tailwind size.
 * For example, the 'p-4' Tailwind class would correspond to 16px.
 */
export const _tailwindToPixels = [
  0,
  1,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  56,
  64,
  80,
  96,
  112,
  128,
  144,
  160,
  176,
  192,
  208,
  224,
  240,
  256,
  288,
  320,
  384,
];

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
    case Units.Bootstrap:
      const bs = [0, 4, 8, 16, 24, 48];
      return input <= bs.length - 1 ? bs[input] : -1;
    case Units.Centimeters:
      return Math.ceil(input * (PPI / 2.54));
    case Units.Ems:
      return Math.ceil(input * FONT_SIZE);
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
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, _tailwindToPixels, input);
    default:
      return -1;
  }
};
