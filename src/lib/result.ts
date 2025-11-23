/**
 * Result type for application functions
 * Inspired by Rust's Result<T, E> pattern
 *
 * Provides a type-safe way to handle errors without exceptions
 */

/**
 * Result type - either success (Ok) with a value, or failure (Err) with an error
 */
export type Result<T, E = AppError> =
  | { ok: true; value: T }
  | { ok: false; error: E };

/**
 * Kinds of errors that can occur in the application
 */
export enum AppErrorKind {
  /** Input value is negative (not allowed for measurements) */
  NegativeInput = "NegativeInput",
  /** Unit type is not supported by this converter */
  UnsupportedUnit = "UnsupportedUnit",
  /** Input value is invalid (NaN, Infinity, out of range, etc.) */
  InvalidInput = "InvalidInput",
  /** Configuration value is invalid */
  InvalidConfig = "InvalidConfig",
  /** localStorage operation failed */
  StorageError = "StorageError",
}

/**
 * Detailed error information for application failures
 */
export type AppError = {
  kind: AppErrorKind;
  message: string;
  unit?: string;
  input?: number;
};

/**
 * Creates a successful Result with the given value
 *
 * @example
 * return Ok(42);
 */
export function Ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

/**
 * Creates a failed Result with error details
 *
 * @example
 * return Err(AppErrorKind.NegativeInput, "Value cannot be negative", { input: -5 });
 */
export function Err(
  kind: AppErrorKind,
  message: string,
  details?: { unit?: string; input?: number },
): Result<never> {
  return {
    ok: false,
    error: { kind, message, ...details },
  };
}

/**
 * Unwraps a Result, returning the value if Ok, or a fallback value if Err
 *
 * @example
 * const value = unwrapOr(result, -1);
 */
export function unwrapOr<T>(result: Result<T>, fallback: T): T {
  return result.ok ? result.value : fallback;
}

/**
 * Maps a Result's value through a function, preserving errors
 *
 * @example
 * const doubled = map(result, x => x * 2);
 */
export function map<T, U>(result: Result<T>, fn: (value: T) => U): Result<U> {
  if (result.ok) {
    return Ok(fn(result.value));
  }
  return result;
}

export function assertNever(value: never): Result<never> {
  return Err(
    AppErrorKind.UnsupportedUnit,
    `Internal error: unhandled unit type: ${value}`,
    { unit: value },
  );
}
