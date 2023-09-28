import { Unit } from "@/units";
import { Converter, ConverterProps, PPI, FONT_SIZE } from ".";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { tailwindSizes } from "./Tailwind";
import { getIntersectingValue } from "@/shared/arrays";

/**
 * Feet Converter Component
 *
 * The Feet component converts a value from a specified unit to feet (ft).
 *
 * @param {ConverterProps} props - The component's props:
 *   - input: The input value to convert.
 *   - from: The unit to convert from.
 *   - hotkey: The keyboard shortcut to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Feet Converter component.
 */
export default function Feet({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toFeet.convert(from, input);

  const onFtKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      navigator.clipboard.writeText(result >= 0 ? result.toString() : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onFtKey);

    return () => {
      document.removeEventListener("keydown", onFtKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Feet}
      input={input}
      from={from}
      hotkey={hotkey}
      converter={toFeet}
    >
      {""}
    </Wrapper>
  );
}

/**
 * Feet equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the feet (ft) equivalent of that Tailwind size.
 * For example, the 'p-4' Tailwind class would correspond to 0.013888888888888888 feet.
 */
const tailwindInFeet = [
  0, 0.0008680555555555555, 0.001736111111111111, 0.003472222222222222,
  0.005208333333333333, 0.006944444444444444, 0.008680555555555556,
  0.010416666666666666, 0.012152777777777778, 0.013888888888888888,
  0.017361111111111112, 0.020833333333333332, 0.024305555555555556,
  0.027777777777777776, 0.03125, 0.034722222222222224, 0.03819444444444444,
  0.041666666666666664, 0.04861111111111111, 0.05555555555555555,
  0.06944444444444445, 0.08333333333333333, 0.09722222222222222,
  0.1111111111111111, 0.125, 0.1388888888888889, 0.15277777777777776,
  0.16666666666666666, 0.18055555555555555, 0.19444444444444445,
  0.20833333333333334, 0.2222222222222222, 0.25, 0.2777777777777778,
  0.3333333333333333,
];

/**
 * Convert Pixels to Feet
 *
 * This function converts a value from pixels to feet based on a specified DPI (dots per inch).
 *
 * @param {number} px - The value in pixels to convert.
 *
 * @returns {number} - The equivalent value in feet (ft).
 */
function pixelsToFeet(px: number): number {
  return px / PPI / 12;
}

/** Converts a value from a specified unit to feet (ft).
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number} The converted value in feet (ft). Returns -1 if the unit is not supported.
 */
export const toFeet: Converter = {
  /**
   * Converts a value from the specified unit to feet (ft).
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in feet (ft), or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;

    switch (from) {
      case Unit.Bootstrap:
        const bs = [
          0, 0.003472222222222222, 0.006944444444444444, 0.013888888888888888,
          0.020833333333333332, 0.041666666666666664,
        ];
        return input <= bs.length - 1 && input % 1 === 0 ? bs[input] : -1;
      case Unit.Centimetres:
        return input / 30.48;
      case Unit.Ems:
        return (input * FONT_SIZE) / (12 * PPI);
      case Unit.Feet:
        return input;
      case Unit.Inches:
        return input / 12;
      case Unit.Millimetres:
        return input * 0.00328084;
      case Unit.Picas:
        return (input * 0.1667) / 12;
      case Unit.Pixels:
        return pixelsToFeet(input);
      case Unit.Points:
        return input / 72 / 12;
      case Unit.Rems:
        return (input * FONT_SIZE) / (12 * PPI);
      case Unit.Tailwind:
        return getIntersectingValue(tailwindSizes, tailwindInFeet, input);
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in feet (ft) to a
   * string representation.
   *
   * @param {number} conversion - The converted value in feet (ft).
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 9 ? str : str.slice(0, 6) + "..";
  },
};
