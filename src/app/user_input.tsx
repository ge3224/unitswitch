import React, { useRef, useEffect } from "react";
import { Unit } from "@/units";

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
  callback: Function;
}): JSX.Element {
  // Refs for the input and select elements
  const textInput: React.RefObject<HTMLInputElement> = useRef(null);
  const selectInput = useRef<HTMLSelectElement>(null);

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
        <h1 className="font-space text-black-usw ml-1 text-4xl font-bold">
          UnitSwitch
        </h1>
      </div>
      {/* Input and select elements */}
      <div className="flex max-w-sm flex-col justify-center md:mx-auto md:w-96 lg:ml-12">
        <div className="mb-2">
          {/* Numeric input field */}
          <input
            className="bg-green-usw-100 border-green-usw-600 font-space-code text-green-usw-500 focus:ring-teal-usw-500 w-full rounded-sm border px-1.5 py-1 font-bold focus:outline-none focus:ring"
            type="number"
            value={input}
            ref={textInput}
            onChange={(e) => {
              e.preventDefault();
              const inputValue = textInput.current?.value;
              if (inputValue !== null && inputValue !== undefined) {
                const selectedOptionText =
                  selectInput.current?.selectedOptions[0]?.text;
                if (
                  selectedOptionText !== null &&
                  selectedOptionText !== undefined
                ) {
                  callback(inputValue, selectedOptionText);
                }
              }
            }}
          />
        </div>
        <div>
          {/* Unit selection dropdown */}
          <select
            className="bg-gray-usw-50 border-green-usw-600 font-space text-black-usw focus:ring-teal-usw-500 rounded-sm border px-0.5 py-1 focus:outline-none focus:ring"
            name="units"
            value={type}
            ref={selectInput}
            onChange={(e) => {
              e.preventDefault();
              const inputValue = textInput.current?.value;
              if (inputValue !== null && inputValue !== undefined) {
                const selectedOptionText =
                  selectInput.current?.selectedOptions[0]?.text;
                if (
                  selectedOptionText !== null &&
                  selectedOptionText !== undefined
                ) {
                  callback(inputValue, selectedOptionText);
                }
              }
            }}
          >
            {/* Generate unit options */}
            {Object.values(Unit).map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
        <div className="font-space-code text-gray-usw-200 mt-1 hidden lg:block">
          {/* Shortcut information */}
          <small>
            <code>ctrl+k</code>
          </small>
        </div>
      </div>
    </div>
  );
}
