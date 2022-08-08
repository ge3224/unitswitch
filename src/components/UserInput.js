import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useKeyMappings } from "./useKeyMappings";
import { units as appUnits } from "./units";

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
    <div className="flex flex-col border-b border-green-600 pt-11 pb-8 px-10 lg:flex-row lg:justify-center lg:border lg:rounded-lg lg:col-span-3">
      <div className="flex justify-center items-center mb-6 lg:ml-6">
        <svg width="67" height="46" viewBox="0 0 67 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161"
            fill="#4EBD85"
          />
          <path
            d="M26.0972 23.1105L17.0444 7.15912L1 16.2646L10.0527 32.2161"
            stroke="#003641"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M10.0527 32.216L43.4719 14.1078L41.9617 1L65.2671 23.2891L41.9617 44.8241L43.4719 31.4604L10.0527 32.216Z"
            fill="#CFF9B9"
            stroke="#003641"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="ml-1 text-4xl text-black font-bold">UnitSwitch</h1>
      </div>
      <div className="max-w-sm md:mx-auto md:w-96 lg:ml-12">
        <div className="mb-2">
          <input
            className="w-full bg-green-100 border border-green-600 rounded-sm py-1 px-1.5 font-code font-bold text-green-500 focus:outline-none focus:ring focus:ring-teal"
            type="number"
            value={num}
            ref={inputField}
            onChange={(e) => {
              setNum(e.target.value)
              onEnter(e.target.value, uni)
            }}
          />
        </div>
        <div>
          <select
            className="bg-white border border-green-600 rounded-sm py-1 px-0.5 text-black focus:outline-none focus:ring focus:ring-teal"
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
      </div>
    </div>
  )
}

UserInput.propTypes = {
  units: PropTypes.arrayOf(PropTypes.string),
  onEnter: PropTypes.func,
}
