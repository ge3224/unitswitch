import Unit from "./Unit";
import PropTypes from "prop-types"
import { converter } from "./converter";
import { twRanges } from "./Tailwind";
import { units } from "./units";
import { useConverter } from "./useConverter";
import { useEffect } from "react";

export default function Centimetres({ input, target, hotkey }) {
  const result = useConverter(units.Centimetres, input, target)

  const cmHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(parseFloat(result).toFixed(3));
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', cmHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", cmHotkeyHandler);
    }
  })

  return (
    <Unit
      base={units.Centimetres}
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(input, target) => useConverter(units.Centimetres, input, target)}
    />
  )
}

Centimetres.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  hotkey: PropTypes.string,
}

const convertToBootstrapSpacing = (cm) => {
  const fixed = parseFloat((cm).toFixed(4));
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
  [units.Tailwind, (cm) => twRanges(parseFloat((cm * 2.3622050220101).toFixed(4)))],
]));
