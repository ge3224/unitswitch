import PropTypes from "prop-types";
import { bsToRems } from "./Bootstrap";
import { cmToRems } from "./Centimetres";
import { emToRems } from "./Ems";
import { ftToRems } from "./Feet";
import { inToRems } from "./Inches";
import { mmToRems } from "./Millimetres";
import { pToRems } from "./Picas";
import { pxToRems } from "./Pixels";
import { ptToRems } from "./Points";
import { fontSize } from "./standards";
import { twRanges, twToRems } from "./Tailwind"
import { units } from "./Units";
import { useConverter } from "./useConverter";

export default function Rems({ value, unit }) {

  const result = useConverter(remConverter, value, unit)

  return (
    <div>
      <span>Rems:</span>{" "}
      <span id={units.Rems}>{result}</span>{" "}
      <span>(Based on a root font-size of 16)</span>
    </div>
  )
}

Rems.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

export const remToCm = (rems) => rems * 0.42333328
export const remToEms = (rems) => rems * 1.0037498835808
export const remToFt = (rems) => rems * 0.013888887139108
export const remToIn = (rems) => rems * 0.16666664566929
export const remToMm = (rems) => rems * 4.2333328
export const remToPicas = (rems) => rems * 0.99999987480315
export const remToPts = (rems) => rems * 11.99999092914
export const remToPx = (rems) => rems * fontSize
export const remToTw = (rems) => twRanges(rems / 0.25)
export const remToBs = (rems) => {
  let val = null
  switch (rems) {
    case 0:
      val = 0
      break
    case 0.25:
      val = 1
      break
    case 0.5:
      val = 2
      break
    case 1:
      val = 3
      break
    case 1.5:
      val = 4
      break
    case 3:
      val = 5
      break
    default: // do nothing
  }
  return val
}

const remConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Inches:
      val = inToRems(input)
      break
    case units.Pixels:
      val = pxToRems(input)
      break
    case units.Millimetres:
      val = mmToRems(input)
      break
    case units.Centimetres:
      val = cmToRems(input)
      break
    case units.Feet:
      val = ftToRems(input)
      break
    case units.Picas:
      val = pToRems(input)
      break
    case units.Points:
      val = ptToRems(input)
      break
    case units.Rems:
      val = input
      break
    case units.Ems:
      val = emToRems(input)
      break
    case units.Tailwind:
      val = twToRems(input)
      break
    case units.Bootstrap:
      val = bsToRems(input)
      break
    default: // do nothing
  }

  return val
}
