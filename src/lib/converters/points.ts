import type { Converter } from "@/lib/converters/index.ts";
import { validateConverterInput } from "@/lib/converters/index.ts";
import {
  assertNever,
  Ok,
  type Result,
} from "@/lib/result.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { configState } from "../config.ts";

/**
 * Converts a value from the specified unit to points (pt).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in points (pt), or Err if conversion fails.
 */
export const convertToPoints: Converter = function convertToPoints(
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

  function pixelsToPoints(px: number): number {
    return px * (72 / ppi);
  }

  switch (from) {
    case Units.Centimeters:
      return Ok(input * 28.3464567);
    case Units.Feet:
      return Ok(input * 864);
    case Units.Inches:
      return Ok(input * 72);
    case Units.Millimeters:
      return Ok(input * 2.83464567);
    case Units.Picas:
      return Ok(input * 12);
    case Units.Pixels:
      return Ok(pixelsToPoints(input));
    case Units.Points:
      return Ok(input);
    case Units.Rems:
      return Ok(pixelsToPoints(input * fontSize));
    case Units.Ch:
      return Ok(pixelsToPoints(input * fontSize * chToEmRatio));
    case Units.Ex:
      return Ok(pixelsToPoints(input * fontSize * exToEmRatio));
    case Units.Vh:
      return Ok(pixelsToPoints(input * (viewportHeight / 100)));
    case Units.Vw:
      return Ok(pixelsToPoints(input * (viewportWidth / 100)));
    case Units.Vmin:
      return Ok(
        pixelsToPoints(input * (Math.min(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Vmax:
      return Ok(
        pixelsToPoints(input * (Math.max(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
