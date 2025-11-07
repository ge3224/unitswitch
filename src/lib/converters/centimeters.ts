import type { Converter } from "./types.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { getIntersectingValue } from "@/lib/arrays.ts";
import { tailwindSizes } from "@/lib/converters/tailwind.ts";

/**
 * Centimetre equivalent values for Tailwind CSS spacing and sizing classes.
 */
const tailwindToCm = [
  0,
  0.02645833,
  0.05291666,
  0.10583332,
  0.15874997999999998,
  0.21166664,
  0.26458329999999997,
  0.31749995999999997,
  0.37041662,
  0.42333328,
  0.5291665999999999,
  0.6349999199999999,
  0.74083324,
  0.84666656,
  0.95249988,
  1.0583331999999999,
  1.16416652,
  1.2699998399999999,
  1.48166648,
  1.69333312,
  2.1166663999999997,
  2.5399996799999998,
  2.96333296,
  3.38666624,
  3.80999952,
  4.2333327999999995,
  4.65666608,
  5.0799993599999995,
  5.50333264,
  5.92666592,
  6.3499992,
  6.77333248,
  7.61999904,
  8.466665599999999,
  10.159998719999999,
];

/**
 * Centimetre equivalent values for Bootstrap CSS spacing and sizing classes.
 */
const bootstrapToCm = [
  0,
  0.041666666666666664,
  0.08333333333333333,
  0.16666666666666666,
  0.25,
  0.5,
];

function _pixelsToCentimeters(pixels: number): number {
  return (pixels / PPI) * 2.54;
}

export const convertToCentimeters: Converter = function convertToCentimeters(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Bootstrap:
      return input <= bootstrapToCm.length - 1 ? bootstrapToCm[input] : -1;
    case Units.Centimeters:
      return input;
    case Units.Ems:
      return _pixelsToCentimeters(input * FONT_SIZE);
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
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, tailwindToCm, input);
    default:
      return -1;
  }
};
