import type { Converter } from "@/lib/converters/types.ts";
import { GOLDEN_RATIO } from "@/lib/constants.ts";

export const convertToGoldenRatio: Converter = function convertToGoldenRatio(
  _,
  input: number,
): number {
  return input < 0 ? -1 : input * GOLDEN_RATIO;
};
