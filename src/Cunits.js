import { useEffect, useState } from "react";
import { units } from "./components/Units";
import Unit from "./components/Unit";
import UserInput from "./components/UserInput";
import Inches from "./components/Inches";
import PixelDetails from "./components/Pixels";
import RemsDetails from "./components/Rems";
import EmsDetails from "./components/Ems";
import TailwindDetails from "./components/Tailwind";
import BootstrapDetails from "./components/Bootstrap";
import Millimetres from "./components/Millimetres";
import Centimetres from "./components/Centimetres";
import Feet from "./components/Feet";
import Picas from "./components/Picas";
import Points from "./components/Points";
import GoldenDetails, { goldenLonger } from "./components/Golden";
import Root2Details, { root2Longer } from "./components/Root2";
import Sixteen2NineDetails, { sixteenToNineLonger } from "./components/SixteenToNine";
import Ratio from "./components/Ratio";
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
      <Unit
        baseUnit={units.Pixels}
        keymap={{ leader: leaderKey, toClipboard: "p" }}
        input={data.value}
        target={data.unit}
        decimal={false}
      >
        <PixelDetails />
      </Unit>
      <Unit
        baseUnit={units.Rems}
        keymap={{ leader: leaderKey, toClipboard: "r" }}
        input={data.value}
        target={data.unit}
      >
        <RemsDetails />
      </Unit>
      <Unit
        baseUnit={units.Ems}
        keymap={{ leader: leaderKey, toClipboard: "e" }}
        input={data.value}
        target={data.unit}
      >
        <EmsDetails />
      </Unit>
      <Unit
        baseUnit={units.Tailwind}
        keymap={{ leader: leaderKey, toClipboard: "t" }}
        input={data.value}
        target={data.unit}
        decimal={false}
      >
        <TailwindDetails input={data.value} target={data.unit} />
      </Unit>
      <Unit
        baseUnit={units.Bootstrap}
        keymap={{ leader: leaderKey, toClipboard: "b" }}
        input={data.value}
        target={data.unit}
        decimal={false}
      >
        <BootstrapDetails input={data.value} target={data.unit} />
      </Unit>
      <Ratio
        base="Golden Ratio"
        keymap={{ leader: leaderKey, toClipboard: "o" }}
        input={data.value}
        target={data.unit}
        callback={(input) => goldenLonger(input)}
      >
        <GoldenDetails input={data.value} />
      </Ratio>
      <Ratio
        base="Root 2 (A4)"
        keymap={{ leader: leaderKey, toClipboard: "o" }}
        input={data.value}
        target={data.unit}
        callback={(input) => root2Longer(input)}
      >
        <Root2Details input={data.value} />
      </Ratio>
      <Ratio
        base="16:9 Aspect Ratio"
        keymap={{ leader: leaderKey, toClipboard: "o" }}
        input={data.value}
        target={data.unit}
        callback={(input) => sixteenToNineLonger(input)}
      >
        <Sixteen2NineDetails input={data.value} />
      </Ratio>
      <Unit
        baseUnit={units.Inches}
        keymap={{ leader: leaderKey, toClipboard: "i" }}
        input={data.value}
        target={data.unit}
      />
      <Unit
        baseUnit={units.Millimetres}
        keymap={{ leader: leaderKey, toClipboard: "m" }}
        input={data.value}
        target={data.unit}
      />
      <Unit
        baseUnit={units.Centimetres}
        keymap={{ leader: leaderKey, toClipboard: "c" }}
        input={data.value}
        target={data.unit}
      />
      <Unit
        baseUnit={units.Feet}
        keymap={{ leader: leaderKey, toClipboard: "f" }}
        input={data.value}
        target={data.unit}
      />
      <Unit
        baseUnit={units.Picas}
        keymap={{ leader: leaderKey, toClipboard: "a" }}
        input={data.value}
        target={data.unit}
      />
      <Unit
        baseUnit={units.Points}
        keymap={{ leader: leaderKey, toClipboard: "o" }}
        input={data.value}
        target={data.unit}
      />
    </div >
  );
}


