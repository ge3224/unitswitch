import PropTypes from "prop-types"
import { useKeyMappings } from "./useKeyMappings";
import { units } from "./Units"
import { useConverter } from "./useConverter"

export default function Unit({ baseUnit, keymap, input, target, children, decimal=true }) {
  const result = useConverter(baseUnit, input, target)

  const onHotkeyPress = (e) => {
    if (e.key === keymap.toClipboard) {
      navigator.clipboard.writeText(result);
    }
  }

  useKeyMappings(
    keymap.leader,
    new Set(keymap.toClipboard),
    onHotkeyPress,
  );

  return (
    <>
      <div className="flex items-center border-b border-green-600">
        <div className="mx-2">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.94971 11.9497H39.9497"
              className="stroke-green-600"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.94971 23.9497H39.9497"
              className="stroke-green-600"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.94971 35.9497H39.9497"
              className="stroke-green-600"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="w-28 bg-green-100 border-l border-r border-green-600 py-2 px-3 font-code font-bold text-sm text-green-500 text-right" id={units.Pixels}>
          {Number.isNaN(parseFloat(result)) ? "N/A" : decimal ? parseFloat(result).toFixed(2) : parseInt(result)}
          <svg className="inline ml-2" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 4.7158V2.40625C5 1.6296 5.6296 1 6.40625 1H18.5938C19.3704 1 20 1.6296 20 2.40625V14.5938C20 15.3704 19.3704 16 18.5938 16H16.2582"
              stroke="#00AE84"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.5938 5H2.40625C1.6296 5 1 5.6296 1 6.40625V18.5938C1 19.3704 1.6296 20 2.40625 20H14.5938C15.3704 20 16 19.3704 16 18.5938V6.40625C16 5.6296 15.3704 5 14.5938 5Z"
              stroke="#00AE84"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="ml-2 mr-auto font-bold text-black">{baseUnit}</div>
        <div className="hidden"><small>space + p</small></div>
        <div className="ml-0 mr-2">
          <svg className="inline" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 7H14" stroke="#156363" strokeWidth="3" />
            <path d="M7 0L7 14" stroke="#156363" strokeWidth="3" />
          </svg>
        </div>
      </div>
      {children ?
        <div className="border-b border-green-600 p-4">
          {children}
        </div>
        : ""
      }
    </>
  )
}

Unit.defaultProps = {
  baseUnit: PropTypes.string,
  input: PropTypes.string,
  target: PropTypes.string,
  keymap: PropTypes.object,
}
