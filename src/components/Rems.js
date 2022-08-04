import PropTypes from "prop-types";
import { converter } from "./converter";
import { fontSize } from "./standards";
import { twRanges } from "./Tailwind"
import { units } from "./Units";

export default function RemsDetails() {

  return (
    <div>Root Font Size: <span className="font-bold">{fontSize}px</span></div>
  )
}

RemsDetails.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
  keymap: PropTypes.object,
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
