import type { Converter } from "./types.ts";
import type { Unit } from "@/lib/units.ts";

export const convertToSixteenNine: Converter = function convertToSixteenNine(
  _from: Unit,
  input: number,
): number {
  return input < 0 ? -1 : (16 * input) / 9;
};
