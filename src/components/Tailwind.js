import * as Rems from "./Rems"
import PropTypes from "prop-types";
import { bsToTw } from "./Bootstrap";
import { cmToTw } from "./Centimetres";
import { emToTw } from "./Ems";
import { ftToTw } from "./Feet";
import { inToTw } from "./Inches";
import { mmToTw } from "./Millimetres";
import { pToTw } from "./Picas";
import { ptToTw } from "./Points";
import { pxToTw } from "./Pixels";
import { units } from "./Units";
import { useConverter } from "./useConverter";

export default function Tailwind({ value, unit }) {

  const result = useConverter(twConverter, value, unit)

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
    <div>
      <span>Tailwind :</span>{" "}
      <span id={units.Tailwind}>{pretty(result)}</span>{" "}
      {result !== "N/A" ? <span>(e.g. <code>class="m-{pretty(result)}"</code>)</span> : ""}
    </div>
  )
}

Tailwind.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
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

const twConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Inches:
      val = twRanges(inToTw(input))
      break
    case units.Pixels:
      val = twRanges(pxToTw(input))
      break
    case units.Millimetres:
      val = twRanges(mmToTw(input))
      break
    case units.Centimetres:
      val = twRanges(cmToTw(input))
      break
    case units.Feet:
      val = twRanges(ftToTw(input))
      break
    case units.Picas:
      val = twRanges(pToTw(input))
      break
    case units.Points:
      val = twRanges(ptToTw(input))
      break
    case units.Rems:
      val = Rems.remToTw(input)
      break
    case units.Ems:
      val = twRanges(emToTw(input))
      break
    case units.Tailwind:
      val = twRanges(input)
      break
    case units.Bootstrap:
      val = bsToTw(input)
      break
    default: // do nothing
  }

  return val
}

export const twToCm = (tw) => twRanges(tw) ? Rems.remToCm(twToRems(tw)) : null
export const twToEms = (tw) => twRanges(tw) ? Rems.remToEms(twToRems(tw)) : null
export const twToFt = (tw) => twRanges(tw) ? Rems.remToFt(twToRems(tw)) : null
export const twToIn = (tw) => twRanges(tw) ? Rems.remToIn(twToRems(tw)) : null
export const twToMm = (tw) => twRanges(tw) !== null ? Rems.remToMm(twToRems(tw)) : null
export const twToPicas = (tw) => twRanges(tw) !== null ? Rems.remToPicas(twToRems(tw)) : null
export const twToPts = (tw) => twRanges(tw) !== null ? Rems.remToPts(twToRems(tw)) : null
export const twToPx = (tw) => twRanges(tw) !== null ? tw * 4 : null
export const twToRems = (tw) => twRanges(tw) !== null ? tw * 0.25 : null
export const twToBs = (tw) => twRanges(tw) !== null ? Rems.remToBs(twToRems(tw)) : null
