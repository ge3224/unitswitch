import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { twRanges } from "./Tailwind"
import { converter } from "./converter";
import { useKeyMappings } from "./useCustomMapping";

export default function Picas({ value, unit, keymap }) {
  const result = useConverter(units.Picas, value, unit)

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
      <span>Picas:</span>{" "}
      <span id={units.Picas}>{result}</span>{" "}
      <span><small>space + a</small></span>
    </div>
  )
}

Picas.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const convertToBootstrapSpacing = (cm) => {
  const fixed = parseFloat((cm).toFixed(3));
  switch (fixed) {
    case 0.000:
      return 0
    case 0.250:
      return 1
    case 0.500:
      return 2
    case 1.000:
      return 3
    case 1.500:
      return 4
    case 3.000:
      return 5
    default:
      return null
  }
}

export const picaConverter = converter(new Map([
  [units.Bootstrap, (p) => convertToBootstrapSpacing(p)],
  [units.Centimetres, (p) => p * 0.423333333],
  [units.Ems, (p) => p * 1.0037500092471],
  [units.Feet, (p) => p * 0.013888888877953],
  [units.Inches, (p) => p * 0.16666666653543],
  [units.Millimetres, (p) => p * 4.23333333],
  [units.Picas, (p) => p],
  [units.Pixels, (p) => Math.ceil(p * 16.00000200315)],
  [units.Points, (p) => p * 11.999992431501],
  [units.Rems, (p) => p * 1.0000001251969],
  [units.Tailwind, (p) => twRanges(parseFloat(((p * 1.0000001251969)/0.25).toFixed(2)))],
]));
