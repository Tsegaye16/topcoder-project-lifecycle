import React, { useState, useRef, useEffect } from "react";
import { ColumnType, KanbanColumnType } from "../../types/KanbanTypes";
import KanbanColumn from "./KanbanColumn";
import ConnectionLine from "./ConnectionLine";
import {
  Connection,
  calculateConnections,
} from "../../connectionUtils/designChallengeConnection";
import "./KanbanBoard.scss";
import "../ProjectLifecycle/ProjectLifecycle.scss";

interface KanbanBoardProps {
  columns: KanbanColumnType[];
  onReset?: () => void;
}

const COLUMN_ORDER: ColumnType[] = [
  "customer",
  "delivery",
  "operation",
  "community",
  "review",
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onReset }) => {
  const [activeColumnId, setActiveColumnId] = useState<ColumnType | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const boardRef = useRef<any>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  const handleColumnClick = (columnId: ColumnType) => {
    // Toggle: if clicked column is active, deactivate; otherwise, activate it
    setActiveColumnId(activeColumnId === columnId ? null : columnId);
  };

  const isColumnActive = (column: KanbanColumnType) => {
    // Only the clicked column gets the active class for header styling
    return column.id === activeColumnId;
  };

  const shouldShowItems = (column: KanbanColumnType) => {
    if (!activeColumnId) {
      // Only "customer" shows items when no column is active
      return column.id === "customer";
    }
    // Show items for the active column and all columns to its left
    const activeIndex = COLUMN_ORDER.indexOf(activeColumnId);
    const columnIndex = COLUMN_ORDER.indexOf(column.id);
    return columnIndex <= activeIndex;
  };

  useEffect(() => {
    const updateConnections = () => {
      // Use activeColumnId or "customer" as fallback
      const targetColumnId = activeColumnId || "customer";
      const newConnections = calculateConnections(boardRef, targetColumnId);
      setConnections(newConnections);
      console.log(
        "Connections:",
        newConnections,
        "Target Column:",
        targetColumnId
      );
    };

    // Run after DOM is ready
    const timeoutId = setTimeout(updateConnections, 0);

    const observer = new ResizeObserver(updateConnections);
    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    const handleScroll = () => {
      requestAnimationFrame(updateConnections);
    };

    const columnsElement = columnsRef.current;
    if (columnsElement) {
      columnsElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (columnsElement) {
        columnsElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [columns, activeColumnId]);

  useEffect(() => {
    setActiveColumnId(null);
    if (onReset) {
      onReset();
    }
  }, [columns, onReset]);

  return (
    <div className="kanban-board" ref={boardRef}>
      <div className="kanban-board__columns" ref={columnsRef}>
        <div className="kanban-board__progress-line">
          <div className="middle-section"></div>
          <span className="phase-label initiate">Initiate</span>
          <span className="phase-label execute">Execute</span>
          <span className="phase-label deliver">Deliver</span>
        </div>

        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            isActive={isColumnActive(column)}
            showItems={shouldShowItems(column)}
            onHeaderClick={handleColumnClick}
            columnIndex={index}
            data-column-id={column.id} // Add for calculateConnections
          />
        ))}
      </div>
      {connections.map((connection, index) => (
        <ConnectionLine key={index} {...connection} />
      ))}
    </div>
  );
};

export default KanbanBoard;
