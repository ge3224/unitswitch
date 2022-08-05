import "../public/css/app.css";
import Bootstrap from "./components/Bootstrap";
import Centimetres from "./components/Centimetres";
import Ems from "./components/Ems";
import Feet from "./components/Feet";
import Golden from "./components/Golden";
import Inches from "./components/Inches";
import Millimetres from "./components/Millimetres";
import Picas from "./components/Picas";
import Pixels from "./components/Pixels";
import Points from "./components/Points";
import Rems from "./components/Rems";
import Root2 from "./components/Root2";
import Tailwind from "./components/Tailwind";
import UserInput from "./components/UserInput";
import WideScreen from "./components/WideScreen";
import { units } from "./components/Units";
import { useEffect, useState } from "react";

// Cunits is a single-page app that displays conversions from one unit of
// measurement to other frequently-used units, as well as some aspect ratios.
// The converted values can be individually copied to the clipboard by means
// of keyboard shortcuts. 
export default function CUnits() {
  const STORAGE_KEY = "cunits";

  const [data, setData] = useState(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data === null || data === undefined || data === void 0) {
      return { value: 1, unit: units.Pixels }
    }
    return data
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: data.value, unit: data.unit }));
  })

  const onUserInput = (value, unit) => {
    setData({ value: value, unit: unit });
  }

  // leaderKey is a custom mod key that is used in combination with a
  // designated "hotkey" to initiate an app action.
  const leaderKey = " ";

  return (
    <div className="m-2 bg-green-50 border border-green-600 rounded-lg pb-4">
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
      <Inches
        input={data.value}
        target={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "i" }}
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
      <Points
        input={data.value}
        taret={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "o" }}
      />
    </div >
  );
}


