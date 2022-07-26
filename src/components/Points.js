import PropTypes from "prop-types"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { remToTw, remToBs, remToPts } from "./Rems"
import { pxToPts } from "./Pixels"
import { emToPts } from "./Ems"
import { twToPts } from "./Tailwind"
import { bsToPts } from "./Bootstrap"
import { inToPts } from "./Inches"
import { mmToPts } from "./Millimetres"
import { cmToPts } from "./Centimetres"
import { ftToPts } from "./Feet"
import { pToPts } from "./Picas"

export default function Points({ value, unit }) {

  const result = useConverter(ptConverter, value, unit)

  return (
    <div>
      <span>Points:</span>{" "}
      <span id={units.Points}>{result}</span>
    </div>
  )
}

Points.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

export const ptToCm = (pt) => pt * 0.0352778
export const ptToEms = (pt) => pt * 0.083645886860081
export const ptToIn = (pt) => pt * 0.013888897637795
export const ptToMm = (pt) => pt * 0.352778
export const ptToFt = (pt) => pt * 0.0011574081364829
export const ptToPicas = (pt) => pt * 0.083333385892388
export const ptToPx = (pt) => pt * 1.3333343412075
export const ptToRems = (pt) => pt * 0.083333396325467
export const ptToTw = (pt) => remToTw(ptToRems(pt))
export const ptToBs = (pt) => remToBs(ptToRems(pt))


const ptConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Points:
      val = input
      break
    case units.Pixels:
      val = pxToPts(input)
      break
    case units.Rems:
      val = remToPts(input)
      break
    case units.Ems:
      val = emToPts(input)
      break
    case units.Tailwind:
      val = twToPts(input)
      break
    case units.Bootstrap:
      val = bsToPts(input)
      break
    case units.Inches:
      val = inToPts(input)
      break
    case units.Millimetres:
      val = mmToPts(input)
      break
    case units.Centimetres:
      val = cmToPts(input)
      break
    case units.Feet:
      val = ftToPts(input)
      break
    case units.Picas:
      val = pToPts(input)
      break
    default: // do nothing
  }

  return val
}

