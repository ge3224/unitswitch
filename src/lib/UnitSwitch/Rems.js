import PropTypes from "prop-types";
import Unit from "./Unit";
import { converter } from "./converter";
import { fontSize } from "./standards";
import { twRanges } from "./Tailwind"
import { units } from "./units";
import { useConverter } from "./useConverter";
import { useEffect } from "react";

export default function Rems({ input, target, hotkey }) {
  const result = useConverter(units.Rems, input, target);

  const remHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(parseFloat(result).toFixed(3));
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', remHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", remHotkeyHandler);
    }
  })

  return (
    <Unit
      base={units.Rems}
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(input, target) => useConverter(units.Rems, input, target)}
    >
      <div className="font-space text-black-usw">Based on a root font size of <span className="font-bold">{fontSize}px</span></div>
    </Unit>
  )
}

Rems.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  hotkey: PropTypes.string,
}

const convertToBootstrapSpacing = (rems) => {
  switch (rems) {
    case 0:
      return 0
    case 0.25:
      return 1
    case 0.5:
      return 2
    case 1:
      return 3
    case 1.5:
      return 4
    case 3:
      return 5
    default:
      return null
  }
}

export const remConverter = converter(new Map([
  [units.Bootstrap, (rems) => convertToBootstrapSpacing(rems)],
  [units.Centimetres, (rems) => rems * 0.42333328],
  [units.Ems, (rems) => rems * 1.0037498835808],
  [units.Feet, (rems) => rems * 0.013888887139108],
  [units.Inches, (rems) => rems * 0.16666664566929],
  [units.Millimetres, (rems) => rems * 4.2333328],
  [units.Picas, (rems) => rems * 0.99999987480315],
  [units.Pixels, (rems) => Math.ceil(rems * fontSize)],
  [units.Points, (rems) => rems * 11.99999092914],
  [units.Rems, (rems) => rems],
  [units.Tailwind, (rems) => twRanges(rems / 0.25)],
]));
