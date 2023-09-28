import React, { useRef, useEffect } from "react";
import { Unit, isUnit } from "@/units";
import { Space_Grotesk } from "next/font/google";

const space = Space_Grotesk({ subsets: ["latin"] });

/**
 * Callback function signature for the UserInput component.
 * It takes a value and a unit as parameters and returns void.
 *
 * @param value - The numerical input value.
 * @param unit - The unit of measurement for the input value.
 * @returns void
 */
export type UserInputCallback = (value: number, unit: Unit) => void;

/**
 * UserInput is a React component that provides an input field for numeric values and a dropdown select for units.
 *
 * @param {object} props - The component's props.
 * @param {number} props.input - The numeric input value.
 * @param {Unit} props.type - The selected unit type.
 * @param {Function} props.callback - A callback function to handle changes in input and unit selection.
 * @returns {JSX.Element} - A React element representing the UserInput component.
 */
export default function UserInput({
  input,
  type,
  callback,
}: {
  input: number;
  type: Unit;
  callback: UserInputCallback;
}): JSX.Element {
  // Refs for the input and select elements
  const textInput: React.RefObject<HTMLInputElement> = useRef(null);

  const selectInput = useRef<HTMLSelectElement>(null);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target instanceof HTMLInputElement) {
      if (Number.isNaN(parseFloat(e.target.value))) return;

      const num = parseFloat(e.target.value);

      if (num < 0) return;

      callback(num, type);
    } else if (e.target instanceof HTMLSelectElement) {
      const selectedOptionText = e.target.selectedOptions[0]?.text;
      if (selectedOptionText && isUnit(selectedOptionText)) {
        callback(input, selectedOptionText as Unit);
      }
    }
  };

  // Focus on the input element when the component mounts
  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  }, []);

  return (
    <div className="flex flex-col border-b border-app-green-600 px-10 pb-8 pt-11 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border">
      {/* Header with a logo and title */}
      <div className="mb-6 flex items-center justify-center lg:mb-0 lg:ml-6">
        {/* SVG path elements for the logo */}
        <svg
          width="67"
          height="46"
          viewBox="0 0 67 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161"
            fill="#4EBD85"
          />
          <path
            d="M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161"
            stroke="#003641"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M10.0527 32.216L43.4719 14.1078L41.9617 1L65.2671 23.2891L41.9617 44.8241L43.4719 31.4604L10.0527 32.216Z"
            fill="#CFF9B9"
            stroke="#003641"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className={"ml-1 text-4xl font-bold text-app-black"} style={space.style}>
          UnitSwitch
        </h1>
      </div>
      {/* Input and select elements */}
      <div className="flex max-w-sm flex-col justify-center md:mx-auto md:w-96 lg:ml-12">
        <div className="mb-2">
          {/* Numeric input field */}
          <input
            className="border-app-green-600 text-app-green-500 focus:ring-app-teal-500 w-full rounded-sm border bg-app-green-100 px-1.5 py-1 font-bold focus:outline-none focus:ring"
            type="number"
            value={input}
            ref={textInput}
            onChange={onChangeHandler}
          />
        </div>
        <div>
          {/* Unit selection dropdown */}
          <select
            className="border-app-green-600 text-app-black focus:ring-app-teal-500 rounded-sm border bg-app-gray-50 px-0.5 py-1 focus:outline-none focus:ring"
            name="units"
            value={type}
            ref={selectInput}
            onChange={onChangeHandler}
            data-testid="unit-type"
          >
            {/* Generate unit options */}
            {Object.values(Unit).map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 hidden text-app-gray-200 lg:block">
          {/* Shortcut information */}
          <small>
            <code>ctrl+k</code>
          </small>
        </div>
      </div>
    </div>
  );
}
