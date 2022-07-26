import PropTypes from "prop-types"
import { inToPx } from "./Inches"
import { remToTw, remToBs, remToPx } from "./Rems"
import { twToPx } from "./Tailwind"
import { units } from "./Units"
import { useConverter } from "./useConverter"
import { emToPx } from "./Ems"
import { ftToPx } from "./Feet"
import { mmToPx } from "./Millimetres"
import { pToPx } from "./Picas"
import { cmToPx } from "./Centimetres"
import { ptToPx } from "./Points"
import { bsToPx } from "./Bootstrap"
import { dpi } from "./standards"
import { converter } from "./converter"

export default function Pixels({ value, unit }) {

  const result = useConverter(pixelConversion, value, unit)

  return (
    <div>
      <span>Pixels:</span>{" "}
      <span id={units.Pixels}>{result}</span>{" "}
      <span><small className="cunits__keymap">space + p</small></span>
    </div>
  )
}

Pixels.defaultProps = {
  value: PropTypes.string,
  unit: PropTypes.string,
}

function pixelConversion(value, unit) {
  const input = parseFloat(value)
  let val = null

  switch (unit) {
    case units.Pixels:
      val = input
      break
    case units.Inches:
      val = inToPx(input)
      break
    case units.Rems:
      val = remToPx(input)
      break
    case units.Ems:
      val = emToPx(input)
      break
    case units.Feet:
      val = ftToPx(input)
      break
    case units.Centimetres:
      val = cmToPx(input)
      break
    case units.Millimetres:
      val = mmToPx(input)
      break
    case units.Picas:
      val = pToPx(input)
      break
    case units.Points:
      val = ptToPx(input)
      break
    case units.Tailwind:
      val = twToPx(input)
      break
    case units.Bootstrap:
      val = bsToPx(input)
      break
    default: // do nothing
  }
  return val
}

export const pxToEms = (px) => px * 0.0627343677238
export const pxToCm = (px) => px * 0.02645833
export const pxToFt = (px) => px * 0.00086805544619423
export const pxToMm = (px) => px * 0.2645833
export const pxToPicas = (px) => px * 0.062499992175197
export const pxToIn = (px) => px / dpi
export const pxToPts = (px) => px * 0.74999943307122
export const pxToRems = (px) => px * 0.0625
export const pxToTw = (px) => remToTw(pxToRems(px))
export const pxToBs = (px) => remToBs(pxToRems(px))

const pixelCM = new Map([
  [units.Centimetres, (px) => px * 0.02645833],
  [units.Ems, (px) => px * 0.0627343677238],
  [units.Feet, (px) => px * 0.00086805544619423],
  [units.Inches, (px) => px / dpi],
  [units.Millimetres, (px) => px * 0.2645833],
  [units.Picas, (px) => px * 0.062499992175197],
  [units.Points, (px) => px * 0.74999943307122],
  [units.Rems, (px) => px * 0.0625],
  [units.Bootstrap, (px) => remToBs(pxToRems(px))],
  [units.Tailwind, (px) => remToTw(pxToRems(px))],
]);

export const pixelConverter = converter(pixelCM);
// console.log("test", pixelConverter(200, units.Inches));
