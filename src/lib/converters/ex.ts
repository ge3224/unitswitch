import type { Converter } from "./index.ts";
import { Ok, Err, ConversionErrorKind, type Result } from "./result.ts";
import {
  CH_TO_EM_RATIO,
  EX_TO_EM_RATIO,
  FONT_SIZE,
  PPI,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from the specified unit to x-height units (ex).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in ex, or Err if conversion fails.
 */
export const convertToEx: Converter = function convertToEx(
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

  const exInPixels = EX_TO_EM_RATIO * FONT_SIZE;
  switch (from) {
    case Units.Centimeters:
      return Ok((input * 0.3937008 * PPI) / exInPixels);
    case Units.Ch:
      return Ok((input * CH_TO_EM_RATIO) / EX_TO_EM_RATIO);
    case Units.Ex:
      return Ok(input);
    case Units.Feet:
      return Ok((input * 12 * PPI) / exInPixels);
    case Units.Inches:
      return Ok((input * PPI) / exInPixels);
    case Units.Millimeters:
      return Ok((input * (PPI / 25.4)) / exInPixels);
    case Units.Picas:
      return Ok((input * (PPI / 6)) / exInPixels);
    case Units.Pixels:
      return Ok(input / exInPixels);
    case Units.Points:
      return Ok((input * (PPI / 72)) / exInPixels);
    case Units.Rems:
      return Ok(input / EX_TO_EM_RATIO);
    case Units.Vh:
      return Ok(((input / 100) * VIEWPORT_HEIGHT) / exInPixels);
    case Units.Vmax:
      return Ok(((input / 100) * Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
        exInPixels);
    case Units.Vmin:
      return Ok(((input / 100) * Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
        exInPixels);
    case Units.Vw:
      return Ok(((input / 100) * VIEWPORT_WIDTH) / exInPixels);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to ex: ${from}`,
        { unit: from }
      );
  }
};
