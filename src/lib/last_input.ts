import { newSimpleState, SimpleState } from "@pkg/simple-state/src/index.ts";
import { Unit, Units } from "@/lib/units.ts";

/**
 * Last conversion input data
 */
export type LastInput = {
  /** The numeric amount entered by the user */
  amount: number;
  /** The unit type selected by the user */
  unit: Unit;
};

const LOCAL_STORAGE_KEY = "unitswitch-last-input";

/**
 * Default last input values
 */
export const DEFAULT_LAST_INPUT: LastInput = {
  amount: 16,
  unit: Units.Pixels,
};

/**
 * Load last input from local storage
 */
function loadLastInput(): LastInput {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate required fields
      if (
        typeof parsed.amount === "number" &&
        typeof parsed.unit === "string"
      ) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("Failed to load last input from localStorage:", error);
  }
  return { ...DEFAULT_LAST_INPUT };
}

/**
 * Save last input to local storage
 */
function saveLastInput(input: LastInput): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(input));
  } catch (error) {
    console.warn("Failed to save last input to localStorage:", error);
  }
}

/**
 * Global last input state
 */
export const lastInputState: SimpleState<LastInput> = newSimpleState<LastInput>(
  loadLastInput(),
);

// Subscribe to save changes to localStorage
const handleLastInputSave: (newInput: LastInput) => void = function handleLastInputSave(newInput: LastInput): void {
  saveLastInput(newInput);
};
lastInputState.subscribe(handleLastInputSave);
