import PropTypes from "prop-types"

export default function Golden({ value }) {
  const longer = (x) => x * ((1 + Math.sqrt(5)) / 2);
  const shorter = (x) => x / ((1 + Math.sqrt(5)) / 2);
  const left = 1;
  const top = 21;
  const height = 100;
  const width = longer(height);
  const stroke = "rgb(0, 0, 0)";
  const highlight = "rgb(255, 0, 0)";
  const dash = "5,5";

  return (
    <div>
      <p>Golden Ratio:</p>
      <p>
        <svg width="300" height="163" xmlns="<http://www.w3.org/2000/svg>">
          <rect x={left}
            y={top}
            width={width}
            height={height}
            fill="none"
            strokeWidth="1" stroke={stroke}
          />
          <line x1={left}
            y1={top}
            x2={left + width}
            y2={top + height}
            strokeWidth="1"
            stroke={stroke}
            strokeDasharray={dash}
          />
          <line
            x1={left + height}
            y1={top}
            x2={left + height}
            y2={top + height}
            strokeWidth="1"
            stroke={stroke}
          />
          <line
            x1={left + width}
            y1={top}
            x2={left + height}
            y2={top + height}
            strokeWidth="1"
            stroke={stroke}
            strokeDasharray={dash}
          />
          <line
            x1={left}
            y1={top + height}
            x2={left + width}
            y2={top + height}
            strokeWidth="2"
            stroke={highlight}
          />
          <line
            x1={left + height}
            y1={top}
            x2={left + width}
            y2={top}
            strokeWidth="2"
            stroke={highlight}
          />
          <text
            x={left + width + 8}
            y={top + (height / 2) + 6}>
            {value}
          </text>
          <text
            x={(left + height) + ((width - height) / 2)}
            y={top - 8}
            fill={highlight}
            textAnchor="middle"
          >
            {(shorter(value)).toFixed(3)}
          </text>
          <text
            x={left + (width / 2)}
            y={top + height + 21}
            fill={highlight}
            textAnchor="middle">
            {(longer(value)).toFixed(3)}
          </text>
        </svg>
      </p>
    </div>
  )
}

Golden.defaultProps = {
  value: PropTypes.number,
}

