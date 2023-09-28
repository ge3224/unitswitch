import { useEffect } from "react";
import { Unit } from "@/units";
import { Converter, ConverterProps } from "@/converters";
import Wrapper from "@/converters/Wrapper";
import { nearestIndex } from "@/shared/arrays";

/**
 * Bootstrap Component
 *
 * This component converts a value from various units of measurement to Bootstrap sizing
 * and provides a hotkey to copy the converted value to the clipboard.
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Bootstrap Converter component.
 */
export default function Bootstrap({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toBootstrap.convert(from, input);

  const onBsKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onBsKey);

    return () => {
      document.removeEventListener("keydown", onBsKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Bootstrap}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toBootstrap}
    >
      <div className="font-space text-app-black">
        Only six possible values: <strong>0-5</strong>
      </div>
    </Wrapper>
  );
}

/**
 * The `bootstrapInPixels` array contains a set of pixel values commonly used in web development
 * for spacing and layout purposes. These values are used in conjunction with the Bootstrap
 * CSS framework.
 *
 * Each value in the array represents a specific pixel measurement that can be used for margins,
 * padding, or other spacing-related properties in your web applications.
 *
 * @type {number[]} An array of pixel values for spacing and layout in web development.
 */
export const bootstrapInPixels: number[] = [0, 4, 8, 16, 24, 48];

/**
 * The `toBootstrap` object implements the `Converter` type by providing both
 * the `convert` and `render` functions used to process incoming values from
 * other units into Bootstrap sizing.
 */
export const toBootstrap: Converter = {

  /**
   * Converts a value from the specified unit to Bootstrap sizing.
   *
   * @param {Unit} from    - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number}     - The converted value in Bootstrap sizing, or -1 if the conversion is 
   *                         not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    switch (from) {
      case Unit.Bootstrap:
        return [0, 1, 2, 3, 4, 5].includes(input) ? input : -1;
      case Unit.Ems:
        return [0, 0.25, 0.5, 1, 1.5, 3].indexOf(input);
      case Unit.Feet:
        return nearestIndex(
          [
            0, 0.0069444435695538, 0.0034722217847769, 0.013888887139108,
            0.020833330708661, 0.041666661417323,
          ],
          input,
          0.001,
        );
      case Unit.Rems:
        return [0, 0.25, 0.5, 1, 1.5, 3].indexOf(input);
      case Unit.Picas:
        return nearestIndex(
          [
            0, 0.24999996870079, 0.49999993740157, 0.99999987480315,
            1.4999998122047, 2.9999996244094,
          ],
          input,
        );
      case Unit.Inches:
        return nearestIndex(
          [
            0, 0.041666661417323, 0.083333322834646, 0.16666664566929,
            0.24999996850394, 0.49999993700787,
          ],
          input,
        );
      case Unit.Pixels:
        return bootstrapInPixels.indexOf(input);
      case Unit.Points:
        return nearestIndex(
          [
            0, 2.9999977322849, 5.9999954645698, 11.99999092914,
            17.999986393709, 35.999972787419,
          ],
          input,
          0.1,
        );
      case Unit.Tailwind:
        return [0, 1, 2, 4, 6, 12].indexOf(input);
      case Unit.Centimetres:
        return nearestIndex(
          [0, 0.10583332, 0.21166664, 0.42333328, 0.63499992, 1.26999984],
          input,
        );
      case Unit.Millimetres:
        return nearestIndex(
          [0, 1.0583332, 2.1166664, 4.2333328, 6.3499992, 12.6999984],
          input,
        );
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in Bootstrap sizes to a
   * string representation.
   *
   * @param {number} conversion - The converted value in Bootstrap sizes.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    return conversion.toString();
  },
};
