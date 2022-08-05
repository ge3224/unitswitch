import Conversion from "./Conversion";
import PropTypes from "prop-types";
import { converter } from "./converter";
import { dpi } from "./standards";
import { twRanges } from "./Tailwind";
import { units } from "./Units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

export default function Inches({ input, target, keymap }) {
  const result = useConverter(units.Inches, input, target)

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
    <Conversion
      base={units.Inches}
      input={input}
      target={target}
      callback={(input, target) => useConverter(units.Inches, input, target)}
    />
  )
}

Inches.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
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
  [units.Tailwind, (inches) => twRanges((inches * 6.0000007559056) / 0.25)],
]));
