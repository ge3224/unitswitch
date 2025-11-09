import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
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
 * Converts a value from the specified unit to character width units (ch).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in ch, or Err if conversion fails.
 */
export const convertToCh: Converter = function convertToCh(
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

  const chInPixels = CH_TO_EM_RATIO * FONT_SIZE;
  switch (from) {
    case Units.Centimeters:
      return Ok((input * 0.3937008 * PPI) / chInPixels);
    case Units.Ch:
      return Ok(input);
    case Units.Ex:
      return Ok((input * EX_TO_EM_RATIO) / CH_TO_EM_RATIO);
    case Units.Feet:
      return Ok((input * 12 * PPI) / chInPixels);
    case Units.Inches:
      return Ok((input * PPI) / chInPixels);
    case Units.Millimeters:
      return Ok((input * (PPI / 25.4)) / chInPixels);
    case Units.Picas:
      return Ok((input * (PPI / 6)) / chInPixels);
    case Units.Pixels:
      return Ok(input / chInPixels);
    case Units.Points:
      return Ok((input * (PPI / 72)) / chInPixels);
    case Units.Rems:
      return Ok(input / CH_TO_EM_RATIO);
    case Units.Vh:
      return Ok(((input / 100) * VIEWPORT_HEIGHT) / chInPixels);
    case Units.Vmax:
      return Ok(
        ((input / 100) * Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
          chInPixels,
      );
    case Units.Vmin:
      return Ok(
        ((input / 100) * Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
          chInPixels,
      );
    case Units.Vw:
      return Ok(((input / 100) * VIEWPORT_WIDTH) / chInPixels);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to ch: ${from}`,
        { unit: from },
      );
  }
};
