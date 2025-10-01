/**
 * An enumeration representing different rounding methods.
 */
export const RoundingMethod = {
  Floor: "floor",
  Ceil: "ceil",
  Round: "round",
} as const;

export type RoundingMethodType = typeof RoundingMethod[keyof typeof RoundingMethod];

/**
 * Rounds a number to a specified number of decimal places using the specified rounding method.
 * @param {number} number - The number to be rounded.
 * @param {number} decimalPlaces - The number of decimal places to round to.
 * @param {RoundingMethodType} [method= RoundingMethod.Round] - The rounding method to use.
 * @throws {Error} If an invalid rounding method is provided.
 * @returns {number} The rounded number.
 */
export function roundToDecimal(
  number: number,
  decimalPlaces: number,
  method: RoundingMethodType = RoundingMethod.Round,
): number {
  if (
    method !== RoundingMethod.Floor &&
    method !== RoundingMethod.Ceil &&
    method !== RoundingMethod.Round
  ) {
    throw new Error(
      'Invalid rounding method. Use "floor", "ceil", or "round".',
    );
  }

  const multiplier = Math.pow(10, decimalPlaces);

  if (method === RoundingMethod.Floor) {
    return Math.floor(number * multiplier) / multiplier;
  } else if (method === RoundingMethod.Ceil) {
    return Math.ceil(number * multiplier) / multiplier;
  } else {
    return Math.round(number * multiplier) / multiplier;
  }
}
