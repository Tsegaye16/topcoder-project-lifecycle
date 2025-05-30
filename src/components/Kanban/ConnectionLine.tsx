import React from "react";

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isVertical?: boolean;
  direction?: "left" | "right";
  connectionType?:
    | "bottom-center"
    | "center-right"
    | "bidirectional"
    | "top-down"
    | "bottom-up"
    | "vertical-bidirectional"
    | "left-to-right"
    | "right-to-left"
    | "horizontal-bidirectional";
  customPath?: string;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  isVertical = false,
  direction = "right",
  connectionType = "center-right",
  customPath,
}) => {
  const getPath = () => {
    if (customPath) {
      return customPath;
    }

    if (!isVertical) {
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    if (connectionType === "bottom-center") {
      const midY = startY + 40;
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    if (direction === "left") {
      return `M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}`;
    } else {
      return `M ${startX} ${startY} L ${endX} ${startY} L ${endX} ${endY}`;
    }
  };

  const getMarkerEnd = () => {
    switch (connectionType) {
      case "top-down":
        return "url(#arrowhead-down)";
      case "bottom-up":
        return "url(#arrowhead-up)";
      case "left-to-right":
        return "url(#arrowhead-right)";
      case "right-to-left":
        return "url(#arrowhead-left)";
      case "vertical-bidirectional":
      case "horizontal-bidirectional":
        return "url(#arrowhead-end)";
      case "bottom-center":
        return "url(#arrowhead-vertical)";
      default:
        return "url(#arrowhead-horizontal)";
    }
  };

  const getMarkerStart = () => {
    switch (connectionType) {
      case "vertical-bidirectional":
      case "horizontal-bidirectional":
        return "url(#arrowhead-start)";
      default:
        return "";
    }
  };

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
        {/* Adjusted markers for thinner line and consistent filled arrowheads */}
        <marker
          id="arrowhead-horizontal"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 0 L 6 3 L 0 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-vertical"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="5"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 0 L 6 0 L 3 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-down"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="5"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 0 L 6 0 L 3 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-up"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="1"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 6 L 6 6 L 3 0 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-right"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 0 L 6 3 L 0 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-left"
          markerWidth="6"
          markerHeight="6"
          refX="1"
          refY="3"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 6 0 L 0 3 L 6 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-start"
          markerWidth="6"
          markerHeight="6"
          refX="1"
          refY="3"
          orient="180"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 6 0 L 0 3 L 6 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
        <marker
          id="arrowhead-end"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path
            d="M 0 0 L 6 3 L 0 6 Z"
            fill="#00797A"
            stroke="#00797A"
            strokeWidth="0.5"
          />
        </marker>
      </defs>
      <path
        d={getPath()}
        stroke="#00797A"
        strokeWidth="0.5" // Thinner line as requested
        strokeDasharray="3 4"
        markerEnd={getMarkerEnd()}
        markerStart={getMarkerStart()}
        fill="none"
      />
    </svg>
  );
};

export default ConnectionLine;
