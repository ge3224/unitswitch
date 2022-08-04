import PropTypes from "prop-types"

export const sixteenToNineShorter = (x) => (9 * x) / 16;
export const sixteenToNineLonger = (x) => (16 * x) / 9;

export default function Sixteen2NineDetails({ input }) {

  return (
    <div className="flex justify-center pt-4">
      <svg width="263"
        height="149"
        viewBox="0 0 263 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M203 1H59V79H203V1Z"
          fill="#CFF9B9"
          stroke="#156363"
          strokeWidth="1.00157"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M203 37H125V79H203V37Z"
          stroke="#156363"
          strokeWidth="1.00157"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M59 1L203 79"
          stroke="#156363"
          strokeWidth="0.999999"
          strokeDasharray="2 2"
        />
        <path
          d="M203 110L59 110"
          stroke="#4EBD85"
        />
        <path
          d="M59 120.5V101"
          stroke="#4EBD85"
        />
        <path
          d="M203 120.5V101"
          stroke="#4EBD85"
        />
        <path
          d="M18 26V1"
          stroke="#156363"
        />
        <path
          d="M8 1H27.5"
          stroke="#156363"
        />
        <path
          d="M18 50L18 79"
          stroke="#156363"
        />
        <path
          d="M8 79H27.5"
          stroke="#156363"
        />
        <path
          d="M242 47V37"
          stroke="#4EBD85"
        />
        <path
          d="M232 37L251.5 37"
          stroke="#4EBD85"
        />
        <path
          d="M242 70V79"
          stroke="#4EBD85"
        />
        <path
          d="M232 79L251.5 79"
          stroke="#4EBD85"
        />
        <text
          className="fill-green-400 text-sm font-bold"
          x="242"
          y="63"
          textAnchor="middle">{sixteenToNineShorter(input).toFixed(3)}
        </text>
        <text
          className="fill-green-400 text-sm font-bold"
          x="128"
          y="140"
          textAnchor="middle">{sixteenToNineLonger(input).toFixed(3)}
        </text>
        <text
          className="fill-green-600 text-sm font-bold"
          x="162"
          y="27"
          textAnchor="middle">{input}
        </text>
        <text
          className="fill-green-600 text-sm font-bold"
          x="18"
          y="42"
          textAnchor="middle">{input}
        </text>
      </svg>
    </div>
  )
}

Sixteen2NineDetails.defaultProps = {
  value: PropTypes.number,
}
