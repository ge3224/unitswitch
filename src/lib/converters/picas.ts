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
 * Converts a value from pixels to picas based on a specified DPI (dots per inch).
 */
function _pixelsToPicas(pixels: number): number {
  return (pixels * 6) / PPI;
}

export const convertToPicas: Converter = function convertToPicas(
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
      return Ok(input * 2.362204724);
    case Units.Feet:
      return Ok(input * 72);
    case Units.Inches:
      return Ok(input * 6);
    case Units.Millimeters:
      return Ok(input * 0.236220472);
    case Units.Picas:
      return Ok(input);
    case Units.Pixels:
      return Ok(_pixelsToPicas(input));
    case Units.Points:
      return Ok(input * 0.0833);
    case Units.Rems:
      return Ok(_pixelsToPicas(input * FONT_SIZE));
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to picas: ${from}`,
        { unit: from },
      );
  }
};
