import type { Converter } from "./index.ts";
import { Ok, Err, ConversionErrorKind, type Result } from "./result.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from pixels to inches based on a specified DPI (dots per inch).
 */
function _pixelsToInches(px: number): number {
  return px / PPI;
}

export const convertToInches: Converter = function convertToInches(
  from: Unit,
  input: number,
): Result<number> {
  if (input < 0) {
    return Err(
      ConversionErrorKind.NegativeInput,
      "Input value cannot be negative",
      { input, unit: from }
    );
  }

  switch (from) {
    case Units.Centimeters:
      return Ok(input * 0.393701);
    case Units.Feet:
      return Ok(input * 12);
    case Units.Inches:
      return Ok(input);
    case Units.Millimeters:
      return Ok(input * 0.0393701);
    case Units.Picas:
      return Ok(input / 6);
    case Units.Pixels:
      return Ok(_pixelsToInches(input));
    case Units.Points:
      return Ok(input / 72);
    case Units.Rems:
      return Ok((input * FONT_SIZE) / PPI);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to inches: ${from}`,
        { unit: from }
      );
  }
};
