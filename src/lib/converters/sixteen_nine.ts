import type { Converter } from "@/lib/converters/index.ts";
import { AppErrorKind, Err, Ok, type Result } from "@/lib/result.ts";
import type { Unit } from "@/lib/units.ts";

export const convertToSixteenNine: Converter = function convertToSixteenNine(
  from: Unit,
  input: number,
): Result<number> {
  if (input < 0) {
    return Err(
      AppErrorKind.NegativeInput,
      "Input value cannot be negative",
      { input, unit: from },
    );
  }

  return Ok((16 * input) / 9);
};
