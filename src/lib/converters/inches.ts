import type { Converter } from "@/lib/converters/index.ts";
import { validateConverterInput } from "@/lib/converters/index.ts";
import {
  assertNever,
  Ok,
  type Result,
} from "@/lib/result.ts";
import { configState } from "@/lib/config.ts";
import { type Unit, Units } from "@/lib/units.ts";

export const convertToInches: Converter = function convertToInches(
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
      return Ok(input / 2.54);
    case Units.Feet:
      return Ok(input * 12);
    case Units.Inches:
      return Ok(input);
    case Units.Millimeters:
      return Ok(input / 25.4);
    case Units.Picas:
      return Ok(input / 6);
    case Units.Pixels:
      return Ok(input / ppi);
    case Units.Points:
      return Ok(input / 72);
    case Units.Rems:
      return Ok((input * fontSize) / ppi);
    case Units.Ch:
      return Ok((input * fontSize * chToEmRatio) / ppi);
    case Units.Ex:
      return Ok((input * fontSize * exToEmRatio) / ppi);
    case Units.Vh:
      return Ok((input * (viewportHeight / 100)) / ppi);
    case Units.Vw:
      return Ok((input * (viewportWidth / 100)) / ppi);
    case Units.Vmin:
      return Ok(
        (input * (Math.min(viewportWidth, viewportHeight) / 100)) / ppi,
      );
    case Units.Vmax:
      return Ok(
        (input * (Math.max(viewportWidth, viewportHeight) / 100)) / ppi,
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
