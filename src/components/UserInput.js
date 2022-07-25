import PropTypes from "prop-types";
import { useState } from "react";

export default function UserInput({ units, onEnter }) {
  const [num, setNum] = useState(0)
  const [uni, setUni] = useState(units[0])

  return (
    <div className="cunits__input">
      <label>Input: </label>
      <input
        type="number"
        value={num}
        onChange={(e) => {
          setNum(e.target.value)
          onEnter(e.target.value, uni)
        }}
      />
      <select
        id="units"
        name="units"
        onChange={(e) => { 
          setUni(e.target.value) 
          onEnter(num, e.target.value)
        }}
      >
        {units.map(
          (unit, index) =>
            <option key={index} value={unit} >{unit}</option>
        )}
      </select>
    </div>
  )
}

UserInput.propTypes = {
  units: PropTypes.arrayOf(PropTypes.string),
  onEnter: PropTypes.func,
}
