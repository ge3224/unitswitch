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

// CUnits is a single-page app that displays conversions from one unit of
// measurement to other frequently-used units, as well as some aspect ratios.
// The converted values can be individually copied to the clipboard by means
// of keyboard shortcuts. 
export default function CUnits() {
  const storageKey = "cunits";

  const [val, setVal] = useState(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data.value === null || data.value === undefined || data.value === void 0) {
      return 0
    }
    return data.value;
  });

  const [uni, setUni] = useState(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data.unit === null || data.unit === undefined || data.unit === void 0) {
      return units.Pixels
    }
    return data.unit
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ value: val, unit: uni }));
  })

  const onUserInput = (value, unit) => {
    setVal(value)
    setUni(unit)
  }

  // leaderKey is a custom mod key that is used in combination with a
  // designated "hotkey" to initiate an app action.
  const leaderKey = " ";

  return (
    <div>
      <UserInput
        initialNum={val}
        initialUnit={uni}
        onEnter={onUserInput}
        keymap={{ leader: leaderKey, input: "/", select: "s" }}
      />
      <Pixels
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "p" }}
      />
      <Rems
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "r" }}
      />
      <Ems
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "e" }}
      />
      <Tailwind
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "t" }}
      />
      <Bootstrap
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "b" }}
      />
      <Inches
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "i" }}
      />
      <Millimetres
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "m" }}
      />
      <Centimetres
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "c" }}
      />
      <Feet
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "f" }}
      />
      <Picas
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "a" }}
      />
      <Points
        value={val}
        unit={uni}
        keymap={{ leader: leaderKey, toClipboard: "o" }}
      />
      <Golden value={val} />
      <RootTwoRect value={val} />
      <SixteenToNine value={val} />
    </div>
  );
}
