import "../../public/css/app.css";
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
      <div className="flex justify-center pt-3">
        <svg width="327" height="142" viewBox="0 0 327 142" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="51.6254"
            y="2.29352"
            width="141.613"
            height="85.9871"
            fill="#CFF9B9"
            stroke="#156363"
          />
          <path
            d="M52.0223 2.69029L192.841 88.7806"
            stroke="#156363"
            strokeDasharray="2 2"
          />
          <path
            d="M134.092 88.7806V1.79352"
            stroke="#156363"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M134.092 88.7806L193.113 1.79352"
            stroke="#156363"
            strokeDasharray="2 2"
          />
          <rect
            x="213.074"
            y="88.2806"
            width="85.9871"
            height="51.9192"
            transform="rotate(-90 213.074 88.2806)"
            fill="#CFF9B9"
            stroke="#156363"
          />
          <path
            d="M212.574 88.7806L265.317 1.79349"
            stroke="#156363"
            strokeDasharray="2 2"
          />
          <path
            d="M264.596 37.6645L213.471 37.6645"
            stroke="#156363"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M265.317 37.6645L212.574 1.61973"
            stroke="#156363"
            strokeDasharray="2 2"
          />
          <path
            className="stroke-green-400"
            d="M303.164 9.86453V1.79356"
          />
          <path
            className="stroke-green-400"
            d="M294.195 0.89679L311.685 0.89679"
          />
          <path
            className="stroke-green-400"
            d="M303.164 29.5936L303.164 37.6645"
          />
          <path
            className="stroke-green-400"
            d="M294.195 37.6645L311.685 37.6645"
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
            d="M16.1448 34.9742V2.69031"
            stroke="#156363"
          />
          <path
            d="M7.17548 2.69031H24.6657"
            stroke="#156363"
          />
          <path
            d="M16.1448 57.3935L16.1448 87.8839"
            stroke="#156363"
          />
          <path
            d="M7.17548 87.8839H24.6657"
            stroke="#156363"
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
            x="15.5"
            y="51"
            textAnchor="middle">{input}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="125"
            y="137"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="302"
            y="25"
            textAnchor="middle">{shorter(shorter(input)).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="239"
            y="137"
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
