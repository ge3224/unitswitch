import Unit from "./Unit";
import PropTypes from "prop-types"
import { converter } from "./converter"
import { twRanges } from "./Tailwind"
import { units } from "./units"
import { useConverter } from "./useConverter"
import { useEffect } from "react";

export default function Millimetres({ input, target, hotkey }) {
  const result = useConverter(units.Millimetres, input, target)

  const mmHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(parseFloat(result).toFixed(3));
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', mmHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", mmHotkeyHandler);
    }
  })

  return (
    <Unit
      base={units.Millimetres}
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(input, target) => useConverter(units.Millimetres, input, target)}
    />
  )
}

Millimetres.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}

const convertToBootstrapSpacing = (mm) => {
  const fixed = parseFloat((mm).toFixed(4))
  switch (fixed) {
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
