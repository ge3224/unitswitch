import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { remToMm, remToTw, remToBs } from "./Rems"
import { pxToMm } from "./Pixels"
import { emToMm } from "./Ems"
import { twToMm } from "./Tailwind"
import { bsToMm } from "./Bootstrap"
import { inToMm } from "./Inches"
import { cmToMm } from "./Centimetres"
import { ftToMm } from "./Feet"
import { pToMm } from "./Picas"
import { ptToMm } from "./Points"

export default function Millimetres({ value, unit }) {

  const result = useConverter(mmConverter, value, unit)

  return (
    <div>
      <span>Millimetres:</span>{" "}
      <span id={units.Millimetres}>{result}</span>
    </div>
  )
}

Millimetres.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

const mmConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Millimetres:
      val = input
      break
    case units.Pixels:
      val = pxToMm(input)
      break
    case units.Rem:
      val = remToMm(input)
      break
    case units.Em:
      val = emToMm(input)
      break
    case units.Taiwind:
      val = twToMm(input)
      break
    case units.Bootstrap:
      val = bsToMm(input)
      break
    case units.Inches:
      val = inToMm(input)
      break
    case units.Centimetres:
      val = cmToMm(input)
      break
    case units.Feet:
      val = ftToMm(input)
      break
    case units.Picas:
      val = pToMm(input)
      break
    case units.Points:
      val = ptToMm(input)
      break
    default: // do nohting
  }

  return val
}

export const mmToCm = (mm) => mm * 0.1
export const mmToEms = (mm) => mm * 0.23710630158366
export const mmToFt = (mm) => mm * 0.0032808398950131
export const mmToIn = (mm) => mm * 0.039370078740157
export const mmToPicas = (mm) => mm * 0.23622047262695
export const mmToPts = (mm) => mm * 2.8346438836889
export const mmToPx = (mm) => mm * 3.7795280352161
export const mmToRems = (mm) => mm * 0.23622050220101
export const mmToTw = (mm) => remToTw(mmToRems(mm))
export const mmToBs = (mm) => remToBs(mmToRems(mm))
