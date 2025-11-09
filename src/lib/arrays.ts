import { roundToDecimal } from "@/lib/round_number.ts";

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
