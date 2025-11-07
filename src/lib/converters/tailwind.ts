import type { Converter } from "./types.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { interpolateInRange } from "@/lib/arrays.ts";

/**
 * An array representing the Tailwind CSS sizes for spacing.
 *
 * This array maps the index to the corresponding Tailwind CSS size value. For
 * example, the value of `twSizes[4]`, 1, corresponds to the 'p-1' Tailwind
 * utility class.
 */
export const tailwindSizes = [
  0,
  0.25,
  0.5,
  1,
  1.5,
  2,
  2.5,
  3,
  3.5,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
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
  52,
  56,
  60,
  64,
  72,
  80,
  96,
];

/**
 * Converts a value from the specified unit to tailwindcss sizes.
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in tailwindcss sizes, or -1 if the
 *                         conversion is not supported or input is invalid.
 */
export const convertToTailwind: Converter = function convertToTailwind(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Bootstrap:
      const bs = [0, 1, 2, 4, 6, 12];
      return input >= 0 && input <= bs.length - 1 ? bs[input] : -1;
    case Units.Centimeters:
      return interpolateInRange(input, tailwindSizes, 0, 10.15999872);
    case Units.Ems:
      return interpolateInRange(input, tailwindSizes, 0, 24);
    case Units.Feet:
      return interpolateInRange(input, tailwindSizes, 0, 0.33333329133858);
    case Units.Inches:
      return interpolateInRange(input, tailwindSizes, 0, 3.999999496063);
    case Units.Millimeters:
      return interpolateInRange(input, tailwindSizes, 0, 101.5999872);
    case Units.Picas:
      return interpolateInRange(input, tailwindSizes, 0, 23.999996995276);
    case Units.Pixels:
      return interpolateInRange(input, tailwindSizes, 0, 384);
    case Units.Points:
      return interpolateInRange(input, tailwindSizes, 0, 287.99978229935);
    case Units.Rems:
      return interpolateInRange(input, tailwindSizes, 0, 24);
    case Units.Tailwind:
      const included = tailwindSizes.indexOf(input);
      return included >= 0 ? input : -1;
    default:
      return -1;
  }
};
