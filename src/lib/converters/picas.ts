import type { Converter } from "@/lib/converters/index.ts";
import { validateConverterInput } from "@/lib/converters/index.ts";
import {
  assertNever,
  AppErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/result.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { configState } from "@/lib/config.ts";

export const convertToPicas: Converter = function convertToPicas(
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

  /**
   * Converts a value from pixels to picas based on a specified DPI (dots per inch).
   */
  function _pixelsToPicas(pixels: number): number {
    return (pixels * 6) / ppi;
  }
  switch (from) {
    case Units.Centimeters:
      return Ok(input * (6 / 2.54));
    case Units.Feet:
      return Ok(input * 72);
    case Units.Inches:
      return Ok(input * 6);
    case Units.Millimeters:
      return Ok(input * (6 / 25.4));
    case Units.Picas:
      return Ok(input);
    case Units.Pixels:
      return Ok(_pixelsToPicas(input));
    case Units.Points:
      return Ok(input / 12);
    case Units.Rems:
      return Ok(_pixelsToPicas(input * fontSize));
    case Units.Ch:
      return Ok(_pixelsToPicas(input * fontSize * chToEmRatio));
    case Units.Ex:
      return Ok(_pixelsToPicas(input * fontSize * exToEmRatio));
    case Units.Vh:
      return Ok(_pixelsToPicas(input * (viewportHeight / 100)));
    case Units.Vw:
      return Ok(_pixelsToPicas(input * (viewportWidth / 100)));
    case Units.Vmin:
      return Ok(
        _pixelsToPicas(input * (Math.min(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Vmax:
      return Ok(
        _pixelsToPicas(input * (Math.max(viewportWidth, viewportHeight) / 100)),
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
