import PropTypes from "prop-types";
import { converter } from "./converter";
import { dpi } from "./standards";
import { units } from "./Units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";

export default function Bootstrap({ value, unit, keymap }) {
  const result = useConverter(units.Bootstrap, value, unit)

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

  const pretty = (value) => {
    let num = parseFloat(value)

    if (Number.isNaN(num)) {
      return "N/A"
    }
    return num.toFixed(0).toString()
  }

  return (
    <div>
      <p>
        <span>Bootstrap:</span>{" "}
        <span id={units.Bootstrap}>{pretty(result)}</span>{" "}
        {result !== "N/A" ? <span>(<code>p-{pretty(result)}</code>)</span> : ""}{" "}
        <span><small>space + b</small></span>
      </p>
    </div>
  )
}

Bootstrap.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
  keymap: PropTypes.object,
}

const convertToRems = (bs) => {
  switch (bs) {
    case 0:
      return 0
    case 1:
      return 0.25
    case 2:
      return 0.5
    case 3:
      return 1
    case 4:
      return 1.5
    case 5:
      return 3
    default:
      return null
  }
}

const convertToTailwind = (bs) => {
  switch (bs) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    case 3:
      return 4
    case 4:
      return 6
    case 5:
      return 12
    default:
      return null
  }
}

const convertToPixels = (bs) => {
  switch (bs) {
    case 0:
      return 0
    case 1:
      return 4
    case 2:
      return 8
    case 3:
      return 16
    case 4:
      return 24
    case 5:
      return 48
    default:
      return null
  }
}

const convertByInchRatio = (bs, ratio = 1) => {
  switch (bs) {
    case 0:
      return 0
    case 1:
      return (4 / dpi) * ratio
    case 2:
      return (8 / dpi) * ratio
    case 3:
      return (16 / dpi) * ratio
    case 4:
      return (24 / dpi) * ratio
    case 5:
      return (48 / dpi) * ratio
    default:
      return null
  }
}

export const bootstrapConverter = converter(new Map([
  [units.Bootstrap, (bs) => bs],
  [units.Centimetres, (bs) => convertByInchRatio(bs, 2.54)],
  [units.Ems, (bs) => convertToRems(bs)], // TODO revisit this
  [units.Feet, (bs) => convertByInchRatio(bs, 1 / 12)],
  [units.Inches, (bs) => convertByInchRatio(bs, 1)],
  [units.Millimetres, (bs) => convertByInchRatio(bs, 25.4)],
  [units.Picas, (bs) => convertByInchRatio(bs, 6)],
  [units.Pixels, (bs) => convertToPixels(bs)],
  [units.Points, (bs) => convertByInchRatio(bs, 72)],
  [units.Rems, (bs) => convertToRems(bs)],
  [units.Tailwind, (bs) => convertToTailwind(bs)],
]));
