import React from "react";

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  startX,
  startY,
  endX,
  endY,
}) => {
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 7 3.5, 0 7" fill="#00797A" />
        </marker>
      </defs>
      <path
        d={`M ${startX} ${startY} L ${endX} ${endY}`}
        stroke="#00797A"
        strokeWidth="1"
        strokeDasharray="4 4"
        markerEnd="url(#arrowhead)"
        fill="none"
      />
    </svg>
  );
};

export default ConnectionLine;
