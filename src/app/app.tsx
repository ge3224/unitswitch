/**
 * UnitSwitch
 *
 * @description
 * UnitSwitch is a single-page web application for quickly converting and comparing units of
 * measurement. It provides a user-friendly and efficient way to switch between various
 * units of measurement, such as pixels, ems, rems, inches, centimeters, and more. This project is
 * a handy tool for anyone working on web design or development, as it displays several frequently
 * used units of measurement on one page.
 *
 * @summary
 * Key Features:
 * 1. Convenient Unit Conversion
 * 2. User-Friendly Interface
 * 3. Keyboard Shortcuts
 * 4. Responsive Design
 *
 * Getting Started:
 * - To use UnitSwitch, users can access it through their web browser, either locally or via a
 *   hosted version. See {https://unitswitch.vercel.app/}. The application offers a straightforward and
 *   intuitive interface, making it accessible to both beginners and experienced professionals.
 *
 * Usage:
 * - They can then choose the specific unit from a dropdown menu.
 * - Entering a value in the provided input field triggers real-time conversions.
 * - Built-in keyboard shortcuts are available for faster unit switching and value input.
 * - Users can easily copy the converted values as needed for their design or development work.
 *
 * Technologies Used:
 * - React.js
 * - Tailwind CSS
 * - Webpack
 * - SWC (JavaScript/ECMAScript Compiler)
 *
 * Author:
 * UnitSwitch is maintained by Jacob Benison {https://jacobbenison.com/}. Jacob is the
 * primary contributor to the project and welcomes feedback and contributions from the
 * open-source community.
 *
 * License:
 * UnitSwitch is released under the MIT License, providing users with the freedom to use and modify
 * the application according to their needs.
 *
 * @see {@link https://github.com/ge3224/unitswitch} - Link to the UnitSwitch GitHub repository.
 */

import { useEffect, useState } from "react";
import { Unit, isUnit } from "@/units";
import UserInput, { UserInputCallback } from "@/user_input";
import {
  Bootstrap,
  Centimetres,
  Ems,
  Inches,
  Picas,
  Pixels,
  Points,
  Rems,
  RootTwo,
  SixteenNine,
  Tailwind,
} from "@/converters";
import Modal from "@/modal";
import Millimetres from "./converters/Millimetres";
import Feet from "./converters/Feet";
import GoldenRatio from "./converters/GoldenRatio";

type appData = {
  input: number;
  unit: Unit;
  lineup: any[]; // todo
};

function isAppData(obj: any): obj is appData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.value === "number" &&
    typeof obj.unit === "string" &&
    isUnit(obj.unit) &&
    typeof obj.lineup === "object"
  );
}

export default function UnitSwitch() {
  // Define a constant to store the key used for local storage
  const STORAGE_KEY = "__unitswitch__";

  // Define a state variable 'data' using React's useState hook.
  // The initial value is set using a callback function.
  const [data, setData] = useState<{
    value: number;
    unit: Unit;
    lineup: any[];
  }>(() => {
    // Define a default data object with 'value', 'unit', and 'lineup' properties.
    const _default = {
      value: 1,
      unit: Unit.Pixels,
      lineup: [],
    };

    // Check if the code is running in a browser environment with access to 'localStorage'.
    if (typeof window !== "undefined" && window.localStorage) {
      // Attempt to retrieve data from local storage using the specified key.
      const storedData: string | null = localStorage.getItem(STORAGE_KEY);

      // Check if there is no stored data or if the stored data is not in the expected format.
      if (storedData === null || !isAppData(storedData)) {
        // If no valid data is found in local storage, return the default data.
        return _default;
      }

      return JSON.parse(storedData);
    }

    // If the code is not running in a browser or 'localStorage' is not available,
    // return the default data object.
    return _default;
  });

  // Define a function called 'onUserInput' that takes two parameters:
  // - 'value': a number representing a user input value.
  // - 'unit': a value of type 'Unit' representing the selected unit.
  const callback: UserInputCallback = (value: number, unit: Unit) => {
    setData({ ...data, value, unit });
  };

  // Define a 'useEffect' hook to perform side effects when the component renders.
  useEffect(() => {
    // Check if the code is running in a browser environment with access to 'localStorage'.
    if (typeof window !== "undefined" && window.localStorage) {
      // If it's a browser environment with 'localStorage' support, store data in local storage.
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          value: data.value,
          unit: data.unit,
          lineup: data.lineup,
        }),
      );
    }
  });

  return (
    <div className="rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <UserInput input={data.value} type={data.unit} callback={callback} />
      <Pixels input={data.value} from={data.unit} hotkey={"p"} />
      <Rems input={data.value} from={data.unit} hotkey={"r"} />
      <Ems input={data.value} from={data.unit} hotkey={"3"} />
      <Tailwind input={data.value} from={data.unit} hotkey={"1"} />
      <Bootstrap input={data.value} from={data.unit} hotkey={"b"} />
      <Millimetres input={data.value} from={data.unit} hotkey={"m"} />
      <Centimetres input={data.value} from={data.unit} hotkey={"c"} />
      <Points input={data.value} from={data.unit} hotkey={"o"} />
      <Picas input={data.value} from={data.unit} hotkey={"6"} />
      <Inches input={data.value} from={data.unit} hotkey={"i"} />
      <Feet input={data.value} from={data.unit} hotkey={"f"} />
      <GoldenRatio input={data.value} from={data.unit} hotkey={"g"} />
      <RootTwo input={data.value} from={data.unit} hotkey={"2"} />
      <SixteenNine input={data.value} from={data.unit} hotkey={"9"} />
      <div
        className="col-span-3 flex items-end gap-8 px-3 py-4 sm:items-start lg:p-0"
        data-about="unitswitch-about"
      >
        <div className="text-sm text-slate-700">
          <p className="mb-2">
            UnitSwitch is single-page application that simplifies unit
            conversions for web designers and developers. Conveniently switch
            between various units of measurement, including pixels, ems, rems,
            and more, with an intuitive interface and keyboard shortcuts for
            efficient conversion.
          </p>
          <p>
            <small>
              UnitSwitch is maintained by{" "}
              <a
                className="text-slate-700 underline visited:text-slate-700 hover:text-app-green-500 active:text-app-green-600"
                href="https://jacobbenison.com/"
                target="_blank"
              >
                Jacob Benison
              </a>
              . Feel free to reach out with any questions or feedback.
            </small>
          </p>
        </div>
        <div className="lg:2/3 flex h-fit w-1/4 justify-end text-right text-sm font-bold text-app-gray-200">
          <a
            type="button"
            className="group rounded border border-app-gray-50 bg-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-app-green-200"
            href="https://github.com/ge3224/unitswitch"
            target="_blank"
          >
            <div className="flex w-fit flex-col items-end justify-end pb-1 pl-8 pr-2 pt-2">
              <svg
                className="fill-app-gray-200 transition delay-150 duration-75 ease-in-out group-hover:fill-white"
                height="24"
                aria-hidden="true"
                viewBox="0 0 16 16"
                version="1.1"
                width="32"
                data-view-component="true"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
              <span className="transition delay-150 duration-75 ease-in-out group-hover:scale-100 group-hover:text-white">
                GitHub
              </span>
            </div>
          </a>
        </div>
      </div>
      <Modal type={data.unit} callback={callback} hotkey={"k"} />
    </div>
  );
}
