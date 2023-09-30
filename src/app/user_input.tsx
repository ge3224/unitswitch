import React, { useRef, useEffect, useState } from "react";
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
export type OnUserSubmit = (value: number, unit: Unit) => void;

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
  callback: OnUserSubmit;
}): JSX.Element {
  const [local, setLocal] = useState<{
    amount: string;
    unit: Unit;
    warn: string;
  }>({
    amount: input.toString(),
    unit: type,
    warn: "",
  });

  const updateLocal = (amount: string, unit: Unit, warn: string): void => {
    setLocal({
      ...local,
      amount,
      unit,
      warn,
    });
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const _amount = e.target.value !== null ? e.target.value : "";
    updateLocal(_amount, local.unit, local.warn);
  };

  const onUnitTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const _unit = e.target.selectedOptions[0].text;
    if (_unit === null || !isUnit(_unit)) {
      return;
    }

    updateLocal(local.amount, _unit as Unit, local.warn);
  };

  const warning = useRef<HTMLDivElement>(null);

  const toggleWarning = (show: boolean): void => {
    if (show) {
      updateLocal(local.amount, local.unit, "Please type number.");
      return;
    }
    updateLocal(local.amount, local.unit, "");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const _amount = parseFloat(local.amount);
    const invalid = Number.isNaN(_amount);

    toggleWarning(invalid);

    if (!invalid) {
      callback(_amount, local.unit);
    }
  };

  useEffect(() => {
    const _amount = parseFloat(local.amount);
    if (Number.isNaN(_amount)) return;
    if (_amount !== input || type !== local.unit) {
      updateLocal(input.toString(), type, local.warn);
    }
  }, [input, type]);

  return (
    <div className="relative flex flex-col border-b border-app-green-600 px-12 py-8 lg:col-span-2 lg:row-span-2 lg:flex-row lg:justify-center lg:border">
      {/* Brandmark: logo & title */}
      <div className="flex items-center justify-center">
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
        <h1
          className={"ml-1 text-3xl sm:text-4xl font-bold text-app-black"}
          style={space.style}
        >
          UnitSwitch
        </h1>
      </div>
      {/* Input and select elements */}
      <div className="flex max-w-sm flex-col justify-center mt-6 lg:mt-0 mx-auto md:w-96 lg:ml-10">
        <form
          className="grid grid-cols-5 items-center gap-2"
          onSubmit={onSubmit}
        >
          <fieldset className="col-span-3">
            <label className="text-sm" htmlFor="unit_amount">
              Amount:
            </label>
            <input
              className="focus:ring-app-teal-500 w-full rounded-sm border border-app-green-600 bg-app-green-100 px-1.5 py-1 font-bold text-app-green-500 focus:outline-none focus:ring"
              id="unit_amount"
              type="text"
              onChange={onAmountChange}
              value={local.amount}
              aria-label="Amount"
              aria-describedby="amount-error"
            />
          </fieldset>
          <fieldset className="col-span-2">
            <label className="col-span-2 text-sm" htmlFor="unit_select">
              Unit:
            </label>
            <select
              className="focus:ring-app-teal-500 w-full rounded-sm border border-app-green-600 bg-app-gray-50 px-0.5 py-1 text-app-black focus:outline-none focus:ring"
              data-testid="unit-type"
              id="unit_select"
              name="units"
              onChange={onUnitTypeChange}
              value={local.unit}
              aria-label="Unit"
            >
              {Object.values(Unit).map((unit, index) => (
                <option key={index} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </fieldset>
          <fieldset className="col-span-5">
            <input
              className="focus:ring-app-green-200 w-1/3 cursor-pointer rounded-sm bg-app-black p-1 font-bold text-white transition delay-150 duration-300 ease-in-out shadow hover:bg-app-green-500 hover:bg-none focus:outline-none focus:ring active:bg-cyan-800 active:transition-none"
              type="submit"
              value="Convert"
            />
          </fieldset>
          <div
            ref={warning}
            className="col-span-5 mb-0 mt-1 h-4 text-xs text-pink-500"
            id="amount-error"
          >
            {local.warn}
          </div>
        </form>
      </div>
      <div
        className="absolute bottom-4 right-4 flex h-fit w-fit cursor-default items-center rounded-sm border border-app-gray-200 py-0.5 pl-0.5 pr-1 text-xs text-app-gray-200 hover:border-app-green-400 hover:text-app-green-400"
        title="Press Ctrl-K for quick keyboard conversions."
      >
        Ctrl-K
      </div>
    </div>
  );
}
