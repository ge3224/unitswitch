/**
 * An enumeration representing different rounding methods.
 */
export enum RoundingMethod {
  /**
   * Rounds a number down (toward negative infinity).
   */
  Floor = "floor",

  /**
   * Rounds a number up (toward positive infinity).
   */
  Ceil = "ceil",

  /**
   * Rounds a number to the nearest integer.
   */
  Round = "round",
}

/**
 * Rounds a number to a specified number of decimal places using the specified rounding method.
 *
 * @param {number} number - The number to be rounded.
 * @param {number} decimalPlaces - The number of decimal places to round to.
 * @param {RoundingMethod} [method= RoundingMethod.Round] - The rounding method to use.
 *   - Use RoundingMethod.Floor to round down (toward negative infinity).
 *   - Use RoundingMethod.Ceil to round up (toward positive infinity).
 *   - Use RoundingMethod.Round to round to the nearest integer (default).
 * @throws {Error} If an invalid rounding method is provided.
 * @returns {number} The rounded number.
 */
export function roundToDecimal(
  number: number,
  decimalPlaces: number,
  method: RoundingMethod = RoundingMethod.Round,
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
