import PropTypes from "prop-types"
import { dpi } from "./standards"
import { remToTw, remToBs, remToIn } from "./Rems"
import { twToIn } from "./Tailwind"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { pxToIn } from "./Pixels"
import { mmToIn } from "./Millimetres"
import { cmToIn } from "./Centimetres"
import { ftToIn } from "./Feet"
import { ptToIn } from "./Points"
import { emToIn } from "./Ems"
import { bsToIn } from "./Bootstrap"

export default function Inches({ value, unit }) {

  const result = useConverter(inchConverter, value, unit)

  return (
    <div>
      <span>Inches:</span>{" "}
      <span id={units.Inches}>{result}</span>
    </div>
  )
}

Inches.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const inchConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Inches:
      val = input
      break
    case units.Pixels:
      val = pxToIn(input)
      break
    case units.Millimetres:
      val = mmToIn(input)
      break
    case units.Centimetres:
      val = cmToIn(input)
      break
    case units.Feet:
      val = ftToIn(input)
      break
    case units.Picas:
      val = ptToIn(input)
      break
    case units.Points:
      val = ptToIn(input)
      break
    case units.Rem:
      val = remToIn(input)
      break
    case units.Em:
      val = emToIn(input)
      break
    case units.Tailwind:
      val = twToIn(input)
      break
    case units.Bootstrap:
      val = bsToIn(input)
      break
    default: // do nothing
  }
  return val
}

export const inToEms = (inches) => inches * 6.022500060225
export const inToCm = (inches) => inches * 2.54
export const inToFt = (inches) => inches * 0.083333333333333
export const inToMm = (inches) => inches * 25.4
export const inToPicas = (inches) => inches * 6.0000000047244
export const inToPts = (inches) => inches * 71.999954645698
export const inToPx = (inches) => inches * dpi
export const inToRems = (inches) => inches * 6.0000007559056
export const inToTw = (inches) => remToTw(inToRems(inches))
export const inToBs = (inches) => remToBs(inToRems(inches))
