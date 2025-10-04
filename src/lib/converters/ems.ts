import type { Converter } from "@/lib/converter";
import { FONT_SIZE, PPI } from "@/lib/constants";
import { Units, type Unit } from "@/lib/units";
import { getIntersectingValue } from "@/lib/arrays";
import { tailwindSizes } from "@/lib/converters/tailwind";

/**
 * Spacing values for the Bootstrap CSS framework.
 */
const _bootstrapToEms = [0, 0.25, 0.5, 1, 1.5, 3];

/**
 * Em equivalent values for Tailwind CSS spacing and sizing classes.
 */
const _tailwindToEms = [
  0, 0.0625, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20,
  24,
];

/**
 * Converts a value from pixels to ems based on a specified DPI (dots per inch).
 */
function _pixelsToEms(px: number): number {
  return px / FONT_SIZE;
}

export const convertToEms: Converter = function convertToEms(from: Unit, input: number): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Bootstrap:
      return input >= 0 && input <= _bootstrapToEms.length - 1
        ? _bootstrapToEms[input]
        : -1;
    case Units.Centimeters:
      return (input * 0.3937008 * PPI) / FONT_SIZE;
    case Units.Ems:
      return input;
    case Units.Feet:
      return (input * 12 * PPI) / FONT_SIZE;
    case Units.Inches:
      return (input * PPI) / FONT_SIZE;
    case Units.Millimeters:
      return (PPI / 25.4 / FONT_SIZE) * input;
    case Units.Picas:
      return (PPI / 6 / FONT_SIZE) * input;
    case Units.Pixels:
      return _pixelsToEms(input);
    case Units.Points:
      return (input / 72) * (PPI / FONT_SIZE);
    case Units.Rems:
      return input;
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, _tailwindToEms, input);
    default:
      return -1;
  }
}
