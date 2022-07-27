import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { twRanges } from "./Tailwind"
import { converter } from "./converter"

export default function Millimetres({ value, unit }) {

  const result = useConverter(units.Millimetres, value, unit)

  return (
    <div>
      <span>Millimetres:</span>{" "}
      <span id={units.Millimetres}>{result}</span>{" "}
      <span><small>space + m</small></span>
    </div>
  )
}

Millimetres.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const convertToBootstrapSpacing = (mm) => {
  const fixed = parseFloat((mm).toFixed(3))
  switch(fixed) {
    case 0.000:
      return 0
    case 1.058:
      return 1
    case 2.117:
      return 2
    case 4.233:
      return 3
    case 6.350:
      return 4
    case 12.70:
      return 5
    default:
      return null
  }
}

export const mmConverter = converter(new Map([
  [units.Bootstrap, (mm) => convertToBootstrapSpacing(mm)],
  [units.Centimetres, (mm) => mm * 0.1],
  [units.Ems, (mm) => mm * 0.23710630158366],
  [units.Feet, (mm) => mm * 0.0032808398950131],
  [units.Inches, (mm) => mm * 0.039370078740157],
  [units.Millimetres, (mm) => mm],
  [units.Picas, (mm) => mm * 0.23622047262695],
  [units.Pixels, (mm) => Math.ceil(mm * 3.7795280352161)],
  [units.Points, (mm) => mm * 2.8346438836889],
  [units.Rems, (mm) => mm * 0.23622050220101],
  [units.Tailwind, (mm) => twRanges(parseFloat((mm * 0.23622050220101).toFixed(2)))],
]));
