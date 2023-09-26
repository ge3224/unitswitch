import { Unit } from "@/units";
import { Converter } from "@/converters/index";
import { useEffect } from "react";
import Wrapper from "@/converters/Wrapper";
import { propPosInArray } from "@/shared/arrays";

/**
 * Tailwind Component
 *
 * This component converts a value from various units of measurement to general Tailwind sizing
 * and provides a hotkey to copy the converted value to the clipboard.
 *
 * @param {object} props - The component's properties.
 * @param {number} props.input - The input value to be converted.
 * @param {Unit} props.from - The unit of the input value.
 * @param {string} props.hotkey - The hotkey combination to copy the result to the clipboard.
 *
 * @returns {JSX.Element} - A React element representing the Tailwind component.
 */
export default function Tailwind({
  input,
  from,
  hotkey,
}: {
  input: number;
  from: Unit;
  hotkey: string;
}): JSX.Element {
  const result = toTailwind.convert(from, input);

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
      base={Unit.Tailwind}
      input={input}
      from={from}
      hotkey={"ctrl+" + hotkey}
      callback={toTailwind}
    >
      <div className="font-space text-app-black">
        <span className="font-bold">0.25</span> is written "<code>px</code>"
        (e.g. <code>m-px</code>).
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
const bootstrap = [0, 1, 2, 4, 6, 12];

/**
 * An array representing the Tailwind CSS sizes for spacing.
 *
 * This array maps the index to the corresponding Tailwind CSS size value. For
 * example, the value of `twSizes[4]`, 1, corresponds to the 'p-1' Tailwind
 * utility class.
 */
const twSizes = [
  0, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16,
  20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96,
];

/**
 * toTailwind Converter
 *
 * This object provides conversion functions from various unit systems to Tailwind.
 */
export const toTailwind: Converter = {
  convert: (from: Unit, input: number) => {
    switch (from) {
      case Unit.Bootstrap:
        return input >= 0 && input <= bootstrap.length - 1
          ? bootstrap[input]
          : -1;
      case Unit.Centimetres:
        return propPosInArray(input, twSizes, 0, 10.15999872);
      case Unit.Ems:
        return propPosInArray(input, twSizes, 0, 24);
      case Unit.Feet:
        return propPosInArray(input, twSizes, 0, 0.33333329133858);
      case Unit.Inches:
        return propPosInArray(input, twSizes, 0, 3.999999496063);
      case Unit.Millimetres:
        return propPosInArray(input, twSizes, 0, 101.5999872);
      case Unit.Picas:
        return propPosInArray(input, twSizes, 0, 23.999996995276);
      case Unit.Pixels:
        return propPosInArray(input, twSizes, 0, 384);
      case Unit.Points:
        return propPosInArray(input, twSizes, 0, 287.99978229935);
      case Unit.Rems:
        return propPosInArray(input, twSizes, 0, 24);
      case Unit.Tailwind:
        const included = twSizes.indexOf(input);
        return included >= 0 ? input : -1;
      default:
        return -1;
    }
  },
};
