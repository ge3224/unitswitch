import PropTypes from "prop-types";
import { dpi } from "./standards";
import { units } from "./Units";
import { twRanges } from "./Tailwind";
import { useConverter } from "./useConverter";
import { converter } from "./converter";

export default function Inches({ value, unit }) {

  const result = useConverter(units.Inches, value, unit)

  return (
    <div>
      <span>Inches:</span>{" "}
      <span id={units.Inches}>{result}</span>{" "}
      <span><small>space + i</small></span>
    </div>
  )
}

Inches.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const convertToBootstrapSpacing = (inches) => {
  const fixed = parseFloat(inches.toFixed(3));
  switch (fixed) {
    case 0.000:
      return 0
    case 0.042:
      return 1
    case 0.083:
      return 2
    case 0.167:
      return 3
    case 0.125:
      return 4
    case 0.500:
      return 5
    default:
      return null
  }
}

export const inchConverter = converter(new Map([
  [units.Bootstrap, (inches) => convertToBootstrapSpacing(inches)],
  [units.Centimetres, (inches) => inches * 2.54],
  [units.Ems, (inches) => inches * 6.022500060225],
  [units.Feet, (inches) => inches * 0.083333333333333],
  [units.Inches, (inches) => inches],
  [units.Millimetres, (inches) => inches * 25.4],
  [units.Picas, (inches) => inches * 6.0000000047244],
  [units.Pixels, (inches) => Math.ceil(inches * dpi)],
  [units.Points, (inches) => inches * 71.999954645698],
  [units.Rems, (inches) => inches * 6.0000007559056],
  [units.Tailwind, (inches) => twRanges((inches * 6.0000007559056)/0.25)],
]));
