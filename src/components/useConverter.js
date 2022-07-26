import { useState, useEffect } from "react"
import PropTypes from "prop-types"

export function useConverter(evaluator, value, unit) {
  const [val, setVal] = useState("N/A")

    useEffect(() => {
      const result = evaluator(value, unit)
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
