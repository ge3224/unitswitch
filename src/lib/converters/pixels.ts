import type { Converter } from "@/lib/converters/index.ts";
import { validateConverterInput } from "@/lib/converters/index.ts";
import {
  assertNever,
  AppErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/result.ts";
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
  // Validate input
  const validationError = validateConverterInput(input, from);
  if (validationError) {
    return validationError;
  }

  const {
    ppi,
    fontSize,
    chToEmRatio,
    exToEmRatio,
    viewportWidth,
    viewportHeight,
  } = configState.get();

  switch (from) {
    case Units.Centimeters:
      return Ok(Math.round(input * (ppi / 2.54)));
    case Units.Feet:
      return Ok(Math.round(input * 12 * ppi));
    case Units.Inches:
      return Ok(Math.round(input * ppi));
    case Units.Millimeters:
      return Ok(Math.round(input * (ppi / 25.4)));
    case Units.Picas:
      return Ok(Math.round(input * (1 / 6) * ppi));
    case Units.Pixels:
      return Ok(Math.round(input));
    case Units.Points:
      return Ok(Math.round(input * (ppi / 72)));
    case Units.Rems:
      return Ok(Math.round(input * fontSize));
    case Units.Ch:
      return Ok(Math.round(input * fontSize * chToEmRatio));
    case Units.Ex:
      return Ok(Math.round(input * fontSize * exToEmRatio));
    case Units.Vh:
      return Ok(Math.round(input * (viewportHeight / 100)));
    case Units.Vw:
      return Ok(Math.round(input * (viewportWidth / 100)));
    case Units.Vmin:
      return Ok(
        Math.round(input * (Math.min(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Vmax:
      return Ok(
        Math.round(input * (Math.max(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1); // Cannot convert ratio-based unit to pixels
    default:
      return assertNever(from);
  }
};
