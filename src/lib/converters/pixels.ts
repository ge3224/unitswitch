import type { Converter } from "@/lib/converters/index.ts";
import {
  assertNever,
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
    case Units.Ch:
      return Ok(Math.ceil(input * fontSize * chToEmRatio));
    case Units.Ex:
      return Ok(Math.ceil(input * fontSize * exToEmRatio));
    case Units.Vh:
      return Ok(Math.ceil(input * (viewportHeight / 100)));
    case Units.Vw:
      return Ok(Math.ceil(input * (viewportWidth / 100)));
    case Units.Vmin:
      return Ok(
        Math.ceil(input * (Math.min(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Vmax:
      return Ok(
        Math.ceil(input * (Math.max(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1); // Cannot convert ratio-based unit to pixels
    default:
      return assertNever(from);
  }
};
