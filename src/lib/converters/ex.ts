import type { Converter } from "./types.ts";
import {
  CH_TO_EM_RATIO,
  EX_TO_EM_RATIO,
  FONT_SIZE,
  PPI,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/lib/constants.ts";
import { type Unit, Units } from "@/lib/units.ts";

/**
 * Converts a value from the specified unit to x-height units (ex).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in ex, or -1 if the conversion
 *                         is not supported or input is invalid.
 */
export const convertToEx: Converter = function convertToEx(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  const exInPixels = EX_TO_EM_RATIO * FONT_SIZE;
  switch (from) {
    case Units.Centimeters:
      return (input * 0.3937008 * PPI) / exInPixels;
    case Units.Ch:
      return (input * CH_TO_EM_RATIO) / EX_TO_EM_RATIO;
    case Units.Ex:
      return input;
    case Units.Feet:
      return (input * 12 * PPI) / exInPixels;
    case Units.Inches:
      return (input * PPI) / exInPixels;
    case Units.Millimeters:
      return (input * (PPI / 25.4)) / exInPixels;
    case Units.Picas:
      return (input * (PPI / 6)) / exInPixels;
    case Units.Pixels:
      return input / exInPixels;
    case Units.Points:
      return (input * (PPI / 72)) / exInPixels;
    case Units.Rems:
      return input / EX_TO_EM_RATIO;
    case Units.Vh:
      return ((input / 100) * VIEWPORT_HEIGHT) / exInPixels;
    case Units.Vmax:
      return ((input / 100) * Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
        exInPixels;
    case Units.Vmin:
      return ((input / 100) * Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
        exInPixels;
    case Units.Vw:
      return ((input / 100) * VIEWPORT_WIDTH) / exInPixels;
    default:
      return -1;
  }
};
