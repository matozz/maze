import React from "react";
import "./Progress.scss";

export interface ProgressProps {
  percentage?: number;
  /**
   * the type of progress bar
   */
  type?: "line" | "circle";
  /**
   * the width of progress bar
   */
  strokeWidth?: number;
  /**
   * the canvas width of circle progress bar
   */
  width?: number;
  /**
   * whether to show percentage
   */
  showPercentage?: boolean;
  /**
   * background color of progress bar. Overrides `status` prop
   */
  strokeColor?: React.CSSProperties["color"];
  /**
   * Overrides default percentage label
   */
  label?: React.ReactNode;
  /**
   * text color of text.
   */
  textColor?: React.CSSProperties["color"];
  /**
   * the current status of progress bar
   */
  status?: "success" | "error" | "warning";
  strokeLinecap?: React.CSSProperties["strokeLinecap"];
  showBackground?: boolean;
  backgroundColor?: React.CSSProperties["backgroundColor"];
}

export const Progress: React.FunctionComponent<ProgressProps> = ({
  type,
  percentage,
  strokeWidth,
  strokeLinecap,
  strokeColor,
  textColor,
  width,
  showBackground,
  backgroundColor,
  status,
  label,
}: ProgressProps) => {
  const radius = width / 2;
  const circleLength = 2 * (radius - strokeWidth / 2) * 3.14;
  const color =
    status === "success"
      ? "#2e7d32"
      : status === "error"
      ? "#d32f2f"
      : "#ed6c02";

  return (
    <div
      className="maze-progress"
      style={{
        width: width,
        height: type === "circle" ? width : "auto",
      }}
    >
      {type === "circle" && (
        <>
          {!React.isValidElement(label) ? (
            <div className="maze-progress--text">{percentage}%</div>
          ) : (
            <div className="maze-progress--text">{label}</div>
          )}
          <svg width="100%" height="100%">
            {showBackground && (
              <circle
                className="maze-progress--circle"
                cx={radius}
                cy={radius}
                r={radius - strokeWidth / 2}
                fill="none"
                style={{
                  strokeWidth: strokeWidth,
                  stroke: backgroundColor ? backgroundColor : "#cfcfcf3b",
                  strokeDasharray: circleLength,
                  strokeDashoffset: 0,
                }}
              ></circle>
            )}
            <circle
              className="maze-progress--circle"
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              fill="none"
              style={{
                strokeWidth: strokeWidth,
                stroke: status ? color : strokeColor,
                strokeLinecap: strokeLinecap,
                strokeDasharray: circleLength,
                strokeDashoffset:
                  circleLength - (circleLength / 100) * percentage,
              }}
            ></circle>
            <text
              x={radius}
              y={radius}
              fill={textColor}
              textAnchor="middle"
              alignmentBaseline="baseline"
              dy=".3em"
            ></text>
          </svg>
        </>
      )}
      {type === "line" && (
        <>
          {!React.isValidElement(label) ? (
            <div className="maze-progress--label" style={{ color: textColor }}>
              {percentage}%
            </div>
          ) : (
            <div className="maze-progress--label" style={{ color: textColor }}>
              {label}
            </div>
          )}
          <div
            className="maze-progress--line"
            style={{
              backgroundColor: backgroundColor ? backgroundColor : "#cfcfcf3b",
              height: strokeWidth,
              width: width,
              borderRadius: strokeLinecap === "round" ? 4 : 0,
            }}
          >
            <div
              className="maze-progress--track"
              style={{
                width: (width / 100) * percentage,
                height: strokeWidth,
                borderRadius: strokeLinecap === "round" ? 4 : 0,
                backgroundColor: status ? color : strokeColor,
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

Progress.defaultProps = {
  width: 120,
  strokeWidth: 8,
  strokeColor: "#1976d2",
  showBackground: true,
  backgroundColor: "#cfcfcf3b",
  textColor: "#47484b",
  strokeLinecap: "round",
  showPercentage: true,
  type: "circle",
  percentage: 0,
};
