import { Result } from "@/lib/converters/result.ts";
import { roundToDecimal } from "@/lib/round_number.ts";

/**
 * Options for rendering conversion values.
 */
export interface RenderOptions {
  /** Number of decimal places to round to. If omitted, no rounding. */
  decimals?: number;
  /** Maximum string length before truncation. Default: 8 */
  maxLength?: number;
  /** Custom handler for special cases. Return null to use default rendering. */
  special?: (value: number) => string | null;
}

export interface RenderResult {
  result: string;
  errorMessage?: string;
}

/**
 * Renders a converted value as a string for display.
 */
export const renderConversion = function renderConversion(
  result: Result<number>,
  options: RenderOptions = {},
): RenderResult {
  if (!result.ok) {
    const err = result.error;
    console.error("Conversion error:", {
      kind: err.kind,
      message: err.message,
      unit: err.unit,
      input: err.input,
    });

    return { result: "⚠️ N/A", errorMessage: err.message };
  }

  const value = result.value;

  if (value < 0) return { result: "N/A" };

  // Check for special cases first
  if (options.special) {
    const specialResult = options.special(value);
    if (specialResult !== null) {
      if (specialResult === "") {
        console.warn(
          `Special handler returned empty string for value ${value}`,
        );
      }
      return { result: specialResult };
    }
    console.warn(
      `Special handler did not handle value ${value}, using default rendering`,
    );
  }

  const rounded = options.decimals !== undefined
    ? roundToDecimal(value, options.decimals)
    : value;

  const str = rounded.toString();
  const maxLength = options.maxLength ?? 8;

  return { result: str.length < maxLength ? str : str.slice(0, 6) + ".." };
};
