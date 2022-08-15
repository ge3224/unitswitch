import Unit from "./Unit";
import PropTypes from "prop-types";
import { converter } from "./converter";
import { dpi } from "./standards";
import { twRanges } from "./Tailwind";
import { units } from "./units";
import { useConverter } from "./useConverter";
import { useEffect } from "react";

// Inches displays the equivalent in said unit from that which was entered in
// by the user. 
export default function Inches({ input, target, hotkey }) {
  const result = useConverter(units.Inches, input, target)

  const inchHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(parseFloat(result).toFixed(4));
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', inchHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", inchHotkeyHandler);
    }
  })

  return (
    <Unit
      base={units.Inches}
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(input, target) => useConverter(units.Inches, input, target)}
    >
      <div className="font-space text-black-usw">Tape Measure:&nbsp;&nbsp;<span className="font-space-code text-purple-usw-500">{toFraction(result)}</span></div>
    </Unit>
  )
}

Inches.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  hotkey: PropTypes.string,
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
    return `${whole > 0 ? `${whole} ` : ""}${numerator}/${denominator}"`
  }

  let relevant = false;
  switch (denominator) {
    case 2:
      relevant = true;
      break
    case 4:
      relevant = true;
      break
    case 8:
      relevant = true;
      break
    case 16:
      relevant = true;
      break
    case 32:
      relevant = true;
      break
    case 64:
      relevant = true;
      break
  }

  if (relevant) {
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
