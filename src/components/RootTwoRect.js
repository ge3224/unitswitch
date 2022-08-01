import PropTypes from "prop-types"
import "../../public/css/app.css";

export default function RootTwoRect({ value }) {
  const longer = (x) => x * 1.41;
  // const longer = (x) => x * (1/2 + Math.sqrt(5)/2);
  const shorter = (x) => x / 1.41;
  // const shorter = (x) => x / (1/2 + Math.sqrt(5)/2);
  const left = 1;
  const top = 21;
  const height = 100;
  const width = longer(height);
  const dash = "5,5";

  return (
    <div>
      <p>Root 2 Rectangle (A4)</p>
      <svg width="300" height="163" xmlns="<http://www.w3.org/2000/svg>">
        <rect
          className="cunit__gfx_stroke"
          x={left}
          y={top}
          width={width}
          height={height}
        />
        <line
          className="cunit__gfx_stroke--dashed"
          strokeDasharray={dash}
          x1={left}
          y1={top}
          x2={left + width}
          y2={top + height}
        />
        <line
          className="cunit__gfx_stroke"
          x1={left + height}
          y1={top}
          x2={left + height}
          y2={top + height}
        />
        <line
          className="cunit__gfx_stroke--dashed"
          x1={left + width}
          y1={top}
          x2={left + height}
          y2={top + height}
          strokeDasharray={dash}
        />
        <line
          className="cunit__gfx_stroke--highlight"
          x1={left}
          y1={top + height}
          x2={left + width}
          y2={top + height}
        />
        <line
          className="cunit__gfx_stroke--highlight"
          x1={left + height}
          y1={top}
          x2={left + width}
          y2={top}
        />
        <text
          className="cunit__gfx_fill"
          x={left + width + 8}
          y={top + (height / 2) + 6}>
          {value}
        </text>
        <text
          className="cunit__gfx_fill--highlight"
          x={(left + height) + ((width - height) / 2)}
          y={top - 8}
          textAnchor="middle">
          {(shorter(value)).toFixed(3)}
        </text>
        <text
          className="cunit__gfx_fill--highlight"
          x={left + (width / 2)}
          y={top + height + 21}
          textAnchor="middle"
        >
          {(longer(value)).toFixed(3)}
        </text>
      </svg>
    </div>
  )
}

RootTwoRect.defaultProps = {
  value: PropTypes.number,
}
