import PropTypes from "prop-types"
import { useEffect } from "react";
import "../../../public/css/app.css";
import Unit from "./Unit";
import { useKeyMappings } from "./useKeyMappings";

const longer = (input) => input * 1.41;
const shorter = (input) => input / 1.41;

export default function Root2({ input, target, hotkey }) {
  const root2HotkeyHandler = (e) => {
    if (e.key === hotkey && e.ctrlKey === true) {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(longer(input));
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', root2HotkeyHandler);

    return () => {
      document.removeEventListener("keydown", root2HotkeyHandler);
    }
  })

  return (
    <Unit
      base="Root 2 (A4)"
      input={input}
      target={target}
      hotkey={"ctrl+" + hotkey}
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
            className="fill-green-300 stroke-green-600"
          />
          <path
            d="M53.8046 1.75771L163.231 78.1954"
            className="stroke-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M108.518 78.1954V0.953114"
            className="stroke-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M108.518 78.1954L164.036 1.75771"
            className="stroke-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M234.175 78.5L179.823 78.5L179.823 1.45309L234.175 1.45309L234.175 78.5Z"
            className="fill-green-300 stroke-green-600"
          />
          <path
            d="M179.506 78.8068L234.676 0.759884"
            className="stroke-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M233.953 40.3788L179.5 40.3788"
            className="stroke-green-600"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M234.841 40.3788L179.323 0.953082"
            className="stroke-green-600"
            strokeWidth="0.999999"
            strokeDasharray="2 2"
          />
          <path
            d="M32 0V80"
            className="stroke-green-600"
          />
          <path
            d="M22 1H41.5"
            className="stroke-green-600"
          />
          <path
            d="M22 79H41.5"
            className="stroke-green-600"
          />
          <path
            d="M163 110H53"
            className="stroke-green-400"
          />
          <path
            d="M53 120.5V101"
            className="stroke-green-400"
          />
          <path
            d="M163 120.5V101"
            className="stroke-green-400"
          />
          <path
            d="M234 110H180"
            className="stroke-green-400"
          />
          <path
            d="M180 120.5V101"
            className="stroke-green-400"
          />
          <path
            d="M234 120.5V101"
            className="stroke-green-400"
          />
          <path
            d="M263 1V40"
            className="stroke-green-400"
          />
          <path
            d="M252.5 1L273 1"
            className="stroke-green-400"
          />
          <path
            d="M252.5 40L273 40"
            className="stroke-green-400"
          />
          <text
            className="fill-green-400 text-sm font-bold"
            x="268"
            y="74"
            transform="rotate(-90,268,74)"
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
            y="40"
            transform="rotate(-90,18,40)"
            textAnchor="middle">{parseFloat(input).toFixed(2)}
          </text>
          <text
            className="fill-green-400 text-sm font-bold"
            x="110"
            y="142"
            textAnchor="middle">{longer(input).toFixed(2)}
          </text>
        </svg>
      </div>
    </Unit>
  )
}

Root2.defaultProps = {
  input: PropTypes.number,
  target: PropTypes.string,
  hotkey: PropTypes.string,
}
