import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from ".";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { roundToDecimal } from "@/shared/round_number";
import { tailwindInPixels } from "./Pixels";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

export default function Inches({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toInches.convert(from, input);

  const onInchKey = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onInchKey);

    return () => {
      document.removeEventListener("keydown", onInchKey);
    };
  });

  return (
    <Wrapper
      base={Unit.Inches}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      converter={toInches}
    >
      {""}
    </Wrapper>
  );
}

export const tailwindInInches = [
  0, 0.010416666666666666, 0.020833333333333332, 0.041666666666666664, 0.0625,
  0.08333333333333333, 0.10416666666666667, 0.125, 0.14583333333333334,
  0.16666666666666666, 0.20833333333333334, 0.25, 0.2916666666666667,
  0.3333333333333333, 0.375, 0.4166666666666667, 0.4583333333333333, 0.5,
  0.5833333333333334, 0.6666666666666666, 0.8333333333333334, 1,
  1.1666666666666667, 1.3333333333333333, 1.5, 1.6666666666666667,
  1.8333333333333333, 2, 2.1666666666666665, 2.3333333333333335, 2.5,
  2.6666666666666665, 3, 3.3333333333333335, 4,
];

export const toInches: Converter = {
  /**
   * Converts a value from the specified unit to inches (in).
   *
   * @param {Unit} from - The unit to convert from.
   * @param {number} input - The value to be converted.
   * @returns {number} - The converted value in inches (in), or -1 if the
   *                     conversion is not supported or input is invalid.
   */
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;
    switch (from) {
      case Unit.Bootstrap:
        const bs = [
          0, 0.041666666666666664, 0.08333333333333333, 0.16666666666666666,
          0.25, 0.5,
        ];
        return input <= bs.length - 1 && input % 1 === 0 ? bs[input] : -1;
      case Unit.Centimetres:
        return roundToDecimal(input * 0.393701, 4);
      case Unit.Ems:
        return roundToDecimal(input * (DPI / FONT_SIZE), 4);
      case Unit.Feet:
        return roundToDecimal(input * 12, 4);
      case Unit.Inches:
        return roundToDecimal(input, 4);
      case Unit.Millimetres:
        return roundToDecimal(input * 0.0393701, 4);
      case Unit.Picas:
        return roundToDecimal(input / 6, 4);
      case Unit.Pixels:
        return roundToDecimal(input / DPI, 4);
      case Unit.Points:
        return roundToDecimal(input / 72, 4);
      case Unit.Rems:
        return roundToDecimal(input * (DPI / FONT_SIZE), 4);
      case Unit.Tailwind:
        return roundToDecimal(
          getIntersectingValue(tailwindSizes, tailwindInInches, input),
          4,
        );
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in inches (in) to a
   * string representation.
   *
   * @param {number} conversion - The converted value in inches (in).
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
