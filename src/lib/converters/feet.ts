import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

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
 * @returns {Result<number>} - Ok with the converted value in feet (ft), or Err if conversion fails.
 */
export const convertToFeet: Converter = function convertToFeet(
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
      return Ok(input / 30.48);
    case Units.Feet:
      return Ok(input);
    case Units.Inches:
      return Ok(input / 12);
    case Units.Millimeters:
      return Ok(input * 0.00328084);
    case Units.Picas:
      return Ok((input * 0.1667) / 12);
    case Units.Pixels:
      return Ok(_pixelsToFeet(input));
    case Units.Points:
      return Ok(input / 72 / 12);
    case Units.Rems:
      return Ok((input * FONT_SIZE) / (12 * PPI));
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to feet: ${from}`,
        { unit: from },
      );
  }
};
