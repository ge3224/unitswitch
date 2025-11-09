import type { Converter } from "@/lib/converters/index.ts";
import {
  ConversionErrorKind,
  Err,
  Ok,
  type Result,
} from "@/lib/converters/result.ts";
import type { Unit } from "@/lib/units.ts";
import { ROOT_TWO } from "@/lib/constants.ts";

export const convertToRootTwo: Converter = function convertToRootTwo(
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

  return Ok(input * ROOT_TWO);
};
