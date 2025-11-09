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
 * Converts a value from pixels to rems based on a specified DPI (dots per inch).
 */
function _pixelsToRems(px: number): number {
  return px / FONT_SIZE;
}

export const convertToRems: Converter = function convertToRems(
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
      return Ok((input * 0.3937008 * PPI) / FONT_SIZE);
    case Units.Feet:
      return Ok((input * 12 * PPI) / FONT_SIZE);
    case Units.Inches:
      return Ok((input * PPI) / FONT_SIZE);
    case Units.Millimeters:
      return Ok((PPI / 25.4 / FONT_SIZE) * input);
    case Units.Picas:
      return Ok((PPI / 6 / FONT_SIZE) * input);
    case Units.Pixels:
      return Ok(_pixelsToRems(input));
    case Units.Points:
      return Ok((input / 72) * (PPI / FONT_SIZE));
    case Units.Rems:
      return Ok(input);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to rems: ${from}`,
        { unit: from },
      );
  }
};
