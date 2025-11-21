import { AppErrorKind, Err, Ok, Result } from "@/lib/result.ts";
import { Units } from "@/lib/units.ts";

type ValidationCheck = {
  check: (input: number) => boolean;
  error: string;
};

function validateNumber(
  input: number,
  fieldName: string,
  checks: ValidationCheck[],
): Result<number> {
  for (const c of checks) {
    if (c.check(input)) {
      return Err(AppErrorKind.InvalidInput, `${fieldName}: ${c.error}`, { input });
    }
  }

  return Ok(input);
}

export function validateViewportWidth(input: number): Result<number> {
  return validateNumber(input, Units.Vw, [
    { check: (n) => isNaN(n), error: "Must be a number." },
    { check: (n) => !Number.isInteger(n), error: "Must be a whole number." },
    { check: (n) => n < 1, error: "Must be greater than 0." },
    { check: (n) => n > 7680, error: "Exceeds maximum (7680)" },
  ]);
}

export function validateViewportHeight(input: number): Result<number> {
  return validateNumber(input, Units.Vh, [
    { check: (n) => isNaN(n), error: "Must be a number." },
    { check: (n) => !Number.isInteger(n), error: "Must be a whole number." },
    { check: (n) => n < 1, error: "Must be greater than 0." },
    { check: (n) => n > 4320, error: "Exceeds maximum (4320)" },
  ]);
}

export function validateFontSize(input: number): Result<number> {
  return validateNumber(input, Units.Pixels, [
    { check: (n) => isNaN(n), error: "Must be a number." },
    { check: (n) => n < 1, error: "Must be greater than 0." },
    { check: (n) => n > 500, error: "Exceeds maximum (500)" },
  ]);
}

export function validatePpi(input: number): Result<number> {
  return validateNumber(input, "PPI", [
    { check: (n) => isNaN(n), error: "Must be a number." },
    { check: (n) => !Number.isInteger(n), error: "Must be a whole number." },
    { check: (n) => n < 1, error: "Must be greater than 0." },
    { check: (n) => n > 800, error: "Exceeds maximum (800)" },
  ]);
}

export function validateChToEmRatio(input: number): Result<number> {
  return validateNumber(input, "ch/em Ratio", [
    { check: (n) => isNaN(n), error: "Must be a number." },
    { check: (n) => n < 0.01, error: "Must be at least 0.01." },
    { check: (n) => n > 1, error: "Exceeds maximum (1)" },
  ]);
}

export function validateExToEmRatio(input: number): Result<number> {
  return validateNumber(input, "ex/em Ratio", [
    { check: (n) => isNaN(n), error: "Must be a number." },
    { check: (n) => n < 0.01, error: "Must be at least 0.01." },
    { check: (n) => n > 1, error: "Exceeds maximum (1)" },
  ]);
}

/**
 * Validates a conversion input value (the value being converted in the main UI)
 * Checks for NaN, Infinity, negative values (but allows 0), and extreme values
 */
export function validateConversionInput(input: number): Result<number> {
  // Common validation checks for any conversion input
  const checks: ValidationCheck[] = [
    { check: (n) => isNaN(n), error: "Must be a valid number" },
    { check: (n) => !isFinite(n), error: "Cannot be infinity" },
    { check: (n) => n < 0, error: "Cannot be negative" }, // Note: 0 is allowed
    { check: (n) => n > 1000000000, error: "Value too large (max: 1 billion)" },
  ];

  for (const c of checks) {
    if (c.check(input)) {
      return Err(AppErrorKind.InvalidInput, c.error, { input });
    }
  }

  return Ok(input);
}
