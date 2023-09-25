/**
 * Rounds a number to the specified number of decimal places.
 *
 * @param {number} number - The number to round.
 * @param {number} decimalPlaces - The number of decimal places to round to.
 * @returns {number} The rounded number.
 */
export function roundToDecimal(number: number, decimalPlaces: number): number {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.ceil(number * multiplier) / multiplier;
}
