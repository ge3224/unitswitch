import { useEffect, useState } from "react";
import { units } from "./components/Units";
import UserInput from "./components/UserInput";
import Inches from "./components/Inches";
import Pixels from "./components/Pixels";
import Rems from "./components/Rems";
import Ems from "./components/Ems";
import Tailwind from "./components/Tailwind";
import Bootstrap from "./components/Bootstrap";
import Millimetres from "./components/Millimetres";
import Centimetres from "./components/Centimetres";
import Feet from "./components/Feet";
import Picas from "./components/Picas";
import Points from "./components/Points";
import Golden from "./components/Golden";
import RootTwoRect from "./components/RootTwoRect";
import SixteenToNine from "./components/SixteenToNine";
import "../public/css/app.css";

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
    setData({value: value, unit: unit});
  }

  // leaderKey is a custom mod key that is used in combination with a
  // designated "hotkey" to initiate an app action.
  const leaderKey = " ";

  return (
    <div>
      <UserInput
        initialNum={data.value}
        initialUnit={data.unit}
        onEnter={onUserInput}
        keymap={{ leader: leaderKey, input: "/", select: "s" }}
      />
      <Pixels
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "p" }}
      />
      <Rems
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "r" }}
      />
      <Ems
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "e" }}
      />
      <Tailwind
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "t" }}
      />
      <Bootstrap
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "b" }}
      />
      <Inches
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "i" }}
      />
      <Millimetres
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "m" }}
      />
      <Centimetres
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "c" }}
      />
      <Feet
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "f" }}
      />
      <Picas
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "a" }}
      />
      <Points
        value={data.value}
        unit={data.unit}
        keymap={{ leader: leaderKey, toClipboard: "o" }}
      />
      <Golden value={data.value} />
      <RootTwoRect value={data.value} />
      <SixteenToNine value={data.value} />
    </div>
  );
}
