import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { remToTw, remToBs, remToPicas } from "./Rems"
import { pxToPicas } from "./Pixels"
import { emToPicas } from "./Ems"
import { twToPicas } from "./Tailwind"
import { bsToPicas } from "./Bootstrap"
import { inToPicas } from "./Inches"
import { mmToPicas } from "./Millimetres"
import { cmToPicas } from "./Centimetres"
import { ftToPicas } from "./Feet"
import { ptToPicas } from "./Points"

export default function Picas({ value, unit }) {

  const result = useConverter(picaConverter, value, unit)

  return (
    <div>
      <span>Picas:</span>{" "}
      <span id={units.Picas}>{result}</span>{" "}
      <span><small>space + a</small></span>
    </div>
  )
}

Picas.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}


export const pToCm = (p) => p * 0.423333333
export const pToEms = (p) => p * 1.0037500092471
export const pToIn = (p) => p * 0.16666666653543
export const pToMm = (p) => p * 4.23333333
export const pToFt = (p) => p * 0.013888888877953
export const pToPts = (p) => p * 11.999992431501
export const pToPx = (p) => p * 16.00000200315
export const pToRems = (p) => p * 1.0000001251969
export const pToTw = (p) => remToTw(pToRems(p))
export const pToBs = (p) => remToBs(pToRems(p))


const picaConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Picas:
      val = input
      break
    case units.Pixels:
      val = pxToPicas(input)
      break
    case units.Rems:
      val = remToPicas(input)
      break
    case units.Ems:
      val = emToPicas(input)
      break
    case units.Tailwind:
      val = twToPicas(input)
      break
    case units.Bootstrap:
      val = bsToPicas(input)
      break
    case units.Inches:
      val = inToPicas(input)
      break
    case units.Millimetres:
      val = mmToPicas(input)
      break
    case units.Centimetres:
      val = cmToPicas(input)
      break
    case units.Feet:
      val = ftToPicas(input)
      break
    case units.Points:
      val = ptToPicas(input)
      break
    default: // do nothing
  }

  return val
}

