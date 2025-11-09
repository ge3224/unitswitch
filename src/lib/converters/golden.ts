import type { Converter } from "./types.ts";
import type { Unit } from "@/lib/units.ts";

export function conversionRatioLongGolden(input: number): number {
  return input * 1.61803;
}

export function conversionRatioShortGolden(input: number): number {
  return input / 1.61803;
}

export const convertToGolden: Converter = function convertToGolden(
  _from: Unit,
  input: number,
): number {
  return input < 0 ? -1 : conversionRatioLongGolden(input);
};
