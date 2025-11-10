import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { configState } from "@/lib/config.ts";
import { type Unit, Units } from "@/lib/units.ts";

export const convertToInches: Converter = function convertToInches(
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

  switch (from) {
    case Units.Centimeters:
      return Ok(input * 0.393701);
    case Units.Feet:
      return Ok(input * 12);
    case Units.Inches:
      return Ok(input);
    case Units.Millimeters:
      return Ok(input * 0.0393701);
    case Units.Picas:
      return Ok(input / 6);
    case Units.Pixels:
      return Ok(input / ppi);
    case Units.Points:
      return Ok(input / 72);
    case Units.Rems:
      return Ok((input * fontSize) / ppi);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to inches: ${from}`,
        { unit: from },
      );
  }
};
