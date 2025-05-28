import React from "react";

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isVertical?: boolean;
  direction?: "left" | "right";
  connectionType?: "bottom-center" | "center-right" | "bidirectional";
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  isVertical = false,
  direction = "right",
  connectionType = "center-right",
}) => {
  const getPath = () => {
    if (!isVertical) {
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }

    // For vertical connections starting from bottom-center
    if (connectionType === "bottom-center") {
      // First go down, then horizontal, then up to the target
      const midY = startY + 40; // Add some vertical space
      return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
    }

    // For vertical connections with horizontal segment (original behavior)
    if (direction === "left") {
      return `M ${startX} ${startY} L ${startX} ${endY} L ${endX} ${endY}`;
    } else {
      return `M ${startX} ${startY} L ${endX} ${startY} L ${endX} ${endY}`;
    }
  };

  // Determine which arrow marker to use based on the connection type
  const getMarkerEnd = () => {
    if (connectionType === "bottom-center") {
      return "url(#arrowhead-vertical)";
    }
    return "url(#arrowhead-horizontal)";
  };

  // Add marker start for bidirectional connections
  const getMarkerStart = () => {
    if (connectionType === "bidirectional") {
      return "url(#arrowhead-horizontal-start)";
    }
    return "";
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
        {/* Horizontal arrow marker for end */}
        <marker
          id="arrowhead-horizontal"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
          markerUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 10 5 L 0 10 L 2 5 Z" fill="#00797A" />
        </marker>
        {/* Horizontal arrow marker for start */}
        <marker
          id="arrowhead-horizontal-start"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto-start-reverse"
          markerUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 10 5 L 0 10 L 2 5 Z" fill="#00797A" />
        </marker>
        {/* Vertical arrow marker */}
        <marker
          id="arrowhead-vertical"
          markerWidth="10"
          markerHeight="10"
          refX="1"
          refY="9"
          orient="0"
          markerUnits="userSpaceOnUse"
        >
          <path d="M 10 0 L 0 5 L 10 10 Z" fill="#00797A" />
        </marker>
      </defs>
      <path
        d={getPath()}
        stroke="#00797A"
        strokeWidth="1"
        strokeDasharray="4 4"
        markerEnd={getMarkerEnd()}
        markerStart={getMarkerStart()}
        fill="none"
      />
    </svg>
  );
};

export default ConnectionLine;
