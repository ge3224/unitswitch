import Unit from "./Unit";
import PropTypes from "prop-types"
import { units } from "./units"
import { useConverter } from "./useConverter"
import { twRanges } from "./Tailwind"
import { converter } from "./converter";
import { useEffect } from "react";

export default function Picas({ input, target, hotkey }) {
  const result = useConverter(units.Picas, input, target)

  const pcHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(parseFloat(result).toFixed(1));
      console.log("pcHotkeyHandler");
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', pcHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", pcHotkeyHandler);
    }
  })

  return (
    <Unit
      base={units.Picas}
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(i, t) => useConverter(units.Picas, i, t)}
    />
  )
}

Picas.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}

const convertToBootstrapSpacing = (cm) => {
  const fixed = parseFloat((cm).toFixed(4));
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
  [units.Tailwind, (p) => twRanges(parseFloat(((p * 1.0000001251969) / 0.25).toFixed(2)))],
]));
