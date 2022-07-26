import { useState } from "react";
import { unitList } from "./components/Units";
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

// leaderKey is a custom mod key that initiates app actions
const leaderKey = " ";

// keyBindings is a map of hotkeys
const keyBindings = new Map([
  ["P", () => selectInputUnit(units.Pixels)], 
  ["p", () => copyConvertedValue(units.Pixels)], 
  ["R", () => selectInputUnit(units.Rems)], 
  ["r", () => copyConvertedValue(units.Rems)], 
  ["E", () => selectInputUnit(units.Ems)], 
  ["e", () => copyConvertedValue(units.Ems)], 
  ["T", () => selectInputUnit(units.Tailwind)], 
  ["t", () => copyConvertedValue(units.Tailwind)], 
  ["B", () => selectInputUnit(units.Bootstrap)], 
  ["b", () => copyConvertedValue(units.Bootstrap)], 
  ["I", () => selectInputUnit(units.Inches)], 
  ["i", () => copyConvertedValue(units.Inches)], 
  ["M", () => selectInputUnit(units.Millimetres)], 
  ["m", () => copyConvertedValue(units.Millimetres)], 
  ["C", () => selectInputUnit(units.Centimetres)], 
  ["c", () => copyConvertedValue(units.Centimetres)], 
  ["F", () => selectInputUnit(units.Feet)], 
  ["f", () => copyConvertedValue(units.Feet)], 
  ["A", () => selectInputUnit(units.Picas)], 
  ["a", () => copyConvertedValue(units.Picas)], 
  ["O", () => selectInputUnit(units.Points)], 
  ["o", () => copyConvertedValue(units.Points)], 
  ["i", () => focusOnInput()], 
]);

export default function App() {
  const keyMappings = new Set(keyBindings.keys());
  const [val, setVal] = useState(0)
  const [uni, setUni] = useState(unitList[0])

  const onUserInput = (value, unit) => {
    setVal(value)
    setUni(unit)
  }

  const onHotkeyPress = (e) => {
    const keymaps = new Set(keyBindings.keys())
    if (keymaps.has(e.key)) {
      keyBindings.get(e.key)();
    }
  }

  useKeyMappings(leaderKey, keyMappings, onHotkeyPress);

  return (
    <div>
      <UserInput units={unitList} onEnter={onUserInput} />
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

function focusOnInput() {
  const id = "input";
  const input = document.getElementById(id);
  if (input === null || input === undefined || input === void 0) {
    console.error(`An element with an ID of '${id}' could not be found.`);
    return
  }
  // TODO figure out how to clear the input field; the following don't work. Why?
  // input.setAttribute("value", "");
  // input.value = "";
  input.focus();
}

function selectInputUnit(unit) {
  const id = "units";
  const el = document.getElementById(id);
  if (el === null || el === undefined || el === void 0) {
    console.error(`An element with an ID of '${id}' could not be found.`);
    return
  }
  el.childNodes.forEach(option => {
    if (option.value === unit) option.selected = true;
  })
}

function copyConvertedValue(unit) {
  const el = document.getElementById(unit);
  if (el === null || el === undefined || el === void 0) {
    console.error(`An element with an ID of '${unit}' could not be found.`);
    return
  }
  navigator.clipboard.writeText(el.textContent);
}
