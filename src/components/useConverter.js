import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { bootstrapConverter } from "./Bootstrap";
import { cmConverter } from "./Centimetres";
import { emConverter } from "./Ems";
import { ftConverter } from "./Feet";
import { inchConverter } from "./Inches";
import { mmConverter } from "./Millimetres";
import { picaConverter } from "./Picas";
import { pixelConverter } from "./Pixels";
import { pointConverter } from "./Points";
import { remConverter } from "./Rems"
import { tailwindConverter } from "./Tailwind"
import { units } from "./Units";

export function useConverter(target, value, unit) {
  const [val, setVal] = useState("N/A")

  useEffect(() => {

    const converter = (input, unit) => {
      const num = parseFloat(input)

      if(unit === target) {
        return num
      }

      switch (unit) {
        case units.Rems:
          return remConverter(num, target)
        case units.Pixels:
          return pixelConverter(num, target)
        case units.Ems:
          return emConverter(num, target)
        case units.Tailwind:
          return tailwindConverter(num, target)
        case units.Bootstrap:
          return bootstrapConverter(num, target)
        case units.Inches:
          return inchConverter(num, target)
        case units.Millimetres:
          return mmConverter(num, target)
        case units.Centimetres:
          return cmConverter(num, target)
        case units.Feet:
          return ftConverter(num, target)
        case units.Picas:
          return picaConverter(num, target)
        case units.Points:
          return pointConverter(num, target)
        default:
          return null
      }
    }

    const result = converter(value, unit)

    if (result === null || result === undefined || result === void 0) {
      setVal("N/A")
      return
    }
    setVal(result.toFixed(3).toString())
  }, [value, unit])

  return val
}

useConverter.defaultProps = {
  evaluator: PropTypes.func,
  value: PropTypes.string,
  unit: PropTypes.string,
}
