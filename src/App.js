import { useState } from "react";
import { useKeyMappings } from "./components/useCustomMapping";
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

// leaderKey is a custom mod key that initiates app actions; it is equivalent
// to pressing "ctrl", "alt", "shift", and "meta" all at once. See
// ./components/useModifiedKeypress.js
const leaderKey = " "; // set to space

// actions contains valid operations that can be done by this app using a
// keyboard shortcut.
const actions = {
  select: "select", // selects which option to convert from
  copy: "copy", // copies a specific converted value
  input: "input", // sets input field to focused
}

// keyBindings is a map of hotkeys
const keyBindings = new Map([
  ["P", { unit: units.Pixels, action: actions.select }],
  ["p", { unit: units.Pixels, action: actions.copy }],
  ["R", { unit: units.Rems, action: actions.select }],
  ["r", { unit: units.Rems, action: actions.copy }],
  ["E", { unit: units.Ems, action: actions.select }],
  ["e", { unit: units.Ems, action: actions.copy }],
  ["T", { unit: units.Tailwind, action: actions.select }],
  ["t", { unit: units.Tailwind, action: actions.copy }],
  ["B", { unit: units.Bootstrap, action: actions.select }],
  ["b", { unit: units.Bootstrap, action: actions.copy }],
  ["I", { unit: units.Inches, action: actions.select }],
  ["i", { unit: units.Inches, action: actions.copy }],
  ["M", { unit: units.Millimetres, action: actions.select }],
  ["m", { unit: units.Millimetres, action: actions.copy }],
  ["C", { unit: units.Centimetres, action: actions.select }],
  ["c", { unit: units.Centimetres, action: actions.copy }],
  ["F", { unit: units.Feet, action: actions.select }],
  ["f", { unit: units.Feet, action: actions.copy }],
  ["A", { unit: units.Picas, action: actions.select }],
  ["a", { unit: units.Picas, action: actions.copy }],
  ["O", { unit: units.Points, action: actions.select }],
  ["o", { unit: units.Points, action: actions.copy }],
  ["/", { unit: "/", action: actions.input }],
]);

export default function App() {
  const keyMappings = new Set(keyBindings.keys());
  const [val, setVal] = useState(0)
  const [uni, setUni] = useState(units.Pixels)

  const onUserInput = (value, unit) => {
    setVal(value)
    setUni(unit)
  }

  const onHotkeyPress = (e) => {
    const keymaps = new Set(keyBindings.keys())
    if (keymaps.has(e.key)) {
      const k = keyBindings.get(e.key)
      switch (k.action) {
        case actions.input:
          const inputId = "input";
          const input = document.getElementById(inputId);

          if (
            input === null ||
            input === undefined ||
            input === void 0
          ) {
            console.error(`An element with an ID of '${inputId}' could not be found.`);
            return
          }

          input.focus();
          break;
        case actions.select:
          const selectId = "units";
          const selectElement = document.getElementById(selectId);

          if (
            selectElement === null ||
            selectElement === undefined ||
            selectElement === void 0
          ) {
            console.error(`An element with an ID of '${selectId}' could not be found.`);
            return
          }

          selectElement.childNodes.forEach(option => {
            if (option.value === k.unit) option.selected = true;
          })

          setUni(k.unit);
          break;
        case actions.copy:
          const actionElement = document.getElementById(k.unit);

          if (
            actionElement === null ||
            actionElement === undefined ||
            actionElement === void 0
          ) {
            console.error(`An element with an ID of '${k.unit}' could not be found.`);
            return
          }

          navigator.clipboard.writeText(actionElement.textContent);
          break;
        default: 
          console.error(`Where did this screwy action come from? ${k.action}`);
      }
    }
  }

  useKeyMappings(leaderKey, keyMappings, onHotkeyPress);

  return (
    <div>
      <UserInput units={Object.keys(units)} onEnter={onUserInput} />
      <Pixels value={val} unit={uni} />
      <Rems value={val} unit={uni} />
      <Ems value={val} unit={uni} />
      <Tailwind value={val} unit={uni} />
      <Bootstrap value={val} unit={uni} />
      <Inches value={val} unit={uni} />
      <Millimetres value={val} unit={uni} />
      <Centimetres value={val} unit={uni} />
      <Feet value={val} unit={uni} />
      <Picas value={val} unit={uni} />
      <Points value={val} unit={uni} />
    </div>
  );
}
