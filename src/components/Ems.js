import { converter } from "./converter";
import PropTypes from "prop-types"
import { units } from "./Units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

export default function Ems({ value, unit, keymap }) {
  const result = useConverter(units.Ems, value, unit)

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
        <span>Ems:</span>{" "}
        <span id={units.Ems}>{result}</span>{" "}
        <span>(Based on font-size of 16)</span>{" "}
        <span><small>space + e</small></span>
      </p>
    </div>
  )
}

Ems.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
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
