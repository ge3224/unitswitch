import type { Unit } from "@/lib/units.ts";
import type { Result } from "@/lib/result.ts";
import { AppErrorKind, Err } from "@/lib/result.ts";

import { convertToCentimeters } from "@/lib/converters/centimeters.ts";
import { convertToCh } from "@/lib/converters/ch.ts";
import { convertToEx } from "@/lib/converters/ex.ts";
import { convertToFeet } from "@/lib/converters/feet.ts";
import { convertToGoldenRatio } from "@/lib/converters/golden.ts";
import { convertToInches } from "@/lib/converters/inches.ts";
import { convertToMillimeters } from "@/lib/converters/millimeters.ts";
import { convertToPicas } from "@/lib/converters/picas.ts";
import { convertToPixels } from "@/lib/converters/pixels.ts";
import { convertToPoints } from "@/lib/converters/points.ts";
import { convertToRems } from "@/lib/converters/rems.ts";
import { convertToRootTwo } from "@/lib/converters/root_two.ts";
import { convertToSixteenNine } from "@/lib/converters/sixteen_nine.ts";
import { convertToVh } from "@/lib/converters/vh.ts";
import { convertToVmax } from "@/lib/converters/vmax.ts";
import { convertToVmin } from "@/lib/converters/vmin.ts";
import { convertToVw } from "@/lib/converters/vw.ts";

/**
 * Type signature for unit converter functions
 */
export type Converter = (from: Unit, input: number) => Result<number>;

/**
 * Validates converter input for common issues (NaN, Infinity, negative values)
 * Returns an error Result if validation fails, null if validation passes
 */
export function validateConverterInput(
  input: number,
  unit: Unit,
): Result<never> | null {
  if (!isFinite(input) || isNaN(input)) {
    return Err(
      AppErrorKind.InvalidInput,
      "Input must be a finite number",
      { input, unit },
    );
  }

  if (input < 0) {
    return Err(
      AppErrorKind.NegativeInput,
      "Input value cannot be negative",
      { input, unit },
    );
  }

  return null;
}

export function assertNever(value: never): Result<never> {
  return Err(
    AppErrorKind.UnsupportedUnit, // reuse existing error kind
    `Internal error: unhandled unit type: ${value}`,
    { unit: value },
  );
}

export {
  convertToCentimeters,
  convertToCh,
  convertToEx,
  convertToFeet,
  convertToGoldenRatio,
  convertToInches,
  convertToMillimeters,
  convertToPicas,
  convertToPixels,
  convertToPoints,
  convertToRems,
  convertToRootTwo,
  convertToSixteenNine,
  convertToVh,
  convertToVmax,
  convertToVmin,
  convertToVw,
};
