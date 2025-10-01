import type { Converter } from "../converter";
import type { Unit } from "../units";

function _longer(input: number): number {
  return (16 * input) / 9;
}

function _shorter(input: number): number {
  return (9 * input) / 16;
}

export const convertToSixteenNine: Converter = function convertToSixteenNine(
  _from: Unit,
  input: number
): number {
  return input < 0 ? -1 : _longer(input);
}
