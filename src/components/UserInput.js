import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useKeyMappings } from "./useCustomMapping";

export default function UserInput({ units, onEnter, keymap }) {
  const storageKey = "cunits";

  // set initial state with localStorage data, or default
  const [num, setNum] = useState(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data.value === null || data.value === undefined || data.value === void 0) {
      return 0
    }
    return data.value;
  });

  const [uni, setUni] = useState(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data.unit === null || data.unit === undefined || data.unit === void 0) {
      return units[0]
    }
    return data.unit
  });

  // pass input state back up to parent
  onEnter(num, uni);

  // store state changes
  useEffect(() => {
    localStorage.setItem("cunits", JSON.stringify({ value: num, unit: uni }));
  })

  // enable hotkeys on the following elements
  const inputField = useRef();
  const selectElement = useRef();

  const onHotkeyPress = (e) => {
    if (e.key === keymap.input) {
      inputField.current.focus();
    }
    if (e.key === keymap.select) {
      selectElement.current.focus();
    }
  }

  useKeyMappings(
    keymap.leader,
    new Set([keymap.input, keymap.select]),
    onHotkeyPress,
  );

  return (
    <div className="cunits__input">
      <label>Input: </label>
      <input
        type="number"
        value={num}
        ref={inputField}
        onChange={(e) => {
          setNum(e.target.value)
          onEnter(e.target.value, uni)
        }}
      />
      <select
        name="units"
        ref={selectElement}
        defaultValue={uni}
        onChange={(e) => {
          setUni(e.target.value)
          onEnter(num, e.target.value)
        }}
      >
        {units.map(
          (unit, index) =>
            <option key={index} value={unit}>{unit}</option>
        )}
      </select>
    </div>
  )
}

UserInput.propTypes = {
  units: PropTypes.arrayOf(PropTypes.string),
  onEnter: PropTypes.func,
}
