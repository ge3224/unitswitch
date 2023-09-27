import { Unit } from "@/units";
import { Converter, ConverterProps, DPI, FONT_SIZE } from ".";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

/**
 * Points Component
 *
 * This component is used to convert a value from a specified unit to Points (pt).
 *
 * @param {Object} props        - The component's props.
 * @param {number} props.input  - The value to be converted to millimetres.
 * @param {Unit} props.from     - The unit from which the input value should
 *                                be converted.
 * @param {string} props.hotkey - The keyboard shortcut to trigger the conversion
 *                                and copy the result to the clipboard.
 *
 * @returns {JSX.Element} - The JSX element representing the Points component.
 */
export default function Points({
  input,
  from,
  hotkey,
}: ConverterProps): JSX.Element {
  const result = toPoints.convert(from, input);

  const onKeyPT = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(3) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyPT);

    return () => {
      document.removeEventListener("keydown", onKeyPT);
    };
  });

  return (
    <Wrapper
      base={Unit.Points}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toPoints}
    >
      {""}
    </Wrapper>
  );
}

/**
 * Points equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the centimetre equivalent of that Tailwind
 * size. For example, the 'p-4' Tailwind class would correspond to 12 points (pt).
 */
export const tailwindInPoints = [
  0, 0.75, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 15, 18, 21, 24, 27, 30, 33, 36, 42,
  48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 216, 240, 288,
];

/**
 * Converts a value from a specified unit to points (pt).
 *
 * @param {Unit} from    - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number}     - The converted value in points. 
 *                         Returns -1 if the unit is not supported.
 */
export const toPoints: Converter = {
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;

    const pxToPts = (px: number): number => {
      return px * 0.75;
    };

    switch (from) {
      case Unit.Bootstrap:
        const bs = [
          0, 5.333333333333333, 10.666666666666666, 21.333333333333332, 32, 64,
        ];
        return input <= bs.length - 1 ? roundToDecimal(bs[input], 4) : -1;
      case Unit.Centimetres:
        return roundToDecimal(input * 28.3464567, 4);
      case Unit.Ems:
        return roundToDecimal(input * FONT_SIZE * (72 / DPI), 4);
      case Unit.Feet:
        return roundToDecimal(input * 864, 4);
      case Unit.Inches:
        return roundToDecimal(input * 72, 4);
      case Unit.Millimetres:
        return roundToDecimal(input * 2.83464567, 4);
      case Unit.Picas:
        return roundToDecimal(input * 12, 4);
      case Unit.Pixels:
        return roundToDecimal(pxToPts(input), 4);
      case Unit.Points:
        return roundToDecimal(input, 4);
      case Unit.Rems:
        return roundToDecimal((input * FONT_SIZE) / 12, 4);
      case Unit.Tailwind:
        return roundToDecimal(
          getIntersectingValue(tailwindSizes, tailwindInPoints, input),
          4,
        );
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in points (pt) to a
   * string representation.
   *
   * @param {number} conversion - The converted value in points (pt).
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
