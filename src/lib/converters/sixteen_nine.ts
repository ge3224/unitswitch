import type { Converter } from "./types.ts";
import type { Unit } from "@/lib/units.ts";

export function conversionRatioLonger16_9(input: number): number {
  return (16 * input) / 9;
}

export function conversionRatioShorter16_9(input: number): number {
  return (9 * input) / 16;
}

export const convertToSixteenNine: Converter = function convertToSixteenNine(
  _from: Unit,
  input: number,
): number {
  return input < 0 ? -1 : conversionRatioLonger16_9(input);
};
