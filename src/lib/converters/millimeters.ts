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

export const convertToMillimeters: Converter = function convertToMillimeters(
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
   * Converts a value from pixels to millimetres based on a specified DPI (dots per inch).
   */
  function pixelsToMillimeters(px: number): number {
    return (px / ppi) * 25.4;
  }

  switch (from) {
    case Units.Centimeters:
      return Ok(input * 10);
    case Units.Feet:
      return Ok(input * 304.8);
    case Units.Inches:
      return Ok(input * 25.4);
    case Units.Millimeters:
      return Ok(input);
    case Units.Picas:
      return Ok(input * 4.23333333);
    case Units.Pixels:
      return Ok(pixelsToMillimeters(input));
    case Units.Points:
      return Ok(input * 0.352778);
    case Units.Rems:
      return Ok(pixelsToMillimeters(input * fontSize));
    case Units.Ch:
      return Ok(pixelsToMillimeters(input * fontSize * chToEmRatio));
    case Units.Ex:
      return Ok(pixelsToMillimeters(input * fontSize * exToEmRatio));
    case Units.Vh:
      return Ok(pixelsToMillimeters(input * (viewportHeight / 100)));
    case Units.Vw:
      return Ok(pixelsToMillimeters(input * (viewportWidth / 100)));
    case Units.Vmin:
      return Ok(
        pixelsToMillimeters(
          input * (Math.min(viewportWidth, viewportHeight) / 100),
        ),
      );
    case Units.Vmax:
      return Ok(
        pixelsToMillimeters(
          input * (Math.max(viewportWidth, viewportHeight) / 100),
        ),
      );
    case Units.Golden:
    case Units.Root2:
    case Units.SixteenNine:
      return Ok(-1);
    default:
      return assertNever(from);
  }
};
