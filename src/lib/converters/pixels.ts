import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { configState } from "@/lib/config.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from a specified unit to pixels.
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {Result<number>} Ok with the converted value in pixels, or Err if conversion fails.
 */
export const convertToPixels: Converter = function convertToPixels(
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

  const { ppi, fontSize } = configState.get();

  switch (from) {
    case Units.Centimeters:
      return Ok(Math.ceil(input * (ppi / 2.54)));
    case Units.Feet:
      return Ok(Math.ceil(input * 12 * ppi));
    case Units.Inches:
      return Ok(Math.ceil(input * ppi));
    case Units.Millimeters:
      return Ok(Math.ceil(input * (ppi / 25.4)));
    case Units.Picas:
      return Ok(Math.ceil(input * (1 / 6) * ppi));
    case Units.Pixels:
      return Ok(Math.ceil(input));
    case Units.Points:
      return Ok(Math.ceil(input * (ppi / 72)));
    case Units.Rems:
      return Ok(Math.ceil(input * fontSize));
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to pixels: ${from}`,
        { unit: from },
      );
  }
};
