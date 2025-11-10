import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { type Unit, Units } from "@/lib/units.ts";
import { configState } from "@/lib/config.ts";

export const convertToMillimeters: Converter = function convertToMillimeters(
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

  const { ppi, fontSize } = configState.get();

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
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to millimeters: ${from}`,
        { unit: from },
      );
  }
};
