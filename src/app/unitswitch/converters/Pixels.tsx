import { useEffect } from "react";
import { Unit } from "@/types/units";
import UnitWrapper from "@/unit_wrapper";
import { Converter, DPI, FONT_SIZE } from "@/converters/index";
import { roundToDecimal } from "@/shared/round_number";

/**
 * Pixels Component
 *
 * This component converts a value from one unit of measurement to pixels, and allows
 * users to copy the result to the clipboard using a specified hotkey combination.
 *
 * @param {object} props - The component's properties.
 * @param {number} props.input - The input value to be converted to pixels.
 * @param {Unit} props.from - The unit of measurement to convert from (defined as an enum 'Unit').
 * @param {string} props.hotkey - The hotkey combination to trigger clipboard copying.
 * @returns {JSX.Element} - A React JSX element that displays the converted value.
 */
export default function Pixels({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toPixels.convert(from, input);

  const pixelHotkeyHandler = (e: KeyboardEvent) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result >= 0 ? result.toFixed(0) : "N/A");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", pixelHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", pixelHotkeyHandler);
    };
  });

  return (
    <UnitWrapper
      base={Unit.Pixels}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      callback={toPixels}
    >
      <div className="font-space text-app-black">
        Based on a resolution of <span className="font-bold">{DPI} DPI</span>
      </div>
    </UnitWrapper>
  );
}

/**
 * Spacing values for the Bootstrap CSS framework.
 *
 * This array maps index values to spacing values used in Bootstrap CSS classes.
 * For example, `bootstrap[1]` corresponds to `p-1`, which adds padding of 4 pixels.
 */
const bootstrap = [0, 4, 8, 16, 24, 48];

interface TW {
  [key: number]: number;
}

/**
 * Pixel equivalent values for Tailwind CSS spacing and sizing classes.
 *
 * Each key in this object corresponds to a specific size in a Tailwind CSS class name. The
 * values represent the pixel equivalent of that Tailwind size class. For example,
 * `tailwind[4]` corresponds to the 'p-4' Tailwind class, which would correspond to 16 pixels
 * of padding applied to an HTML element.
 */
const tailwind: TW = {
  0: 0,
  0.25: 1, // Corresponds to Tailwind's 'px' size, e.g. `m-px`.
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

/**
 * Converts a value from a specified unit to pixels.
 *
 * @param {Unit} from - The unit to convert from.
 * @param {number} input - The value to convert.
 * @returns {number} The converted value in pixels. Returns -1 if the unit is not supported.
 */
export const toPixels: Converter = {
  convert: (from: Unit, input: number) => {
    switch (from) {
      case Unit.Bootstrap:
        return input >= 0 && input <= bootstrap.length - 1
          ? bootstrap[input]
          : -1;
      case Unit.Centimetres:
        return roundToDecimal(input * (DPI / 2.54), 0);
      case Unit.Ems:
        return roundToDecimal(input * FONT_SIZE, 0);
      case Unit.Feet:
        return roundToDecimal(input * 12 * DPI, 0);
      case Unit.Inches:
        return roundToDecimal(input * DPI, 0);
      case Unit.Millimetres:
        return roundToDecimal(input * (DPI / 25.4), 0);
      case Unit.Picas:
        return roundToDecimal(input * (1 / 6) * DPI, 0);
      case Unit.Pixels:
        return input;
      case Unit.Points:
        return roundToDecimal(input * (DPI / 72), 0);
      case Unit.Rems:
        return input * FONT_SIZE;
      case Unit.Tailwind:
        return input in tailwind ? tailwind[input] : -1;
      default:
        return -1;
    }
  },
};
