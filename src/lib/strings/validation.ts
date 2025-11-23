/**
 * Validation error messages
 */
export const VALIDATION = {
  number: {
    mustBeNumber: "Must be a number.",
    mustBeWholeNumber: "Must be a whole number.",
    mustBePositive: "Must be greater than 0.",
    mustBeAtLeastPointZeroOne: "Must be at least 0.01.",
    cannotBeInfinity: "Cannot be infinity",
    cannotBeNegative: "Cannot be negative",
    valueTooLarge: "Value too large (max: 1 billion)",
    mustBeValid: "Must be a valid number",
  },
  viewport: {
    width: {
      exceedsMax: "Exceeds maximum (7680)",
    },
    height: {
      exceedsMax: "Exceeds maximum (4320)",
    },
  },
  baseFontSize: {
    exceedsMax: "Exceeds maximum (500)",
  },
  ppi: {
    exceedsMax: "Exceeds maximum (800)",
  },
  ratio: {
    exceedsMax: "Exceeds maximum (1)",
  },
} as const;
