import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { remToTw, remToBs, remToFt } from "./Rems"
import { pxToFt } from "./Pixels"
import { emToFt } from "./Ems"
import { bsToFt } from "./Bootstrap"
import { twToFt } from "./Tailwind"
import { inToFt } from "./Inches"
import { mmToFt } from "./Millimetres"
import { cmToFt } from "./Centimetres"
import { pToFt } from "./Picas"
import { ptToFt } from "./Points"

export default function Feet({ value, unit }) {

  const result = useConverter(ftConverter, value, unit)

  return (
    <div>
      <span>Feet:</span>{" "}
      <span id={units.Feet}>{result}</span>{" "}
      <span><small>space + f</small></span>
    </div>
  )
}

Feet.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}


const ftConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Feet:
      val = input
      break
    case units.Pixels:
      val = pxToFt(input)
      break
    case units.Rems:
      val = remToFt(input)
      break
    case units.Ems:
      val = emToFt(input)
      break
    case units.Tailwind:
      val = twToFt(input)
      break
    case units.Bootstrap:
      val = bsToFt(input)
      break
    case units.Inches:
      val = inToFt(input)
      break
    case units.Millmetres:
      val = mmToFt(input)
      break
    case units.Centimetres:
      val = cmToFt(input)
      break
    case units.Picas:
      val = pToFt(input)
      break
    case units.Points:
      val = ptToFt(input)
      break
    default: // do nothing
  }

  return val
}

export const ftToCm = (ft) => ft * 30.48
export const ftToEms = (ft) => ft * 72.2700007227
export const ftToIn = (ft) => ft * 12
export const ftToMm = (ft) => ft * 304.8
export const ftToPicas = (ft) => ft * 72.000000056693
export const ftToPts = (ft) => ft * 863.99945574837
export const ftToPx = (ft) => ft * 1152.0001451339
export const ftToRems = (ft) => ft * 72.000009070867
export const ftToTw = (ft) => remToTw(ftToRems(ft))
export const ftToBs = (ft) => remToBs(ftToRems(ft))
