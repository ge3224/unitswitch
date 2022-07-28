import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { twRanges } from "./Tailwind"
import { converter } from "./converter";
import { useKeyMappings } from "./useCustomMapping";

export default function Points({ value, unit, keymap }) {
  const result = useConverter(units.Points, value, unit)

  const onHotkeyPress = (e) => {
        if (e.key === keymap.toClipboard) {
      navigator.clipboard.writeText(result);
    } 
  }

  useKeyMappings(
    keymap.leader,
    new Set(keymap.toClipboard),
    onHotkeyPress,
  );

  return (
    <div>
      <span>Points:</span>{" "}
      <span id={units.Points}>{result}</span>{" "}
      <span><small>space + o</small></span>
    </div>
  )
}

Points.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const convertToBootstrapSpacing = (cm) => {
  const fixed = parseFloat((cm).toFixed(3));
  switch (fixed) {
    case 0.000:
      return 0
    case 3.000:
      return 1
    case 6.000:
      return 2
    case 12.000:
      return 3
    case 18.000:
      return 4
    case 36.000:
      return 5
    default:
      return null
  }
}

export const pointConverter = converter(new Map([
  [units.Bootstrap, (pt) => convertToBootstrapSpacing(pt)],
  [units.Centimetres, (pt) => pt * 0.0352778],
  [units.Ems, (pt) => pt * 0.083645886860081],
  [units.Feet, (pt) => pt * 0.0011574081364829],
  [units.Inches, (pt) => pt * 0.013888897637795],
  [units.Millimetres, (pt) => pt * 0.352778],
  [units.Picas, (pt) => pt * 0.083333385892388],
  [units.Pixels, (pt) => Math.ceil(pt * 1.3333343412075)],
  [units.Points, (pt) => pt],
  [units.Rems, (pt) => pt * 0.083333396325467],
  [units.Tailwind, (pt) => twRanges(parseFloat(((pt * 0.083333396325467)/0.25).toFixed(3)))],
]));
