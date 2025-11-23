import { AppErrorKind, Err, Ok, Result } from "@/lib/result.ts";
import { Units } from "@/lib/units.ts";
import { VALIDATION } from "@/lib/strings/index.ts";

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
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeNumber },
    { check: (n) => !Number.isInteger(n), error: VALIDATION.number.mustBeWholeNumber },
    { check: (n) => n < 1, error: VALIDATION.number.mustBePositive },
    { check: (n) => n > 7680, error: VALIDATION.viewport.width.exceedsMax },
  ]);
}

export function validateViewportHeight(input: number): Result<number> {
  return validateNumber(input, Units.Vh, [
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeNumber },
    { check: (n) => !Number.isInteger(n), error: VALIDATION.number.mustBeWholeNumber },
    { check: (n) => n < 1, error: VALIDATION.number.mustBePositive },
    { check: (n) => n > 4320, error: VALIDATION.viewport.height.exceedsMax },
  ]);
}

export function validateFontSize(input: number): Result<number> {
  return validateNumber(input, Units.Pixels, [
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeNumber },
    { check: (n) => n < 1, error: VALIDATION.number.mustBePositive },
    { check: (n) => n > 500, error: VALIDATION.baseFontSize.exceedsMax },
  ]);
}

export function validatePpi(input: number): Result<number> {
  return validateNumber(input, "PPI", [
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeNumber },
    { check: (n) => !Number.isInteger(n), error: VALIDATION.number.mustBeWholeNumber },
    { check: (n) => n < 1, error: VALIDATION.number.mustBePositive },
    { check: (n) => n > 800, error: VALIDATION.ppi.exceedsMax },
  ]);
}

export function validateChToEmRatio(input: number): Result<number> {
  return validateNumber(input, "ch/em Ratio", [
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeNumber },
    { check: (n) => n < 0.01, error: VALIDATION.number.mustBeAtLeastPointZeroOne },
    { check: (n) => n > 1, error: VALIDATION.ratio.exceedsMax },
  ]);
}

export function validateExToEmRatio(input: number): Result<number> {
  return validateNumber(input, "ex/em Ratio", [
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeNumber },
    { check: (n) => n < 0.01, error: VALIDATION.number.mustBeAtLeastPointZeroOne },
    { check: (n) => n > 1, error: VALIDATION.ratio.exceedsMax },
  ]);
}

/**
 * Validates a conversion input value (the value being converted in the main UI)
 * Checks for NaN, Infinity, negative values (but allows 0), and extreme values
 */
export function validateConversionInput(input: number): Result<number> {
  // Common validation checks for any conversion input
  const checks: ValidationCheck[] = [
    { check: (n) => isNaN(n), error: VALIDATION.number.mustBeValid },
    { check: (n) => !isFinite(n), error: VALIDATION.number.cannotBeInfinity },
    { check: (n) => n < 0, error: VALIDATION.number.cannotBeNegative }, // Note: 0 is allowed
    { check: (n) => n > 1000000000, error: VALIDATION.number.valueTooLarge },
  ];

  for (const c of checks) {
    if (c.check(input)) {
      return Err(AppErrorKind.InvalidInput, c.error, { input });
    }
  }

  return Ok(input);
}
