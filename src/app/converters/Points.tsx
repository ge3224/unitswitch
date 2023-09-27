import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from ".";
import { useEffect } from "react";
import Wrapper from "./Wrapper";
import { RoundingMethod, roundToDecimal } from "@/shared/round_number";
import { getIntersectingValue } from "@/shared/arrays";
import { tailwindSizes } from "./Tailwind";

/**
 * Points Component
 *
 * This component is used to convert a value from a specified unit to Points (pt).
 *
 * @param {Object} props - The component's props.
 * @param {number} props.input - The value to be converted to millimetres.
 * @param {Unit} props.from - The unit from which the input value should be converted.
 * @param {string} props.hotkey - The keyboard shortcut to trigger the conversion and copy the result to the clipboard (e.g., "A", "B", "1", etc.).
 *
 * @returns {JSX.Element} - The JSX element representing the Points component.
 */
export default function Points({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
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

export const tailwindInPoints = [
  0, 1.3333333333333333, 2.6666666666666665, 5.333333333333333, 8,
  10.666666666666666, 13.333333333333334, 16, 18.666666666666668,
  21.333333333333332, 26.666666666666668, 32, 37.333333333333336,
  42.666666666666664, 48, 53.333333333333336, 58.666666666666664, 64,
  74.66666666666667, 85.33333333333333, 106.66666666666667, 128,
  149.33333333333334, 170.66666666666666, 192, 213.33333333333334,
  234.66666666666666, 256, 277.3333333333333, 298.6666666666667, 320,
  341.3333333333333, 384, 426.6666666666667, 512,
];

/**
 * Converts a value from a specified unit to points (pt).
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number} The converted value in points. Returns -1 if the unit is not supported.
 */
export const toPoints: Converter = {
  convert: (from: Unit, input: number): number => {
    if (input < 0) return -1;

    const pxToPts = (px: number): number => {
      return px * (DPI / 72);
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
        return roundToDecimal((input * FONT_SIZE) / 12, 4);
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
   * The `render` function converts a converted value in rems to a
   * string representation.
   *
   * @param {number} conversion - The converted value in rems.
   * @returns {string} - A string representation of the converted value, or
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion < 0) return "N/A";

    const str = conversion.toString();
    return str.length < 8 ? str : str.slice(0, 6) + "..";
  },
};
