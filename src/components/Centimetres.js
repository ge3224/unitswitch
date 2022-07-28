import PropTypes from "prop-types"
import { converter } from "./converter";
import { twRanges } from "./Tailwind";
import { units } from "./Units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

export default function Centimetres({ value, unit, keymap }) {
  const result = useConverter(units.Centimetres, value, unit)

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
      <p>
        <span>Centimetres:</span>{" "}
        <span id={units.Centimetres}>{result}</span>{" "}
        <span><small>space + c</small></span>
      </p>
    </div>
  )
}

Centimetres.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
  keymap: PropTypes.object,
}

const convertToBootstrapSpacing = (cm) => {
  const fixed = parseFloat((cm).toFixed(3));
  switch (fixed) {
    case 0.000:
      return 0
    case 0.106:
      return 1
    case 0.212:
      return 2
    case 0.423:
      return 3
    case 0.635:
      return 4
    case 1.270:
      return 5
    default:
      return null
  }
}

export const cmConverter = converter(new Map([
  [units.Bootstrap, (cm) => convertToBootstrapSpacing(cm)],
  [units.Centimetres, (cm) => cm],
  [units.Ems, (cm) => cm * 2.3710630158366],
  [units.Feet, (cm) => cm * 0.032808398950131],
  [units.Inches, (cm) => cm * 0.39370078740157],
  [units.Millimetres, (cm) => cm * 10],
  [units.Picas, (cm) => cm * 0.23622047262695],
  [units.Pixels, (cm) => Math.ceil(cm * 37.795280352161)],
  [units.Points, (cm) => cm * 2.3622047262695],
  [units.Rems, (cm) => cm * 2.3622050220101],
  [units.Tailwind, (cm) => twRanges(parseFloat((cm * 2.3622050220101).toFixed(3)))],
]));
