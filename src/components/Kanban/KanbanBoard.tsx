import React, { useState, useRef, useEffect } from "react";
import {
  ColumnType,
  KanbanColumn as IKanbanColumn,
} from "../../types/KanbanTypes";
import KanbanColumn from "./KanbanColumn";
import ConnectionLine from "./ConnectionLine";
import {
  Connection,
  calculateConnections,
} from "../../connectionUtils/designChallengeConnection";
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

const KanbanBoard: React.FC<KanbanBoardProps> = ({ columns, onReset }) => {
  const [activeColumnId, setActiveColumnId] = useState<ColumnType>("customer");
  const [connections, setConnections] = useState<Connection[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setConnections(calculateConnections(boardRef, activeColumnId));
    const observer = new ResizeObserver(() => {
      setConnections(calculateConnections(boardRef, activeColumnId));
    });
    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setConnections(calculateConnections(boardRef, activeColumnId));
      });
    };

    const columnsElement = columnsRef.current;
    if (columnsElement) {
      columnsElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      observer.disconnect();
      if (columnsElement) {
        columnsElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [columns, activeColumnId]);

  // Reset to initial state when project type changes
  React.useEffect(() => {
    setActiveColumnId("customer");
  }, [columns]);

  return (
    <div className="kanban-board" ref={boardRef}>
      <div className="kanban-board__progress-line">
        <div className="middle-section"></div>
        <span className="phase-label initiate">Initiate</span>
        <span className="phase-label execute">Execute</span>
        <span className="phase-label deliver">Deliver</span>
      </div>
      <div className="kanban-board__columns" ref={columnsRef}>
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
      {connections.map((connection, index) => (
        <ConnectionLine key={index} {...connection} />
      ))}
    </div>
  );
};

export default KanbanBoard;
