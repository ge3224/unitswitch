import { useEffect, useState } from "react";
import { Unit, isUnit } from "@/units";
import UserInput from "@/user_input";
import { Bootstrap, Ems, Pixels, Rems, Tailwind } from "@/converters";
import Modal from "@/modal";

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
  const onUserInput = (value: number, unit: Unit) => {
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
      // console.error(
      //   "the code is not running in a browser or 'localStorage' is not available",
      // );
    }
  });

  return (
    <div className="rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <UserInput input={data.value} type={data.unit} callback={onUserInput} />
      <Pixels input={data.value} from={data.unit} hotkey={"p"} />
      <Rems input={data.value} from={data.unit} hotkey={"r"} />
      <Ems input={data.value} from={data.unit} hotkey={"e"} />
      <Tailwind input={data.value} from={data.unit} hotkey={"1"} />
      <Bootstrap input={data.value} from={data.unit} hotkey={"b"} />
      <Modal
        type={data.unit}
        callback={onUserInput}
        hotkey={"k"}
      />
    </div>
  );
}
