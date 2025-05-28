import React, { useState, useRef, useEffect } from "react";
import {
  ColumnType,
  KanbanColumn as IKanbanColumn,
  KanbanItem,
} from "../../types/KanbanTypes";
import KanbanColumn from "./KanbanColumn";
import ConnectionLine from "./ConnectionLine";
import "./KanbanBoard.scss";

interface KanbanBoardProps {
  columns: IKanbanColumn[];
  onReset?: () => void;
}

const COLUMN_ORDER: ColumnType[] = [
  "customer",
  "delivery",
  "operation",
  "community",
  "review",
];

interface Connection {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onReset }) => {
  const [activeColumnId, setActiveColumnId] = useState<ColumnType>("customer");
  const [connection, setConnection] = useState<Connection | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleColumnClick = (columnId: ColumnType) => {
    setActiveColumnId(columnId);
  };

  const isColumnActive = (column: IKanbanColumn) => {
    const clickedColumnIndex = COLUMN_ORDER.indexOf(activeColumnId);
    const currentColumnIndex = COLUMN_ORDER.indexOf(column.id);
    return currentColumnIndex <= clickedColumnIndex;
  };

  const shouldShowItems = (column: IKanbanColumn) => {
    const clickedColumnIndex = COLUMN_ORDER.indexOf(activeColumnId);
    const currentColumnIndex = COLUMN_ORDER.indexOf(column.id);
    return currentColumnIndex <= clickedColumnIndex;
  };

  const updateConnection = () => {
    if (!boardRef.current) return;

    const startItem = boardRef.current.querySelector('[data-item-id="dc1"]');
    const endItem = boardRef.current.querySelector('[data-item-id="do1"]');

    if (startItem && endItem) {
      const startRect = startItem.getBoundingClientRect();
      const endRect = endItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      // Only show connection if both items are visible (columns are active)
      const startColumn = startItem.closest(".kanban-column");
      const endColumn = endItem.closest(".kanban-column");

      if (
        startColumn?.classList.contains("active") &&
        endColumn?.classList.contains("active")
      ) {
        setConnection({
          startX: startRect.right - boardRect.left,
          startY: startRect.top - boardRect.top + startRect.height / 2,
          endX: endRect.left - boardRect.left,
          endY: endRect.top - boardRect.top + endRect.height / 2,
        });
      } else {
        setConnection(null);
      }
    } else {
      setConnection(null);
    }
  };

  useEffect(() => {
    updateConnection();
    const observer = new ResizeObserver(updateConnection);
    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [columns, activeColumnId]);

  // Reset to initial state when project type changes
  React.useEffect(() => {
    setActiveColumnId("customer");
  }, [columns]);

  return (
    <div className="kanban-board" ref={boardRef}>
      <div className="kanban-board__columns">
        {columns.map((column, index) => (
          <KanbanColumn
            key={column.id}
            column={column}
            isActive={isColumnActive(column)}
            showItems={shouldShowItems(column)}
            onHeaderClick={handleColumnClick}
            columnIndex={index}
          />
        ))}
      </div>
      {connection && <ConnectionLine {...connection} />}
    </div>
  );
};

export default KanbanBoard;
