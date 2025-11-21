import type { Converter } from "@/lib/converters/index.ts";
import { validateConverterInput } from "@/lib/converters/index.ts";
import { AppErrorKind, Err, Ok, type Result } from "@/lib/result.ts";
import { configState } from "@/lib/config.ts";
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
  const chInPixels = chToEmRatio * fontSize;

  switch (from) {
    case Units.Centimeters:
      return Ok((input / 2.54 * ppi) / chInPixels);
    case Units.Ch:
      return Ok(input);
    case Units.Ex:
      return Ok((input * exToEmRatio) / chToEmRatio);
    case Units.Feet:
      return Ok((input * 12 * ppi) / chInPixels);
    case Units.Inches:
      return Ok((input * ppi) / chInPixels);
    case Units.Millimeters:
      return Ok((input * (ppi / 25.4)) / chInPixels);
    case Units.Picas:
      return Ok((input * (ppi / 6)) / chInPixels);
    case Units.Pixels:
      return Ok(input / chInPixels);
    case Units.Points:
      return Ok((input * (ppi / 72)) / chInPixels);
    case Units.Rems:
      return Ok(input / chToEmRatio);
    case Units.Vh:
      return Ok(((input / 100) * viewportHeight) / chInPixels);
    case Units.Vmax:
      return Ok(
        ((input / 100) * Math.max(viewportWidth, viewportHeight)) / chInPixels,
      );
    case Units.Vmin:
      return Ok(
        ((input / 100) * Math.min(viewportWidth, viewportHeight)) / chInPixels,
      );
    case Units.Vw:
      return Ok(((input / 100) * viewportWidth) / chInPixels);
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return Err(
        AppErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to ch: ${from}`,
        { unit: from },
      );
  }
};
