import { roundToDecimal } from "@/shared/round_number";

/**
 * Returns a numeric value interpolated between a range based on its
 * proportional position in a model array.
 *
 * This function takes a numeric `input` value and calculates its proportional
 * position within the `model` array, returning a corresponding value within
 * the specified range defined by `start` and `end`. The result is rounded to a
 * specified number of decimal places using the `roundToDecimal` function.
 *
 * @param input - The numeric value to be mapped to the model array.
 * @param model - An array representing the range of values to interpolate from.
 * @param start - The start value of the interpolation range.
 * @param end - The end value of the interpolation range.
 * @returns The interpolated value from the model array if it exists within the model; otherwise, -1.
 */
export function interpolateInRange(
  input: number,
  model: Array<number>,
  start: number,
  end: number,
): number {
  // Check if the input is within the specified range
  if (input >= start && input <= end) {
    // Calculate the proportion of the input within the range
    const proportion = (input - start) / (end - start);

    // Calculate the mapped result based on the model array
    const result = roundToDecimal(
      model[0] + proportion * (model[model.length - 1] - model[0]),
      2,
    );

    // Check if the result exists within the model array
    return model.includes(result) ? result : -1;
  } else {
    // If the input is outside the range, return -1
    return -1;
  }
}

/**
 * Find the index in an array that has the nearest value to the given input
 * within a specified tolerance.
 *
 * @param {Array<number>} array - The array of numbers to search.
 * @param {number} input - The value to compare against.
 * @param {number} tolerance - The maximum allowed difference (default is 0.01).
 * @returns {number} - The index of the nearest value in the array, or -1 if no match is found within the tolerance.
 */
export function nearestIndex(
  array: Array<number>,
  input: number,
  tolerance: number = 0.01,
): number {
  for (let i = 0; i < array.length; i++) {
    if (Math.abs(array[i] - input) < tolerance) {
      return i;
    }
  }
  return -1;
}

/**
 * Retrieves a value from the 'target' array based on the 'input' value found
 * at an intersecting index in the 'model' array.
 *
 * @param {number[]} model - The source array where the 'input' value is searched for.
 * @param {number[]} target - The array from which the corresponding value will be retrieved.
 * @param {number} input - The value to search for in the 'model' array.
 * @returns {number}  The value from the 'target' array corresponding to the
 *                   'input' value found in the 'model' array. If the 'input'
 *                   value is not found in the 'model' array or if the 'model'
 *                   and 'target' arrays have different lengths, -1 is returned.
 *
 * @example
 * const modelArray = [1, 2, 3, 4];
 * const targetArray = [10, 20, 30, 40];
 * const inputValue = 3;
 * const result = getIntersectingValue(modelArray, targetArray, inputValue);
 * // 'result' will be 30 since the 'inputValue' of 3 is found at index 2 in 'modelArray',
 * // and the corresponding value at index 2 in 'targetArray' is 30.
 */
export function getIntersectingValue(
  model: number[],
  target: number[],
  input: number,
): number {
  if (target.length !== model.length) {
    console.error("model and target arguments are arrays of diffent lengths.");
    return -1;
  }

  const index = model.indexOf(input);

  return index >= 0 ? target[index] : -1;
}
