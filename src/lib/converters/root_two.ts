import type { Converter } from "@/lib/converter";
import type { Unit } from "@/lib/units";

// @ts-expect-error - Reserved for future implementation
const _tailwindToInches: number[] = [];

function _longer(input: number): number {
  return input * 1.41;
}

// @ts-expect-error - Reserved for future implementation
function _shorter(input: number): number {
  return input / 1.41;
}

export const convertToRootTwo: Converter = function convertToRootTwo(
  _from: Unit,
  input: number
): number {
  return input < 0 ? -1 : _longer(input);
}
