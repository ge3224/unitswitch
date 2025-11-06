import type { Converter } from "@/lib/converter";
import type { Unit } from "@/lib/units";

/**
 * Calculate the value increased by the golden ratio (1.61803 times).
 *
 * @param {number} input - The input value to be increased.
 * @returns {number} - The input value multiplied by the golden ratio.
 */
function _longer(input: number): number {
  return input * 1.61803;
}

/**
 * Calculate the value decreased by the golden ratio (1.61803 times).
 *
 * @param {number} input - The input value to be decreased.
 * @returns {number} - The input value divided by the golden ratio.
 */
// @ts-expect-error - Reserved for future implementation
function _shorter(input: number): number {
  return input / 1.61803;
}

/**
 * Converts a value from the specified unit to a longer length based on the golden ratio.
 *
 * @param {Unit} _from - The unit to convert from (unused in this implementation).
 * @param {number} input - The value to be converted.
 *
 * @returns {number} - The converted value, or -1 if the
 *                     conversion is not supported or the input is invalid.
 */
export const convertToGolden: Converter = function convertToGolden(_from: Unit, input: number): number {
  return input < 0 ? -1 : _longer(input);
}
