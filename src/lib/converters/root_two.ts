import type { Converter } from "./types.ts";
import type { Unit } from "@/lib/units.ts";
import { ROOT_TWO } from "@/lib/constants.ts";

export const convertToRootTwo: Converter = function convertToRootTwo(
  _from: Unit,
  input: number,
): number {
  return input < 0 ? -1 : input * ROOT_TWO;
};
