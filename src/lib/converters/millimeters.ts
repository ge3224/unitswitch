import type { Converter } from "@/lib/converter";
import { FONT_SIZE } from "@/lib/constants";
import { Units, type Unit } from "@/lib/units";
import { getIntersectingValue } from "@/lib/arrays";
import { roundToDecimal } from "@/lib/round_number";
import { tailwindSizes } from "@/lib/converters/tailwind";

/**
 * Millimetre equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the millimetre equivalent of that Tailwind
 * size class. For example, the 'p-4' Tailwind class, which would correspond to
 * 9.525 mm.
 */
const _bootstrapToMillimeters = [
  0, 1.0583332, 2.1166664, 4.2333328, 6.349999200000001, 12.699998400000002,
];

/**
 * Millimetre equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the millimetre equivalent of that Tailwind
 * size class. For example, the 'p-4' Tailwind class, which would correspond to
 * 9.525 mm.
 */
const _tailwindToMillimeters = [
  0, 0.264583, 0.529167, 1.058333, 1.5875, 2.116667, 2.645833, 3.175, 3.704167,
  4.233333, 5.291667, 6.35, 7.408333, 8.466667, 9.525, 10.58333, 11.64167, 12.7,
  14.81667, 16.93333, 21.16667, 25.4, 29.63333, 33.86667, 38.1, 42.33333,
  46.56667, 50.8, 55.03333, 59.26667, 63.5, 67.73333, 76.2, 84.66667, 101.6,
];

/**
 * Converts a value from pixels to millimetres based on a specified DPI (dots per inch).
 */
function _pixelsToMillimeters(px: number): number {
  return px * 0.2645833;
}

export const convertToMillimeters: Converter = function convertToMillimeters(
  from: Unit,
  input: number
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Bootstrap:
      return input <= _bootstrapToMillimeters.length - 1 && input % 1 === 0
        ? roundToDecimal(_bootstrapToMillimeters[input], 4)
        : -1;
    case Units.Centimeters:
      return input * 10;
    case Units.Ems:
      return _pixelsToMillimeters(input * FONT_SIZE);
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
    case Units.Tailwind:
      return getIntersectingValue(
        tailwindSizes,
        _tailwindToMillimeters,
        input,
      );
    default:
      return -1;
  }
}
