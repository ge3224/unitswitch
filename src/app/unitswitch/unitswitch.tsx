import { useEffect, useState } from "react";
import { Unit, isUnit } from "./units";
import UserInput from "./user_input";

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
  const STORAGE_KEY = "__unitswitch__";

  const [data, setData] = useState<{
    value: number;
    unit: Unit;
    lineup: any[];
  }>(() => {
    const _default = {
      value: 1,
      unit: Unit.Pixels,
      lineup: [],
    };

    const storedData: string | null = localStorage.getItem(STORAGE_KEY);

    if (storedData === null || !isAppData(storedData)) {
      return _default;
    }

    return JSON.parse(storedData);
  });

  const onUserInput = (value: number, unit: Unit) => {
    setData({ ...data, value, unit });
  };

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        value: data.value,
        unit: data.unit,
        lineup: data.lineup,
      }),
    );
  });

  return (
    <div className="rounded-lg border border-app-green-600 bg-app-green-50 pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <UserInput
        input={data.value}
        type={data.unit}
        callback={onUserInput}
      />
    </div>
  );
}
