import Unit from "./Unit";
import PropTypes from "prop-types"
import { converter } from "./converter"
import { dpi } from "./standards"
import { twRanges } from "./Tailwind"
import { units } from "./units"
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

export default function Pixels({ input, target, keymap }) {
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
    <Unit
      base={units.Pixels}
      input={input}
      target={target}
      callback={(input, target) => useConverter(units.Pixels, input, target)}
      decimal={false}
    >
      <div className="text-black">Based on a resolution of <span className="font-bold">{dpi} DPI</span></div>
    </Unit>
  )
}

Pixels.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}

const convertToBootstrapSpacing = (pixels) => {
  switch (pixels) {
    case 0:
      return 0
    case 4:
      return 1 // e.g. class="p-1"
    case 8:
      return 2
    case 16:
      return 3
    case 24:
      return 4
    case 48:
      return 5
    default:
      return null;
  }
}

export const pixelConverter = converter(new Map([
  [units.Bootstrap, (px) => convertToBootstrapSpacing(px)],
  [units.Centimetres, (px) => px * 0.02645833],
  [units.Ems, (px) => px * 0.0627343677238],
  [units.Feet, (px) => px * 0.00086805544619423],
  [units.Inches, (px) => px / dpi],
  [units.Millimetres, (px) => px * 0.2645833],
  [units.Picas, (px) => px * 0.062499992175197],
  [units.Pixels, (px) => px],
  [units.Points, (px) => px * 0.74999943307122],
  [units.Rems, (px) => px * 0.0625],
  [units.Tailwind, (px) => twRanges((px * 0.0625) / 0.25)],
]));
