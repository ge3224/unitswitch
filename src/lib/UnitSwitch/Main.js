import "../../../public/css/app.css";
import Bootstrap from "./Bootstrap";
import Centimetres from "./Centimetres";
import Ems from "./Ems";
import Feet from "./Feet";
import Golden from "./Golden";
import Inches from "./Inches";
import Millimetres from "./Millimetres";
import Picas from "./Picas";
import Pixels from "./Pixels";
import Points from "./Points";
import Rems from "./Rems";
import Root2 from "./Root2";
import Tailwind from "./Tailwind";
import UserInput from "./UserInput";
import WideScreen from "./WideScreen";
import Modal from "./Modal";
import { units } from "./units";
import { useEffect, useState } from "react";

// Cunits is a single-page app that displays conversions from one unit of
// measurement to other frequently-used units, as well as some aspect ratios.
// The converted values can be individually copied to the clipboard by means
// of keyboard shortcuts. 
export default function UnitSwitch() {
  const STORAGE_KEY = "cunits";

  const [data, setData] = useState(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data === null || data === undefined || data === void 0) {
      return {
        value: 1,
        unit: units.Pixels,
        lineup: [],
      }
    }
    return data
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: data.value, unit: data.unit, lineup: data.lineup }));
  })

  const onUserInput = (value, unit) => {
    setData({ value: value, unit: unit });
  }

  return (
    <div className="m-2 lg:mx-auto max-w-screen-xl bg-green-50 border border-green-600 rounded-lg pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <UserInput
        num={data.value}
        target={data.unit}
        callback={onUserInput}
      />
      <Pixels
        input={data.value}
        target={data.unit}
        hotkey={"p"}
      />
      <Rems
        input={data.value}
        target={data.unit}
        hotkey={"r"}
      />
      <Ems
        input={data.value}
        target={data.unit}
        hotkey={"e"}
      />
      <Tailwind
        input={data.value}
        target={data.unit}
        hotkey={"1"}
      />
      <Bootstrap
        input={data.value}
        target={data.unit}
        hotkey={"b"}
      />
      <Golden
        input={data.value}
        target={data.unit}
        hotkey={"g"}
      />
      <Root2
        input={data.value}
        target={data.unit}
        hotkey={"2"}
      />
      <WideScreen
        input={data.value}
        target={data.unit}
        hotkey={"9"}
      />
      <Millimetres
        input={data.value}
        target={data.unit}
        hotkey={"m"}
      />
      <Centimetres
        input={data.value}
        target={data.unit}
        hotkey={"c"}
      />
      <Points
        input={data.value}
        target={data.unit}
        hotkey={"o"}
      />
      <Inches
        input={data.value}
        target={data.unit}
        hotkey={"i"}
      />
      <Feet
        input={data.value}
        target={data.unit}
        hotkey={"'"}
      />
      <Picas
        input={data.value}
        target={data.unit}
        hotkey={"6"}
      />
      <Modal
        initialUnit={data.unit}
        callback={onUserInput}
        hotkey={"k"}
      />
    </div>
  );
}
