import { remToTw, remToBs, remToEms } from "./Rems"
import PropTypes from "prop-types"
import { inToEms } from "./Inches"
import { pxToEms } from "./Pixels"
import { twToEms } from "./Tailwind"
import { units } from "./Units";
import { useConverter } from "./useConverter";
import { mmToEms } from "./Millimetres"
import { cmToEms } from "./Centimetres"
import { ftToEms } from "./Feet"
import { pToEms } from "./Picas"
import { ptToEms } from "./Points"
import { bsToEms } from "./Bootstrap"

export default function Ems({ value, unit }) {

  const result = useConverter(emConverter, value, unit)

  return (
    <div>
      <span>Ems:</span>{" "}
      <span id={units.Ems}>{result}</span>{" "}
      <span>(Based on font-size of 16)</span>{" "}
      <span><small>space + e</small></span>
    </div>
  )
}

Ems.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const emConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Inches:
      val = inToEms(input)
      break
    case units.Pixels:
      val = pxToEms(input) 
      break
    case units.Millimetres:
      val = mmToEms(input)
      break
    case units.Centimetres:
      val = cmToEms(input)
      break
    case units.Feet:
      val = ftToEms(input)
      break
    case units.Picas:
      val = pToEms(input)
      break
    case units.Points:
      val = ptToEms(input)
      break
    case units.Rems:
      val = remToEms(input)
      break
    case units.Ems:
      val = input
      break
    case units.Tailwind:
      val = twToEms(input)
      break
    case units.Bootstrap:
      val = bsToEms(input)
      break
    default: // do nothing
  }

  return val
}

export const emToCm = (ems) => ems * 0.42175176
export const emToFt = (ems) => ems * 0.013837
export const emToIn = (ems) => ems * 0.166044
export const emToMm = (ems) => ems * 4.2175176
export const emToPx = (ems) => ems * 15.940226008217
export const emToPicas = (ems) => ems * 0.99626400078446
export const emToPts = (ems) => ems * 11.95516046919
export const emToRems = (ems) => ems * 0.99626412551359
export const emToTw = (ems) => remToTw(emToRems(ems))
export const emToBs = (ems) => remToBs(emToRems(ems))
