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
  const exInPixels = exToEmRatio * fontSize;

  switch (from) {
    case Units.Centimeters:
      return Ok((input / 2.54 * ppi) / exInPixels);
    case Units.Ch:
      return Ok((input * chToEmRatio) / exToEmRatio);
    case Units.Ex:
      return Ok(input);
    case Units.Feet:
      return Ok((input * 12 * ppi) / exInPixels);
    case Units.Inches:
      return Ok((input * ppi) / exInPixels);
    case Units.Millimeters:
      return Ok((input * (ppi / 25.4)) / exInPixels);
    case Units.Picas:
      return Ok((input * (ppi / 6)) / exInPixels);
    case Units.Pixels:
      return Ok(input / exInPixels);
    case Units.Points:
      return Ok((input * (ppi / 72)) / exInPixels);
    case Units.Rems:
      return Ok(input / exToEmRatio);
    case Units.Vh:
      return Ok(((input / 100) * viewportHeight) / exInPixels);
    case Units.Vmax:
      return Ok(
        ((input / 100) * Math.max(viewportWidth, viewportHeight)) / exInPixels,
      );
    case Units.Vmin:
      return Ok(
        ((input / 100) * Math.min(viewportWidth, viewportHeight)) / exInPixels,
      );
    case Units.Vw:
      return Ok(((input / 100) * viewportWidth) / exInPixels);
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
