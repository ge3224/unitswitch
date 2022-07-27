import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { twRanges } from "./Tailwind"
import { converter } from "./converter";

export default function Feet({ value, unit }) {

  const result = useConverter(units.Feet, value, unit)

  return (
    <div>
      <span>Feet:</span>{" "}
      <span id={units.Feet}>{result}</span>{" "}
      <span><small>space + f</small></span>
    </div>
  )
}

Feet.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const convertToBootstrapSpacing = (ft) => {
  const fixed = parseFloat((ft).toFixed(3));
  switch (fixed) {
    case 0.000:
      return 0
    case 0.003:
      return 1
    case 0.007:
      return 2
    case 0.014:
      return 3
    case 0.021:
      return 4
    case 0.042:
      return 5
    default:
      return null
  }
}

export const ftConverter = converter(new Map([
  [units.Bootstrap, (ft) => convertToBootstrapSpacing(ft)],
  [units.Centimetres, (ft) => ft * 30.48],
  [units.Ems, (ft) => ft * 72.2700007227],
  [units.Feet, (ft) => ft],
  [units.Inches, (ft) => ft * 12],
  [units.Millimetres, (ft) => ft * 304.8],
  [units.Picas, (ft) => ft * 72.000000056693],
  [units.Pixels, (ft) => Math.ceil(ft * 1152.0001451339)],
  [units.Points, (ft) => ft * 863.99945574837],
  [units.Rems, (ft) => ft * 72.000009070867],
  [units.Tailwind, (ft) => twRanges(parseFloat(((ft * 72.000009070867)/0.25).toFixed(3)))],
]));
