import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import { configState } from "@/lib/config.ts";
import { type Unit, Units } from "@/lib/units.ts";

export const convertToRems: Converter = function convertToRems(
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
      return Ok((input * 0.3937008 * ppi) / fontSize);
    case Units.Feet:
      return Ok((input * 12 * ppi) / fontSize);
    case Units.Inches:
      return Ok((input * ppi) / fontSize);
    case Units.Millimeters:
      return Ok((ppi / 25.4 / fontSize) * input);
    case Units.Picas:
      return Ok((ppi / 6 / fontSize) * input);
    case Units.Pixels:
      return Ok(input / fontSize);
    case Units.Points:
      return Ok((input / 72) * (ppi / fontSize));
    case Units.Rems:
      return Ok(input);
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to rems: ${from}`,
        { unit: from },
      );
  }
};
