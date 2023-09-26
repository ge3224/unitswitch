import { Unit } from "@/units";
import { Converter, DPI, FONT_SIZE } from "@/converters/index";
import { roundToDecimal } from "@/shared/round_number";
import { useEffect } from "react";
import UnitWrapper from "@/converters/wrapper";

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
    <UnitWrapper
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
    </UnitWrapper>
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
 * Converts a given size in some units units to the corresponding Tailwind CSS size.
 *
 * @param {number} input - The size in given units to be converted.
 * @returns {number} - The corresponding Tailwind CSS size, or -1 if not found.
 */
function fromRange(input: number, last: number): number {
  // Define the range of sizes in em units and their corresponding Tailwind CSS sizes
  const rangeIn = [0, last];
  const rangeOut = [0, 96];

  // Check if the input size is within the range of em units
  if (input >= rangeIn[0] && input <= rangeIn[1]) {
    // Calculate the corresponding Tailwind CSS size using linear interpolation
    const proportion = (input - rangeIn[0]) / (rangeIn[1] - rangeIn[0]);
    const result = roundToDecimal(
      rangeOut[0] + proportion * (rangeOut[1] - rangeOut[0]),
      2, // Round to 2 decimal places
    );

    // Check if the result is a valid Tailwind CSS size
    return twSizes.includes(result) ? result : -1;
  } else {
    // Handle the case where the input size is outside the range
    return -1;
  }
}

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
        return fromRange(input, 10.15999872);
      case Unit.Ems:
        return fromRange(input, 24);
      case Unit.Feet:
        return fromRange(input, 0.33333329133858);
      case Unit.Inches:
        return fromRange(input, 3.999999496063);
      case Unit.Millimetres:
        return fromRange(input, 101.5999872);
      case Unit.Picas:
        return fromRange(input, 23.999996995276);
      case Unit.Pixels:
        return fromRange(input, 384);
      case Unit.Points:
        return fromRange(input, 287.99978229935);
      case Unit.Rems:
        return fromRange(input, 24);
      case Unit.Tailwind:
        return input;
      default:
        return -1;
    }
  },
};
