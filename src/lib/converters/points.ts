import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

function _pixelsToPoints(px: number): number {
  return px * (72 / PPI);
}

/**
 * Converts a value from the specified unit to points (pt).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in points (pt), or Err if conversion fails.
 */
export const convertToPoints: Converter = function convertToPoints(
  from: Unit,
  input: number,
): Result<number> {
  if (input < 0) {
    return Err(
      ConversionErrorKind.NegativeInput,
      "Input value cannot be negative",
      { input, unit: from },
    );
  }

  switch (from) {
    case Units.Centimeters:
      return Ok(input * 28.3464567);
    case Units.Feet:
      return Ok(input * 864);
    case Units.Inches:
      return Ok(input * 72);
    case Units.Millimeters:
      return Ok(input * 2.83464567);
    case Units.Picas:
      return Ok(input * 12);
    case Units.Pixels:
      return Ok(_pixelsToPoints(input));
    case Units.Points:
      return Ok(input);
    case Units.Rems:
      return Ok(_pixelsToPoints(input * FONT_SIZE));
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to points: ${from}`,
        { unit: from },
      );
  }
};
