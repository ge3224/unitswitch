import PropTypes from "prop-types";
import { cmToBs } from "./Centimetres";
import { emToBs } from "./Ems";
import { ftToBs } from "./Feet";
import { inToBs } from "./Inches";
import { mmToBs } from "./Millimetres";
import { pToBs } from "./Picas";
import { pxToBs } from "./Pixels";
import { ptToBs } from "./Points";
import * as Rems from "./Rems"
import { twToBs } from "./Tailwind";
import { units } from "./Units";
import { useConverter } from "./useConverter";

export default function Bootstrap({ value, unit }) {

  const result = useConverter(bsConverter, value, unit)

  const pretty = (value) => {
    let num = parseFloat(value)

    if (Number.isNaN(num)) {
      return "N/A"
    }
    return num.toFixed(0).toString()
  }

  return (
    <div>
      <span>Bootstrap:</span>{" "}
      <span id={units.Bootstrap}>{pretty(result)}</span>{" "}
      {result !== "N/A" ? <span>(<code>p-{pretty(result)}</code>)</span> : ""}{" "}
      <span><small>space + b</small></span>
    </div>
  )
}

Bootstrap.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

export function bsRanges(value) {
  if (value >= 0 && value <= 5) {
    if (value % 2 === 0 || value % 2 === 1) {
      return value
    }
  }
  return null
}

const bsConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Bootstrap:
      val = bsRanges(input)
      break
    case units.Pixels:
      val = bsRanges(pxToBs(input))
      break
    case units.Rems:
      val = bsRanges(Rems.remToBs(input))
      break
    case units.Ems:
      val = bsRanges(emToBs(input))
      break
    case units.Tailwind:
      val = bsRanges(twToBs(input))
      break
    case units.Inches:
      val = bsRanges(inToBs(input))
      break
    case units.Millimetres:
      val = bsRanges(mmToBs(input))
      break
    case units.Centimetres:
      val = bsRanges(cmToBs(input))
      break
    case units.Feet:
      val = bsRanges(ftToBs(input))
      break
    case units.Picas:
      val = bsRanges(pToBs(input))
      break
    case units.Points:
      val = bsRanges(ptToBs(input))
      break
    default: // do nothing
  }

  return val
}

export const bsToCm = (bs) => bsRanges(bs) !== null ? Rems.remToCm(bsToRems(bs)) : null
export const bsToEms = (bs) => bsRanges(bs) !== null ? Rems.remToEms(bsToRems(bs)) : null
export const bsToFt = (bs) => bsRanges(bs) !== null ? Rems.remToFt(bsToRems(bs)) : null
export const bsToIn = (bs) => bsRanges(bs) !== null ? Rems.remToIn(bsToRems(bs)) : null
export const bsToMm = (bs) => bsRanges(bs) !== null ? Rems.remToMm(bsToRems(bs)) : null
export const bsToPicas = (bs) => bsRanges(bs) !== null ? Rems.remToPicas(bsToRems(bs)) : null
export const bsToPts = (bs) => bsRanges(bs) !== null ? Rems.remToPts(bsToRems(bs)) : null
export const bsToPx = (bs) => bsRanges(bs) !== null ? Rems.remToPx(bsToRems(bs)) : null
export const bsToTw = (bs) => bsRanges(bs) !== null ? Rems.remToTw(bsToRems(bs)) : null
export const bsToRems = (bs) => {
  const valid = bsRanges(bs)
  if (valid === null || valid === undefined || valid === void 0) {
    return null
  }
  let result = null
  switch (valid) {
    case 0:
      result = 0
      break
    case 1:
      result = 0.25
      break
    case 2:
      result = 0.5
      break
    case 3:
      result = 1
      break
    case 4:
      result = 1.5
      break
    case 5:
      result = 3
      break
    default: // do nothing
  }

  return result
}
