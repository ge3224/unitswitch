import PropTypes from "prop-types";
import { units } from "./units";
import { useConverter } from "./useConverter";
import { useKeyMappings } from "./useKeyMappings";
import { converter } from "./converter";
import Unit from "./Unit";

export default function Tailwind({ input, target, keymap }) {
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

  const pretty = (value) => {
    let num = parseFloat(value)

    if (Number.isNaN(num)) {
      return "N/A"
    }

    if (num === 0.25) {
      return "px"
    }

    if (num % 2 === 0 || num % 2 === 1) {
      num = num.toFixed(0)
    } else {
      num = num.toFixed(1)
    }

    return num.toString()
  }

  return (
    <Unit
      base={units.Tailwind}
      input={input}
      target={target}
      callback={(input, target) => useConverter(units.Tailwind, input, target)}
      decimal={false}
    >
      <div>
        {
          result !== "N/A" ?
            <span>Example: <code className="text-purple text-sm">class="m-{pretty(result)}"</code></span> :
            "Example Not Available"
        }
      </div>
    </Unit>
  )
}

Tailwind.defaultProps = {
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}

export function twRanges(value) {
  if (value >= 0 && value <= 96) {
    if (
      value === 0.25 ||
      value % 2 === 0 ||
      value % 2 === 1 ||
      value % 2 === 0.5 ||
      value % 2 === 1.5
    ) {
      return value
    }
  }
  return null
}

const convertToBootstrapSpacing = (tw) => {
  switch (tw) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 2
    case 4:
      return 3
    case 6:
      return 4
    case 12:
      return 5
    default:
      return null
  }
}

export const tailwindConverter = converter(new Map([
  [units.Bootstrap, (tw) => twRanges(tw) ? convertToBootstrapSpacing(tw) : null],
  [units.Centimetres, (tw) => twRanges(tw) ? (tw * 0.25) * 0.42333328 : null],
  [units.Ems, (tw) => twRanges(tw) ? tw * 0.25 : null], // TODO revisit this
  [units.Feet, (tw) => twRanges(tw) ? (tw * 0.25) * 0.013888887139108 : null],
  [units.Inches, (tw) => twRanges(tw) ? (tw * 0.25) * 0.16666664566929 : null],
  [units.Millimetres, (tw) => twRanges(tw) ? (tw * 0.25) * 4.2333328 : null],
  [units.Picas, (tw) => twRanges(tw) ? (tw * 0.25) * 0.99999987480315 : null],
  [units.Pixels, (tw) => twRanges(tw) ? tw * 4 : null],
  [units.Points, (tw) => twRanges(tw) ? (tw * 0.25) * 11.99999092914 : null],
  [units.Rems, (tw) => twRanges(tw) ? tw * 0.25 : null],
  [units.Tailwind, (tw) => tw],
]));
