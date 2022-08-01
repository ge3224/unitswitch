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
            className="cunit__gfx_stroke"
            x={left}
            y={top}
            width={left + longSide}
            height={top + initial}
          />
          <rect
            className="cunit__gfx_stroke"
            x={left}
            y={top}
            width={left + initial}
            height={top + shortSide}
          />
          <line
            className="cunit__gfx_stroke--dashed"
            x1={left}
            y1={top}
            x2={left + longSide}
            y2={top + initial}
            strokeDasharray={dash}
          />
          <line
            className="cunit__gfx_stroke--highlight"
            x1={left}
            y1={top + 1 + initial}
            x2={left + longSide}
            y2={top + 1 + initial}
          />
          <line
            className="cunit__gfx_stroke--highlight"
            x1={left + 1 + initial}
            y1={top}
            x2={left + 1 + initial}
            y2={top + shortSide}
          />
          <text
            className="cunit__gfx_fill"
            x={left + initial / 2}
            y={top + shortSide + 21}
            textAnchor="middle"
          >{value}
          </text>
          <text
            className="cunit__gfx_fill"
            x={left + longSide + 10}
            y={top + initial / 2}
          >{value}
          </text>
          <text
            className="cunit__gfx_fill--highlight"
            x={left + initial + 10}
            y={top + shortSide / 2}
          >
            {(short(value)).toFixed(3)}
          </text>
          <text
            className="cunit__gfx_fill--highlight"
            x={left + longSide / 2}
            y={top + initial + 21}
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
