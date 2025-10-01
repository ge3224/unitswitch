import type { Converter } from "@/lib/converter";
import { Units, type Unit } from "@/lib/units";
import { nearestIndex } from "@/lib/arrays";

/**
 * Contains a set of pixel values commonly used in web development for spacing
 * and layout purposes. These values are used in conjunction with the Bootstrap
 * CSS framework.
 */
const _bootstrapToPixels: number[] = [0, 4, 8, 16, 24, 48];

export const convertToBootstrap: Converter = function convertToBootstrap(from: Unit, input: number): number {
  if (input < 0) return -1;

  switch (from) {
    case Units.Bootstrap:
      return [0, 1, 2, 3, 4, 5].includes(input) ? input : -1;
    case Units.Ems:
      return [0, 0.25, 0.5, 1, 1.5, 3].indexOf(input);
    case Units.Feet:
      return nearestIndex(
        [
          0, 0.0069444435695538, 0.0034722217847769, 0.013888887139108,
          0.020833330708661, 0.041666661417323,
        ],
        input,
        0.001,
      );
    case Units.Rems:
      return [0, 0.25, 0.5, 1, 1.5, 3].indexOf(input);
    case Units.Picas:
      return nearestIndex(
        [
          0, 0.24999996870079, 0.49999993740157, 0.99999987480315,
          1.4999998122047, 2.9999996244094,
        ],
        input,
      );
    case Units.Inches:
      return nearestIndex(
        [
          0, 0.041666661417323, 0.083333322834646, 0.16666664566929,
          0.24999996850394, 0.49999993700787,
        ],
        input,
      );
    case Units.Pixels:
      return _bootstrapToPixels.indexOf(input);
    case Units.Points:
      return nearestIndex(
        [
          0, 2.9999977322849, 5.9999954645698, 11.99999092914,
          17.999986393709, 35.999972787419,
        ],
        input,
        0.1,
      );
    case Units.Tailwind:
      return [0, 1, 2, 4, 6, 12].indexOf(input);
    case Units.Centimetres:
      return nearestIndex(
        [0, 0.10583332, 0.21166664, 0.42333328, 0.63499992, 1.26999984],
        input,
      );
    case Units.Millimetres:
      return nearestIndex(
        [0, 1.0583332, 2.1166664, 4.2333328, 6.3499992, 12.6999984],
        input,
      );
    default:
      return -1;
  }
}
