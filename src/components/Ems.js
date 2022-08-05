import Conversion from "./Conversion";
import PropTypes from "prop-types"
import { converter } from "./converter";
import { fontSize } from "./standards";
import { units } from "./Units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

export default function Ems({ input, target, keymap }) {
  const result = useConverter(units.Tailwind, input, target);

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
      base={units.Ems}
      input={input}
      target={target}
      callback={(input, target) => useConverter(units.Ems, input, target)}
    >
      <div>Relative Font Size: <span className="font-bold">{fontSize}px</span></div>
    </Conversion>
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
