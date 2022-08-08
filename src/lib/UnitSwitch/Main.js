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

  // leaderKey is a custom mod key that is used in combination with a
  // designated "hotkey" to initiate an app action.
  const leaderKey = " ";

  return (
    <div className="m-2 lg:mx-auto max-w-screen-xl bg-green-50 border border-green-600 rounded-lg pb-4 lg:grid lg:grid-cols-3 lg:gap-5 lg:border-none lg:p-12">
      <UserInput
        initialNum={data.value}
        initialUnit={data.unit}
        onEnter={onUserInput}
        keymap={{ leader: leaderKey, input: "/", select: "s" }}
      />
      <Pixels
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "p" }}
      />
      <Rems
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "r" }}
      />
      <Ems
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "e" }}
      />
      <Tailwind
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "t" }}
      />
      <Bootstrap
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "b" }}
      />
      <Golden
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "o" }}
      />
      <Root2
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "2" }}
      />
      <WideScreen
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "w" }}
      />
      <Millimetres
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "m" }}
      />
      <Centimetres
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "c" }}
      />
      <Points
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "o" }}
      />
      <Inches
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "i" }}
      />
      <Feet
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "f" }}
      />
      <Picas
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "a" }}
      />
    </div >
  );
}
