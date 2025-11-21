import type { Converter } from "@/lib/converters/index.ts";
import { AppErrorKind, Err, Ok, type Result } from "@/lib/result.ts";
import { GOLDEN_RATIO } from "@/lib/constants.ts";
import type { Unit } from "@/lib/units.ts";

export const convertToGoldenRatio: Converter = function convertToGoldenRatio(
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

  return Ok(input * GOLDEN_RATIO);
};
