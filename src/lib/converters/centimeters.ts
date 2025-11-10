import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { configState } from "@/lib/config.ts";
import { type Unit, Units } from "@/lib/units.ts";

export const convertToCentimeters: Converter = function convertToCentimeters(
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
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to centimeters: ${from}`,
        { unit: from },
      );
  }
};
