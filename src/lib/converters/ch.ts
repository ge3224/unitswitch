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
 * Converts a value from the specified unit to character width units (ch).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to be converted.
 * @returns {number}     - The converted value in ch, or -1 if the conversion
 *                         is not supported or input is invalid.
 */
export const convertToCh: Converter = function convertToCh(
  from: Unit,
  input: number,
): number {
  if (input < 0) return -1;
  const chInPixels = CH_TO_EM_RATIO * FONT_SIZE;
  switch (from) {
    case Units.Centimeters:
      return (input * 0.3937008 * PPI) / chInPixels;
    case Units.Ch:
      return input;
    case Units.Ex:
      return (input * EX_TO_EM_RATIO) / CH_TO_EM_RATIO;
    case Units.Feet:
      return (input * 12 * PPI) / chInPixels;
    case Units.Inches:
      return (input * PPI) / chInPixels;
    case Units.Millimeters:
      return (input * (PPI / 25.4)) / chInPixels;
    case Units.Picas:
      return (input * (PPI / 6)) / chInPixels;
    case Units.Pixels:
      return input / chInPixels;
    case Units.Points:
      return (input * (PPI / 72)) / chInPixels;
    case Units.Rems:
      return input / CH_TO_EM_RATIO;
    case Units.Vh:
      return ((input / 100) * VIEWPORT_HEIGHT) / chInPixels;
    case Units.Vmax:
      return ((input / 100) * Math.max(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
        chInPixels;
    case Units.Vmin:
      return ((input / 100) * Math.min(VIEWPORT_WIDTH, VIEWPORT_HEIGHT)) /
        chInPixels;
    case Units.Vw:
      return ((input / 100) * VIEWPORT_WIDTH) / chInPixels;
    default:
      return -1;
  }
};
