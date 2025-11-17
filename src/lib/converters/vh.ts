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
 * Converts a value from the specified unit to viewport height units (vh).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {Result<number>} - Ok with the converted value in vh, or Err if conversion fails.
 */
export const convertToVh: Converter = function convertToVh(
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

  const config = configState.get();
  const { viewportWidth, viewportHeight, fontSize, ppi, chToEmRatio, exToEmRatio } = config;

  switch (from) {
    case Units.Centimeters:
      return Ok(((input * 0.3937008 * ppi) / viewportHeight) * 100);
    case Units.Ch:
      return Ok(((input * chToEmRatio * fontSize) / viewportHeight) * 100);
    case Units.Ex:
      return Ok(((input * exToEmRatio * fontSize) / viewportHeight) * 100);
    case Units.Feet:
      return Ok(((input * 12 * ppi) / viewportHeight) * 100);
    case Units.Inches:
      return Ok(((input * ppi) / viewportHeight) * 100);
    case Units.Millimeters:
      return Ok(((input * (ppi / 25.4)) / viewportHeight) * 100);
    case Units.Picas:
      return Ok(((input * (ppi / 6)) / viewportHeight) * 100);
    case Units.Pixels:
      return Ok((input / viewportHeight) * 100);
    case Units.Points:
      return Ok(((input * (ppi / 72)) / viewportHeight) * 100);
    case Units.Rems:
      return Ok(((input * fontSize) / viewportHeight) * 100);
    case Units.Vh:
      return Ok(input);
    case Units.Vmax:
      return Ok(
        (input * Math.max(viewportWidth, viewportHeight)) / viewportHeight,
      );
    case Units.Vmin:
      return Ok(
        (input * Math.min(viewportWidth, viewportHeight)) / viewportHeight,
      );
    case Units.Vw:
      return Ok((input * viewportWidth) / viewportHeight);
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
