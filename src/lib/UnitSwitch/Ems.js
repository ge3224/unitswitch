import Unit from "./Unit";
import PropTypes from "prop-types"
import { converter } from "./converter";
import { fontSize } from "./standards";
import { units } from "./units";
import { useConverter } from "./useConverter";
import { useEffect } from "react";

export default function Ems({ input, target, hotkey }) {
  const result = useConverter(units.Ems, input, target);

  const emHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(result);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', emHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", emHotkeyHandler);
    }
  })

  return (
    <Unit
      base={units.Ems}
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(input, target) => useConverter(units.Ems, input, target)}
    >
      <div className="text-black">Based on a relative font size of <span className="font-bold">{fontSize}px</span></div>
    </Unit>
  )
}

Ems.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}

export const emConverter = converter(new Map([
  [units.Bootstrap, () => null], // TODO revisit this
  [units.Centimetres, (ems) => ems * 0.42175176],
  [units.Ems, (ems) => ems],
  [units.Feet, (ems) => ems * 0.013837],
  [units.Inches, (ems) => ems * 0.166044],
  [units.Millimetres, (ems) => ems * 4.2175176],
  [units.Picas, (ems) => ems * 0.99626400078446],
  [units.Pixels, (ems) => Math.ceil(ems * 15.940226008217)],
  [units.Points, (ems) => ems * 11.95516046919],
  [units.Rems, (ems) => ems * 0.99626412551359], // TODO this doesn't make sense
  [units.Tailwind, () => null], // TODO revisit this
]));
