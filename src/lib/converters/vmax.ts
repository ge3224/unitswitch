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

const VIEWPORT_MAX = Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

/**
 * Converts a value from the specified unit to viewport maximum units (vmax).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in vmax, or -1 if the conversion
 *                         is not supported or input is invalid.
 */
export const convertToVmax: Converter = function convertToVmax(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  switch (from) {
    case Units.Centimeters:
      return ((input * 0.3937008 * PPI) / VIEWPORT_MAX) * 100;
    case Units.Ch:
      return ((input * CH_TO_EM_RATIO * FONT_SIZE) / VIEWPORT_MAX) * 100;
    case Units.Ex:
      return ((input * EX_TO_EM_RATIO * FONT_SIZE) / VIEWPORT_MAX) * 100;
    case Units.Feet:
      return ((input * 12 * PPI) / VIEWPORT_MAX) * 100;
    case Units.Inches:
      return ((input * PPI) / VIEWPORT_MAX) * 100;
    case Units.Millimeters:
      return ((input * (PPI / 25.4)) / VIEWPORT_MAX) * 100;
    case Units.Picas:
      return ((input * (PPI / 6)) / VIEWPORT_MAX) * 100;
    case Units.Pixels:
      return (input / VIEWPORT_MAX) * 100;
    case Units.Points:
      return ((input * (PPI / 72)) / VIEWPORT_MAX) * 100;
    case Units.Rems:
      return ((input * FONT_SIZE) / VIEWPORT_MAX) * 100;
    case Units.Vh:
      return (input * VIEWPORT_HEIGHT) / VIEWPORT_MAX;
    case Units.Vmax:
      return input;
    case Units.Vmin:
      return (input * Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) / VIEWPORT_MAX;
    case Units.Vw:
      return (input * VIEWPORT_WIDTH) / VIEWPORT_MAX;
    default:
      return -1;
  }
};
