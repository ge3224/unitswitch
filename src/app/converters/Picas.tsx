import { Unit } from "@/units";
import Wrapper from "./Wrapper";
import { useEffect } from "react";
import { roundToDecimal } from "@/shared/round_number";
import { DPI, FONT_SIZE } from ".";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

export default function Picas({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toPicas.convert(from, input);

  const onCmKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onCmKey);

    return () => {
      document.removeEventListener("keydown", onCmKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Picas}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toPicas}
    >
      {""}
    </Wrapper>
  );
}

export const tailwindInPicas = [
  0, 0.0625, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.25, 1.5, 1.75, 2,
  2.25, 2.5, 2.75, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20,
  24,
];

export const toPicas = {
  /**
   * Converts a value from the specified unit to picas (pc).
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in picas (pc), or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        const bs = [0, 0.125, 0.25, 0.5, 0.75, 1.5];
        return input <= bs.length - 1 && input % 1 === 0 ? bs[input] : -1;
      case Unit.Centimetres:
        return roundToDecimal(input / 2.3622, 4);
      case Unit.Ems:
        return roundToDecimal((input * FONT_SIZE) / 12, 4);
      case Unit.Feet:
        return roundToDecimal(input * 24, 4);
      case Unit.Inches:
        return roundToDecimal(input * 6, 4);
      case Unit.Millimetres:
        return roundToDecimal(input * 0.3528, 4);
      case Unit.Picas:
        return roundToDecimal(input, 4);
      case Unit.Pixels:
        return roundToDecimal(input / (DPI / 6), 4);
      case Unit.Points:
        return roundToDecimal(input * 0.0833, 4);
      case Unit.Rems:
        return roundToDecimal((input * FONT_SIZE) / 12, 4);
      case Unit.Tailwind:
        return roundToDecimal(
          getIntersectingValue(tailwindSizes, tailwindInPicas, input),
          4,
        );
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
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
