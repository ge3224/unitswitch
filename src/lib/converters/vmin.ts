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

const VIEWPORT_MIN = Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

/**
 * Converts a value from the specified unit to viewport minimum units (vmin).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in vmin, or -1 if the conversion
 *                         is not supported or input is invalid.
 */
export const convertToVmin: Converter = function convertToVmin(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Centimeters:
      return ((input * 0.3937008 * PPI) / VIEWPORT_MIN) * 100;
    case Units.Ch:
      return ((input * CH_TO_EM_RATIO * FONT_SIZE) / VIEWPORT_MIN) * 100;
    case Units.Ex:
      return ((input * EX_TO_EM_RATIO * FONT_SIZE) / VIEWPORT_MIN) * 100;
    case Units.Feet:
      return ((input * 12 * PPI) / VIEWPORT_MIN) * 100;
    case Units.Inches:
      return ((input * PPI) / VIEWPORT_MIN) * 100;
    case Units.Millimeters:
      return ((input * (PPI / 25.4)) / VIEWPORT_MIN) * 100;
    case Units.Picas:
      return ((input * (PPI / 6)) / VIEWPORT_MIN) * 100;
    case Units.Pixels:
      return (input / VIEWPORT_MIN) * 100;
    case Units.Points:
      return ((input * (PPI / 72)) / VIEWPORT_MIN) * 100;
    case Units.Rems:
      return ((input * FONT_SIZE) / VIEWPORT_MIN) * 100;
    case Units.Vh:
      return (input * VIEWPORT_HEIGHT) / VIEWPORT_MIN;
    case Units.Vmax:
      return (input * Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) / VIEWPORT_MIN;
    case Units.Vmin:
      return input;
    case Units.Vw:
      return (input * VIEWPORT_WIDTH) / VIEWPORT_MIN;
    default:
      return -1;
  }
};
