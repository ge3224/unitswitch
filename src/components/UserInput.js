import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useKeyMappings } from "./useKeyMappings";
import { units as appUnits } from "./Units";

export default function UserInput({ initialNum, initialUnit, onEnter, keymap }) {
  const units = Object.keys(appUnits);
  const [num, setNum] = useState(initialNum);
  const [uni, setUni] = useState(initialUnit);

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
    <div>
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
