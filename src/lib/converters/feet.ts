import type { Converter } from "@/lib/converter.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { Units, type Unit } from "@/lib/units.ts";
import { getIntersectingValue } from "@/lib/arrays.ts";
import { tailwindSizes } from "@/lib/converters/tailwind.ts";

/**
 * Feet equivalent values for Tailwind CSS spacing and sizing classes.
 */
const _tailwindToFeet = [
  0, 0.0008680555555555555, 0.001736111111111111, 0.003472222222222222,
  0.005208333333333333, 0.006944444444444444, 0.008680555555555556,
  0.010416666666666666, 0.012152777777777778, 0.013888888888888888,
  0.017361111111111112, 0.020833333333333332, 0.024305555555555556,
  0.027777777777777776, 0.03125, 0.034722222222222224, 0.03819444444444444,
  0.041666666666666664, 0.04861111111111111, 0.05555555555555555,
  0.06944444444444445, 0.08333333333333333, 0.09722222222222222,
  0.1111111111111111, 0.125, 0.1388888888888889, 0.15277777777777776,
  0.16666666666666666, 0.18055555555555555, 0.19444444444444445,
  0.20833333333333334, 0.2222222222222222, 0.25, 0.2777777777777778,
  0.3333333333333333,
];


/**
 * Converts a value from pixels to feet based on a specified DPI (dots per
 * inch).
 */
function _pixelsToFeet(px: number): number {
  return px / PPI / 12;
}

/**
 * Converts a value from the specified unit to feet (ft).
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number} - The converted value in feet (ft), or -1 if the
 *                     conversion is not supported or input is invalid.
 */
export const convertToFeet: Converter = function convertToFeet(from: Unit, input: number): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Bootstrap:
      const bs = [
        0, 0.003472222222222222, 0.006944444444444444, 0.013888888888888888,
        0.020833333333333332, 0.041666666666666664,
      ];
      return input <= bs.length - 1 && input % 1 === 0 ? bs[input] : -1;
    case Units.Centimeters:
      return input / 30.48;
    case Units.Ems:
      return (input * FONT_SIZE) / (12 * PPI);
    case Units.Feet:
      return input;
    case Units.Inches:
      return input / 12;
    case Units.Millimeters:
      return input * 0.00328084;
    case Units.Picas:
      return (input * 0.1667) / 12;
    case Units.Pixels:
      return _pixelsToFeet(input);
    case Units.Points:
      return input / 72 / 12;
    case Units.Rems:
      return (input * FONT_SIZE) / (12 * PPI);
    case Units.Tailwind:
      return getIntersectingValue(tailwindSizes, _tailwindToFeet, input);
    default:
      return -1;
  }
}
