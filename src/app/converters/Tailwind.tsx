import { Unit } from "@/units";
import { Converter } from "@/converters";
import { useEffect } from "react";
import Wrapper from "@/converters/Wrapper";
import { interpolateInRange } from "@/shared/arrays";

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
      converter={toTailwind}
    >
      <div className="font-space text-app-black">
        <span className="font-bold">0.25</span> is written "<code>px</code>"
        (e.g. <code>m-px</code>).
      </div>
    </Wrapper>
  );
}

/**
 * An array representing the Tailwind CSS sizes for spacing.
 *
 * This array maps the index to the corresponding Tailwind CSS size value. For
 * example, the value of `twSizes[4]`, 1, corresponds to the 'p-1' Tailwind
 * utility class.
 */
export const tailwindSizes = [
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
        const bs = [0, 1, 2, 4, 6, 12];
        return input >= 0 && input <= bs.length - 1
          ? bs[input]
          : -1;
      case Unit.Centimetres:
        return interpolateInRange(input, tailwindSizes, 0, 10.15999872);
      case Unit.Ems:
        return interpolateInRange(input, tailwindSizes, 0, 24);
      case Unit.Feet:
        return interpolateInRange(input, tailwindSizes, 0, 0.33333329133858);
      case Unit.Inches:
        return interpolateInRange(input, tailwindSizes, 0, 3.999999496063);
      case Unit.Millimetres:
        return interpolateInRange(input, tailwindSizes, 0, 101.5999872);
      case Unit.Picas:
        return interpolateInRange(input, tailwindSizes, 0, 23.999996995276);
      case Unit.Pixels:
        return interpolateInRange(input, tailwindSizes, 0, 384);
      case Unit.Points:
        return interpolateInRange(input, tailwindSizes, 0, 287.99978229935);
      case Unit.Rems:
        return interpolateInRange(input, tailwindSizes, 0, 24);
      case Unit.Tailwind:
        const included = tailwindSizes.indexOf(input);
        return included >= 0 ? input : -1;
      default:
        return -1;
    }
  },

  /**
   * The `render` function converts a converted value in Tailwind sizes to a 
   * string representation.
   *
   * @param {number} conversion - The converted value in Tailwind sizes.
   * @returns {string} - A string representation of the converted value, or 
   *                     "N/A" if the conversion is not valid.
   */
  render: (conversion: number): string => {
    if (conversion <= 0) return "N/A";
    if (conversion === 0.25) return "px";

    const str = conversion.toString();
    return str.length < 8
      ? str
      : str.slice(0, 6) + "..";
  }
};
