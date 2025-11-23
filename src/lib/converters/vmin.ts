import type { Converter } from "@/lib/converters/index.ts";
import { validateConverterInput } from "@/lib/converters/index.ts";
import {
  assertNever,
  Ok,
  type Result,
} from "@/lib/result.ts";
import { configState } from "@/lib/config.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from the specified unit to viewport minimum units (vmin).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in vmin, or Err if conversion fails.
 */
export const convertToVmin: Converter = function convertToVmin(
  from: Unit,
  input: number,
): Result<number> {
  // Validate input
  const validationError = validateConverterInput(input, from);
  if (validationError) {
    return validationError;
  }

  const config = configState.get();
  const {
    viewportWidth,
    viewportHeight,
    fontSize,
    ppi,
    chToEmRatio,
    exToEmRatio,
  } = config;
  const viewportMin = Math.min(viewportWidth, viewportHeight);

  switch (from) {
    case Units.Centimeters:
      return Ok(((input / 2.54 * ppi) / viewportMin) * 100);
    case Units.Ch:
      return Ok(((input * chToEmRatio * fontSize) / viewportMin) * 100);
    case Units.Ex:
      return Ok(((input * exToEmRatio * fontSize) / viewportMin) * 100);
    case Units.Feet:
      return Ok(((input * 12 * ppi) / viewportMin) * 100);
    case Units.Inches:
      return Ok(((input * ppi) / viewportMin) * 100);
    case Units.Millimeters:
      return Ok(((input * (ppi / 25.4)) / viewportMin) * 100);
    case Units.Picas:
      return Ok(((input * (ppi / 6)) / viewportMin) * 100);
    case Units.Pixels:
      return Ok((input / viewportMin) * 100);
    case Units.Points:
      return Ok(((input * (ppi / 72)) / viewportMin) * 100);
    case Units.Rems:
      return Ok(((input * fontSize) / viewportMin) * 100);
    case Units.Vh:
      return Ok((input * viewportHeight) / viewportMin);
    case Units.Vmax:
      return Ok(
        (input * Math.max(viewportWidth, viewportHeight)) / viewportMin,
      );
    case Units.Vmin:
      return Ok(input);
    case Units.Vw:
      return Ok((input * viewportWidth) / viewportMin);
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
