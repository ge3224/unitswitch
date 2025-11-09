import type { Converter } from "./index.ts";
import { Ok, Err, ConversionErrorKind, type Result } from "./result.ts";
import { FONT_SIZE, PPI } from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

function _pixelsToCentimeters(pixels: number): number {
  return (pixels / PPI) * 2.54;
}

export const convertToCentimeters: Converter = function convertToCentimeters(
  from: Unit,
  input: number,
): Result<number> {
  if (input < 0) {
    return Err(
      ConversionErrorKind.NegativeInput,
      "Input value cannot be negative",
      { input, unit: from }
    );
  }

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
      return Ok(_pixelsToCentimeters(input));
    case Units.Points:
      return Ok(input * (2.54 / 72));
    case Units.Rems:
      return Ok(_pixelsToCentimeters(input * FONT_SIZE));
    default:
      return Err(
        ConversionErrorKind.UnsupportedUnit,
        `Unsupported unit conversion to centimeters: ${from}`,
        { unit: from }
      );
  }
};
