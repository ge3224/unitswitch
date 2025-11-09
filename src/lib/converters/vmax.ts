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

const VIEWPORT_MAX = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

/**
 * Converts a value from the specified unit to viewport maximum units (vmax).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in vmax, or Err if conversion fails.
 */
export const convertToVmax: Converter = function convertToVmax(
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
      return Ok(((input * 0.3937008 * PPI) / VIEWPORT_MAX) * 100);
    case Units.Ch:
      return Ok(((input * CH_TO_EM_RATIO * FONT_SIZE) / VIEWPORT_MAX) * 100);
    case Units.Ex:
      return Ok(((input * EX_TO_EM_RATIO * FONT_SIZE) / VIEWPORT_MAX) * 100);
    case Units.Feet:
      return Ok(((input * 12 * PPI) / VIEWPORT_MAX) * 100);
    case Units.Inches:
      return Ok(((input * PPI) / VIEWPORT_MAX) * 100);
    case Units.Millimeters:
      return Ok(((input * (PPI / 25.4)) / VIEWPORT_MAX) * 100);
    case Units.Picas:
      return Ok(((input * (PPI / 6)) / VIEWPORT_MAX) * 100);
    case Units.Pixels:
      return Ok((input / VIEWPORT_MAX) * 100);
    case Units.Points:
      return Ok(((input * (PPI / 72)) / VIEWPORT_MAX) * 100);
    case Units.Rems:
      return Ok(((input * FONT_SIZE) / VIEWPORT_MAX) * 100);
    case Units.Vh:
      return Ok((input * VIEWPORT_HEIGHT) / VIEWPORT_MAX);
    case Units.Vmax:
      return Ok(input);
    case Units.Vmin:
      return Ok(
        (input * Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) / VIEWPORT_MAX,
      );
    case Units.Vw:
      return Ok((input * VIEWPORT_WIDTH) / VIEWPORT_MAX);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to vmax: ${from}`,
        { unit: from },
      );
  }
};
