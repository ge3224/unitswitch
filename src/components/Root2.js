import PropTypes from "prop-types"
import "../../public/css/app.css";
import Conversion from "./Conversion";
import { useKeyMappings } from "./useKeyMappings";

const longer = (input) => input * 1.41;
const shorter = (input) => input / 1.41;

export default function Root2({ input, target, keymap }) {
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
    <Conversion
      base="Root 2 (A4)"
      input={input}
      target={target}
      callback={(input, target) => longer(input)} // target not needed but required to match callback signature
    >
      <div className="flex justify-center pt-4">
        <svg width="293"
          height="149"
          viewBox="0 0 293 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M53.5 78.5V1.45311H163.351V78.5H53.5Z"
            fill="#CFF9B9"
            stroke="#156363"
          />
          <path
            d="M53.8046 1.75771L163.231 78.1954"
            stroke="#156363"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M108.518 78.1954V0.953114"
            stroke="#156363"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M108.518 78.1954L164.036 1.75771"
            stroke="#156363"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M234.175 78.5L179.823 78.5L179.823 1.45309L234.175 1.45309L234.175 78.5Z"
            fill="#CFF9B9"
            stroke="#156363"
          />
          <path
            d="M179.506 78.8068L234.676 0.759884"
            stroke="#156363"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M233.953 40.3788L179.5 40.3788"
            stroke="#156363"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M234.841 40.3788L179.323 0.953082"
            stroke="#156363"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M18 31V1"
            stroke="#156363"
          />
          <path
            d="M8 1H27.5"
            stroke="#156363"
          />
          <path
            d="M18 52L18 79"
            stroke="#156363"
          />
          <path
            d="M8 79H27.5"
            stroke="#156363"
          />
          <path
            d="M163 110H53"
            stroke="#4EBD85"
          />
          <path
            d="M53 120.5V101"
            stroke="#4EBD85"
          />
          <path
            d="M163 120.5V101"
            stroke="#4EBD85"
          />
          <path
            d="M234 110H180"
            stroke="#4EBD85"
          />
          <path
            d="M180 120.5V101"
            stroke="#4EBD85"
          />
          <path
            d="M234 120.5V101"
            stroke="#4EBD85"
          />
          <path
            d="M272 10V1"
            stroke="#4EBD85"
          />
          <path
            d="M262 1L281.5 1"
            stroke="#4EBD85"
          />
          <path
            d="M272 32L272 40"
            stroke="#4EBD85"
          />
          <path
            d="M262 40L281.5 40"
            stroke="#4EBD85"
          />
          <text
            className="fill-green-400 text-sm font-bold"
            x="270"
            y="26"
            textAnchor="middle">{shorter(shorter(input)).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="207"
            y="142"
            textAnchor="middle">{shorter(input).toFixed(2)}
          </text>
          <text
            className="fill-green-600 text-sm font-bold"
            x="18"
            y="46"
            textAnchor="middle"
          >
            {input}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="110"
            y="142"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
        </svg>
      </div>
    </Conversion>
  )
}

Root2.defaultProps = {
  input: PropTypes.number,
  target: PropTypes.string,
  keymap: PropTypes.object,
}
