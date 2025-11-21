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

export const convertToCentimeters: Converter = function convertToCentimeters(
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
      return Ok(input);
    case Units.Feet:
      return Ok(input * 30.48);
    case Units.Inches:
      return Ok(input * 2.54);
    case Units.Millimeters:
      return Ok(input / 10);
    case Units.Picas:
      return Ok(input * ((1 / 6) * 2.54));
    case Units.Pixels:
      return Ok((input / ppi) * 2.54);
    case Units.Points:
      return Ok(input * (2.54 / 72));
    case Units.Rems:
      return Ok(((input * fontSize) / ppi) * 2.54);
    case Units.Ch:
      return Ok(((input * fontSize * chToEmRatio) / ppi) * 2.54);
    case Units.Ex:
      return Ok(((input * fontSize * exToEmRatio) / ppi) * 2.54);
    case Units.Vh:
      return Ok(((input * (viewportHeight / 100)) / ppi) * 2.54);
    case Units.Vw:
      return Ok(((input * (viewportWidth / 100)) / ppi) * 2.54);
    case Units.Vmin:
      return Ok(
        ((input * (Math.min(viewportWidth, viewportHeight) / 100)) / ppi) *
          2.54,
      );
    case Units.Vmax:
      return Ok(
        ((input * (Math.max(viewportWidth, viewportHeight) / 100)) / ppi) *
          2.54,
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
