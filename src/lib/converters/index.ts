import type { Unit } from "@/lib/units.ts";
import type { Result } from "./result.ts";

import { convertToCentimeters } from "./centimeters.ts";
import { convertToCh } from "./ch.ts";
import { convertToEx } from "./ex.ts";
import { convertToFeet } from "./feet.ts";
import { convertToGoldenRatio } from "./golden.ts";
import { convertToInches } from "./inches.ts";
import { convertToMillimeters } from "./millimeters.ts";
import { convertToPicas } from "./picas.ts";
import { convertToPixels } from "./pixels.ts";
import { convertToPoints } from "./points.ts";
import { convertToRems } from "./rems.ts";
import { convertToRootTwo } from "./root_two.ts";
import { convertToSixteenNine } from "./sixteen_nine.ts";
import { convertToVh } from "./vh.ts";
import { convertToVmax } from "./vmax.ts";
import { convertToVmin } from "./vmin.ts";
import { convertToVw } from "./vw.ts";

/**
 * Type signature for unit converter functions
 */
export type Converter = (from: Unit, input: number) => Result<number>;

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
