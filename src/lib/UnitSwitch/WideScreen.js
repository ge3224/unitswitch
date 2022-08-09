import PropTypes from "prop-types"
import { useEffect } from "react";
import Unit from "./Unit";
import { useKeyMappings } from "./useKeyMappings";

const shorter = (x) => (9 * x) / 16;
const longer = (x) => (16 * x) / 9;

export default function WideScreen({ input, target, hotkey }) {
  const wideScreenHotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText((longer(input)).toFixed(3));
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', wideScreenHotkeyHandler);

    return () => {
      document.removeEventListener("keydown", wideScreenHotkeyHandler);
    }
  })

  return (
    <Unit
      base="16:9 Aspect Ratio"
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
      callback={(input, target) => longer(input)} // target not needed but required in callback signature
    >
      <div className="flex justify-center pt-4">
        <svg
          width="263"
          height="149"
          viewBox="0 0 263 149"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M203 1H59V79H203V1Z"
            className="fill-green-300 stroke-green-600"
            strokeWidth="1.00157"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M203 37H125V79"
            className="stroke-green-600"
            strokeWidth="1.00157"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M59 1L203 79"
            className="stroke-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M203 110L59 110"
            className="stroke-green-400"
          />
          <path
            d="M59 120.5V101"
            className="stroke-green-400"
          />
          <path
            d="M203 120.5V101"
            className="stroke-green-400"
          />
          <path
            d="M34 0V80"
            className="stroke-green-600"
          />
          <path
            d="M24 1H43.5"
            className="stroke-green-600"
          />
          <path
            d="M24 79H43.5"
            className="stroke-green-600"
          />
          <path
            d="M229 38V80"
            className="stroke-green-400"
          />
          <path
            d="M219 37L238.5 37"
            className="stroke-green-400"
          />
          <path
            d="M219 79L238.5 79"
            className="stroke-green-400"
          />
          <text
            className="fill-green-400 text-sm font-bold"
            x="256"
            y="58"
            transform="rotate(-90,256,58)"
            textAnchor="middle">{shorter(input).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="128"
            y="140"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
          <text
            className="fill-green-600 text-sm font-bold"
            x="162"
            y="27"
            textAnchor="middle">{parseFloat(input).toFixed(2)}
          </text>
          <text
            className="fill-green-600 text-sm font-bold"
            x="18"
            y="42"
            transform="rotate(-90,18,42)"
            textAnchor="middle">{parseFloat(input).toFixed(2)}
          </text>
        </svg>
      </div>
    </Unit>
  )
}

WideScreen.defaultProps = {
  input: PropTypes.number,
  target: PropTypes.string,
  keymap: PropTypes.object,
}
