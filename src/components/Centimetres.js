import PropTypes from "prop-types"
import { bsToCm } from "./Bootstrap";
import { emToCm } from "./Ems";
import { ftToCm } from "./Feet";
import { inToCm } from "./Inches";
import { mmToCm } from "./Millimetres";
import { pToCm } from "./Picas";
import { pxToCm } from "./Pixels";
import { ptToCm } from "./Points";
import { remToTw, remToBs, remToCm } from "./Rems"
import { twToCm } from "./Tailwind";
import { units } from "./Units";
import { useConverter } from "./useConverter";

export default function Centimetres({ value, unit }) {

  const result = useConverter(cmConverter, value, unit)

  return (
    <div>
      <span>Centimetres:</span>{" "}
      <span id={units.Centimetres}>{result}</span>
    </div>
  )
}

Centimetres.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}


const cmConverter = (value, unit) => {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Centimetres:
      val = input
      break
    case units.Pixels:
      val = pxToCm(input)
      break
    case units.Rem:
      val = remToCm(input)
      break
    case units.Em:
      val = emToCm(input)
      break
    case units.Tailwind:
      val = twToCm(input)
      break
    case units.Bootstrap:
      val = bsToCm(input)
      break
    case units.Inches:
      val = inToCm(input)
      break
    case units.Millimetres:
      val = mmToCm(input)
      break
    case units.Feet:
      val = ftToCm(input)
      break
    case units.Picas:
      val = pToCm(input)
      break
    case units.Points:
      val = ptToCm(input)
      break
    default: // do nothing
  }

  return val
}

export const cmToMm = (cm) => cm * 10
export const cmToEms = (cm) => cm * 2.3710630158366
export const cmToFt = (cm) => cm * 0.032808398950131
export const cmToIn = (cm) => cm * 0.39370078740157
export const cmToPicas = (cm) => cm * 0.23622047262695
export const cmToPts = (cm) => cm * 2.3622047262695
export const cmToPx = (cm) => cm * 37.795280352161
export const cmToRems = (cm) => cm * 2.3622050220101
export const cmToTw = (cm) => remToTw(cmToRems(cm))
export const cmToBs = (cm) => remToBs(cmToRems(cm))
