import { roundToDecimal } from '@/lib/round_number';

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

/**
 * Renders a converted value as a string for display.
 */
export const renderConversion = function renderConversion(
  value: number,
  options: RenderOptions = {}
): string {
  // Handle invalid conversions
  if (value < 0) return "N/A";

  // Check for special cases first
  if (options.special) {
    const specialResult = options.special(value);
    if (specialResult !== null) return specialResult;
  }

  // Apply rounding if specified
  const rounded = options.decimals !== undefined
    ? roundToDecimal(value, options.decimals)
    : value;

  const str = rounded.toString();
  const maxLength = options.maxLength ?? 8;

  // Truncate if too long
  return str.length < maxLength ? str : str.slice(0, 6) + "..";
}
