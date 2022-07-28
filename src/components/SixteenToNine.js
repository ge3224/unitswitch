import PropTypes from "prop-types"

export default function SixteenToNine({ value }) {
  const short = (x) => (9 * x) / 16;
  const long = (x) => (16 * x) / 9;
  const left = 1;
  const top = 1;
  const initial = 100;
  const longSide = long(initial);
  const shortSide = short(initial);
  const stroke = "rgb(0, 0, 0)";
  const highlight = "rgb(255, 0, 0)";
  const dash = "5,5";

  return (
    <div>
      <p>16:9 Aspect Ratio</p>
      <p>
        <svg width="300" height="163" xmlns="<http://www.w3.org/2000/svg>">
          <rect
            x={left}
            y={top}
            width={left + longSide}
            height={top + initial}
            fill="none"
            stroke={stroke}
          />
          <rect
            x={left}
            y={top}
            width={left + initial}
            height={top + shortSide}
            fill="none"
            stroke={stroke}
          />
          <line
            x1={left}
            y1={top}
            x2={left + longSide}
            y2={top + initial}
            strokeWidth="1"
            stroke={stroke}
            strokeDasharray={dash}
          />
          <line
            x1={left}
            y1={top + initial}
            x2={left + longSide}
            y2={top + initial}
            strokeWidth="2"
            stroke={highlight}
          />
          <line
            x1={left + initial}
            y1={top}
            x2={left + initial}
            y2={top + shortSide}
            strokeWidth="2"
            stroke={highlight}
          />
          <text
            x={left + initial / 2}
            y={top + shortSide + 21}
            textAnchor="middle"
          >{value}
          </text>
          <text
            x={left + longSide + 10}
            y={top + initial / 2}
          >{value}
          </text>
          <text
            x={left + initial + 10}
            y={top + shortSide / 2}
            fill={highlight}
          >
            {(short(value)).toFixed(3)}
          </text>
          <text
            x={left + longSide/2}
            y={top + initial + 21 }
            fill={highlight}
            textAnchor="middle"
          >
            {(long(value)).toFixed(3)}
          </text>
        </svg>
      </p>
    </div>
  )
}

SixteenToNine.defaultProps = {
  value: PropTypes.number,
}
