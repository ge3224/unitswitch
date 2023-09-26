import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from "@/converters/index";
import { roundToDecimal } from "@/shared/round_number";
import { useEffect } from "react";
import Wrapper from "@/converters/Wrapper";

/**
 * Ems Component
 *
 * This component converts a value from various CSS unit systems to Ems
 * and provides a hotkey to copy the converted value to the clipboard.
 *
 * @param {object} props - The component's properties.
 * @param {number} props.input - The input value to be converted.
 * @param {Unit} props.from - The unit of the input value.
 * @param {string} props.hotkey - The hotkey combination to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - A React element representing the Ems component.
 */
export default function Ems({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toEms.convert(from, input);

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
      base={Unit.Ems}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      callback={toEms}
    >
      <div className="font-space text-app-black">
        Based on a root font size of{" "}
        <span className="font-bold">{FONT_SIZE}px</span>
      </div>
    </Wrapper>
  );
}

/**
 * Spacing values for the Bootstrap CSS framework.
 *
 * This array maps index values to spacing values used in Bootstrap CSS classes.
 * For example, `bootstrap[1]` corresponds to `p-1`, which adds padding of 0.25em.
 */
const bootstrap = [0, 0.25, 0.5, 1, 1.5, 3];

/**
 * Em equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this object corresponds to a specific size in a Tailwind CSS class name. The
 * values represent the pixel equivalent of that Tailwind size class. For example,
 * `tailwind[4]` corresponds to the 'p-4' Tailwind class, which would correspond to 1em
 * of padding applied to an HTML element.
 */
const tailwind: {
  [key: number]: number;
} = {
  0: 0,
  0.25: 0.063, // Corresponds to Tailwind's 'px' size, e.g. `m-px`.
  0.5: 0.125,
  1: 0.25,
  1.5: 0.375,
  2: 0.5,
  2.5: 0.625,
  3: 0.75,
  3.5: 0.875,
  4: 1,
  5: 1.25,
  6: 1.5,
  7: 1.75,
  8: 2,
  9: 2.25,
  10: 2.5,
  11: 2.75,
  12: 3,
  14: 3.5,
  16: 4,
  20: 5,
  24: 6,
  28: 7,
  32: 8,
  36: 9,
  40: 10,
  44: 11,
  48: 12,
  52: 13,
  56: 14,
  60: 15,
  64: 16,
  72: 18,
  80: 20,
  96: 24,
};

/**
 * toEms Converter
 *
 * This object provides conversion functions from various unit systems to Ems.
 */
export const toEms: Converter = {
  convert: (from: Unit, input: number) => {
    switch (from) {
      case Unit.Bootstrap:
        return input >= 0 && input <= bootstrap.length - 1
          ? bootstrap[input]
          : -1;
      case Unit.Centimetres:
        return roundToDecimal(((input * 0.3937008) * DPI) / FONT_SIZE, 3);
      case Unit.Ems:
        return roundToDecimal(input, 3);
      case Unit.Feet:
        return roundToDecimal(((input * 12) * DPI) / FONT_SIZE, 3);
      case Unit.Inches:
        return roundToDecimal((input * DPI) / FONT_SIZE, 3);
      case Unit.Millimetres:
        return roundToDecimal((DPI / 25.4 / FONT_SIZE) * input, 3);
      case Unit.Picas:
        return roundToDecimal((DPI / 6 / FONT_SIZE) * input, 3);
      case Unit.Pixels:
        return roundToDecimal(input / FONT_SIZE, 3);
      case Unit.Points:
        return roundToDecimal((input / 72) * (DPI / FONT_SIZE), 3);
      case Unit.Rems:
        return roundToDecimal(input, 3);
      case Unit.Tailwind:
        return input in tailwind ? tailwind[input] : -1;
      default:
        return -1;
    }
  },
};
