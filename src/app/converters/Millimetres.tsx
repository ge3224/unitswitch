import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from "@/converters";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { tailwindSizes } from "@/converters/Tailwind";
import { getIntersectingValue } from "@/shared/arrays";

/**
 * Millimetres Component
 *
 * This component is used to convert a value from a specified unit to millimetres.
 *
 * @param {Object} props - The component's props.
 * @param {number} props.input - The value to be converted to millimetres.
 * @param {Unit} props.from - The unit from which the input value should be converted.
 * @param {string} props.hotkey - The keyboard shortcut to trigger the conversion and copy the result to the clipboard (e.g., "A", "B", "1", etc.).
 *
 * @returns {JSX.Element} - The JSX element representing the Millimetres component.
 */
export default function Millimetres({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toMillimetres.convert(from, input);

  const hotkeyHandler = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", hotkeyHandler);

    return () => {
      document.removeEventListener("keydown", hotkeyHandler);
    };
  });

  return (
    <Wrapper
      base={Unit.Millimetres}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toMillimetres}
    >
      {""}
    </Wrapper>
  );
}

/**
 * Millimetre equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this array corresponds to a specific size in a Tailwind CSS
 * class name. The values represent the millimetre equivalent of that Tailwind
 * size class. For example, the 'p-4' Tailwind class, which would correspond to
 * 9.525 mm.
 */
export const tailwindInMillimetres = [
  0, 0.264583, 0.529167, 1.058333, 1.5875, 2.116667, 2.645833, 3.175, 3.704167,
  4.233333, 5.291667, 6.35, 7.408333, 8.466667, 9.525, 10.58333, 11.64167, 12.7,
  14.81667, 16.93333, 21.16667, 25.4, 29.63333, 33.86667, 38.1, 42.33333,
  46.56667, 50.8, 55.03333, 59.26667, 63.5, 67.73333, 76.2, 84.66667, 101.6,
];

/**
 * The `toMillimetres` object implements the Converter type by provising a function
 * that convert various units into millimeters.
 *
 * @type {Converter}
 */
export const toMillimetres: Converter = {
  /**
   * Converts a value from the specified unit to millimeters.
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in millimeters, or -1 if the 
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input <= 0) return -1;

    switch (from) {
      case Unit.Bootstrap:
        const bs = [
          0, 0.10583332, 0.21166664, 0.42333328, 0.63499992, 1.26999984,
        ];
        return input >= 0 && input <= bs.length - 1 && input % 1 === 0
          ? bs[input]
          : -1;
      case Unit.Centimetres:
        return roundToDecimal(input * 10, 3);
      case Unit.Ems:
        return roundToDecimal(((input * FONT_SIZE) / DPI) * 25.4, 3);
      case Unit.Feet:
        return roundToDecimal(input * 304.8, 1);
      case Unit.Inches:
        return roundToDecimal(input * 25.4, 3);
      case Unit.Millimetres:
        return roundToDecimal(input, 3);
      case Unit.Picas:
        return roundToDecimal(input * 4.23333333, 3);
      case Unit.Pixels:
        return roundToDecimal(input * 0.2645833, 4);
      case Unit.Points:
        return roundToDecimal(input * 0.352778, 3);
      case Unit.Rems:
        return roundToDecimal(((input * FONT_SIZE) / DPI) * 25.4, 3);
      case Unit.Tailwind:
        return getIntersectingValue(
          tailwindSizes,
          tailwindInMillimetres,
          input,
        );
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in millimeters to a 
   * string representation.
   *
   * @param {number} conversion - The converted value in millimeters.
   * @returns {string} - A string representation of the converted value, or 
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion <= 0) return "N/A";

    const str = conversion.toString();
    return str.length < 9 ? str : str.slice(0, 7) + "..";
  },
};
