import { useState } from "react";
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

export default function App() {

  // leaderKey is a custom mod key that is used in combination with a
  // designated "hotkey" to initiate an app action.
  const leaderKey = " ";

  const [val, setVal] = useState(0)
  const [uni, setUni] = useState(units.Pixels)

  const onUserInput = (value, unit) => {
    setVal(value)
    setUni(unit)
  }

  return (
    <div>
      <UserInput
        units={Object.keys(units)}
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
    </div>
  );
}
