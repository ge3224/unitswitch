import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from "@/converters/index";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { tailwindSizes } from "./Tailwind";
import { propPosInArray, propPosInRange } from "@/shared/arrays";

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
      callback={toMillimetres}
    >
      {""}
    </Wrapper >
  );
}

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
    * @returns {number} - The converted value in millimeters, or -1 if the conversion is not supported or input is invalid.
    */
  convert: (from: Unit, input: number): number => {
    if (input <= 0) return -1;

    switch (from) {
      case Unit.Bootstrap:
        const bs = [0, 0.10583332, 0.21166664, 0.42333328, 0.63499992, 1.26999984];
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
        return roundToDecimal(propPosInRange(input, tailwindSizes, 0, 101.5999872), 3);
      default:
        return -1;
    }
  },
};
