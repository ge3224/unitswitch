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
 * Converts a value from the specified unit to feet (ft).
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in feet (ft), or Err if conversion fails.
 */
export const convertToFeet: Converter = function convertToFeet(
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
      return Ok(input / 30.48);
    case Units.Feet:
      return Ok(input);
    case Units.Inches:
      return Ok(input / 12);
    case Units.Millimeters:
      return Ok(input * 0.00328084);
    case Units.Picas:
      return Ok((input * 0.1667) / 12);
    case Units.Pixels:
      return Ok(input / ppi / 12);
    case Units.Points:
      return Ok(input / 72 / 12);
    case Units.Rems:
      return Ok((input * fontSize) / (12 * ppi));
    case Units.Ch:
      return Ok((input * fontSize * chToEmRatio) / (12 * ppi));
    case Units.Ex:
      return Ok((input * fontSize * exToEmRatio) / (12 * ppi));
    case Units.Vh:
      return Ok((input * (viewportHeight / 100)) / (12 * ppi));
    case Units.Vw:
      return Ok((input * (viewportWidth / 100)) / (12 * ppi));
    case Units.Vmin:
      return Ok(
        (input * (Math.min(viewportWidth, viewportHeight) / 100)) / (12 * ppi),
      );
    case Units.Vmax:
      return Ok(
        (input * (Math.max(viewportWidth, viewportHeight) / 100)) / (12 * ppi),
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
