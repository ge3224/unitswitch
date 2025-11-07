import type { Converter } from "./types.ts";
import type { Unit } from "@/lib/units.ts";

function _longer(input: number): number {
  return (16 * input) / 9;
}

// @ts-expect-error - Reserved for future implementation
function _shorter(input: number): number {
  return (9 * input) / 16;
}

export const convertToSixteenNine: Converter = function convertToSixteenNine(
  _from: Unit,
  input: number,
): number {
  return input < 0 ? -1 : _longer(input);
};
