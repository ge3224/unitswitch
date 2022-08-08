import Unit from "./Unit";
import PropTypes from "prop-types";
import { converter } from "./converter";
import { dpi } from "./standards";
import { twRanges } from "./Tailwind";
import { units } from "./units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

// Inches displays the equivalent in said unit from that which was entered in
// by the user. 
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
    <Unit
      base={units.Inches}
      input={input}
      target={target}
      callback={(input, target) => useConverter(units.Inches, input, target)}
    >
      <div className="text-black">Tape Measure: <span className="font-bold">{toFraction(result)}</span></div>
    </Unit>
  )
}

Inches.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}

function toFraction(result) {
  let output = "N/A";

  const num = Number(parseFloat(result).toFixed(8));
  if (Number.isNaN(num)) {
    return output
  }

  const gcd = (a, b) => {
    if (b < 0.0000001) return a;
    return gcd(b, Math.floor(a % b));
  }

  const fraction = num - Math.floor(num);
  const len = fraction.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = fraction * denominator;

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  const format = (numerator, denominator) => {
    const whole = Math.floor(num);
    return `${whole > 0 ? `${whole} ` : ""}${numerator}/${denominator}`
  }

  if (denominator > 1 && denominator <= 64) {
    output = format(Math.floor(numerator), Math.floor(denominator));
  }

  return output
}

const convertToBootstrapSpacing = (inches) => {
  const fixed = parseFloat(inches.toFixed(4));
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
