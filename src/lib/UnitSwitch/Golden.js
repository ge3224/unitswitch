import "../../../public/css/app.css";
import Unit from "./Unit";
import PropTypes from "prop-types"
import { useKeyMappings } from "./useKeyMappings";

const longer = (input) => input * 1.61803;
const shorter = (input) => input / 1.61803;

export default function Golden({ input, target, keymap }) {
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
    <Unit
      base="Golden Ratio"
      input={input}
      target={target}
      callback={(input, target) => longer(input)} // target not needed but required to match callback signature
    >
      <div className="flex justify-center pt-4">
        <svg
          width="327"
          height="149"
          viewBox="0 0 327 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="51.6254"
            y="2.29352"
            width="141.613"
            height="85.9871"
            className="fill-green-300 stroke-green-600"
          />
          <path
            d="M52.0223 2.69029L192.841 88.7806"
            className="stroke-green-600"
            strokeDasharray="2 2"
          />
          <path
            d="M134.092 88.7806V1.79352"
            className="stroke-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M134.092 88.7806L193.113 1.79352"
            className="stroke-green-600"
            strokeDasharray="2 2"
          />
          <rect
            x="213.074"
            y="88.2806"
            width="85.9871"
            height="51.9192"
            transform="rotate(-90 213.074 88.2806)"
            className="fill-green-300 stroke-green-600"
          />
          <path
            d="M212.574 88.7806L265.317 1.79349"
            className="stroke-green-600"
            strokeDasharray="2 2"
          />
          <path
            d="M264.596 37.6645L213.471 37.6645"
            className="stroke-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M265.317 37.6645L212.574 1.61973"
            className="stroke-green-600"
            strokeDasharray="2 2"
          />

          <path
            className="stroke-green-400"
            d="M292 0.89679V37.6645"
          />
          <path
            className="stroke-green-400"
            d="M284 0.89679L300 0.89679"
          />
          <path
            className="stroke-green-400"
            d="M284 37.6645L300 37.6645"
          />

          <path
            className="stroke-green-400"
            d="M264.596 114.787L212.574 114.787"
          />
          <path
            className="stroke-green-400"
            d="M212.574 124.203V106.716"
          />
          <path
            className="stroke-green-400"
            d="M264.596 124.203V106.716"
          />
          <path
            className="stroke-green-600"
            d="M19.17548 2.69031H36.6657"
          />
          <path
            className="stroke-green-600"
            d="M27.6448 87.8839V2.69031"
          />
          <path
            className="stroke-green-600"
            d="M19.17548 87.8839H36.6657"
          />
          <path
            className="stroke-green-400"
            d="M192.841 114.787L51.1254 114.787"
          />
          <path
            className="stroke-green-400"
            d="M51.1254 124.203V106.716"
          />
          <path
            className="stroke-green-400"
            d="M192.841 124.203V106.716"
          />
          <text
            className="fill-green-600 text-sm font-bold"
            x="16"
            y="44"
            transform="rotate(-90,16,44)"
            textAnchor="middle">{parseFloat(input).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="125"
            y="140"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="297"
            y="94"
            transform="rotate(-90,297,94)"
            textAnchor="right">{shorter(shorter(input)).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="239"
            y="140"
            textAnchor="middle">{shorter(input).toFixed(2)}
          </text>
        </svg>
      </div>
    </Unit>
  )
}

Golden.defaultProps = {
  input: PropTypes.number,
  target: PropTypes.string,
  keymap: PropTypes.object,
}
