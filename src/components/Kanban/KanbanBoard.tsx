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
  isVertical?: boolean;
  direction?: "left" | "right";
  connectionType?:
    | "bottom-center"
    | "center-right"
    | "bidirectional"
    | "top-down"
    | "right-to-left";
}

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

  const updateConnections = () => {
    if (!boardRef.current) return;

    const newConnections: Connection[] = [];

    // Horizontal connection from Start Engagement to Team Allocation
    const startItem = boardRef.current.querySelector('[data-item-id="dc1"]');
    const endItem = boardRef.current.querySelector('[data-item-id="do1"]');
    const requirementItem = boardRef.current.querySelector(
      '[data-item-id="dd1"]'
    );

    // New connection between Collaborates on Requirements items
    const collaborateCustomer = boardRef.current.querySelector(
      '[data-item-id="dc2"]'
    );
    const collaborateDelivery = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );

    if (startItem && endItem) {
      const startRect = startItem.getBoundingClientRect();
      const endRect = endItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const startColumn = startItem.closest(".kanban-column");
      const endColumn = endItem.closest(".kanban-column");

      if (
        startColumn?.classList.contains("active") &&
        endColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: startRect.right - boardRect.left,
          startY: startRect.top - boardRect.top + startRect.height / 2,
          endX: endRect.left - boardRect.left,
          endY: endRect.top - boardRect.top + endRect.height / 2,
          connectionType: "center-right",
        });
      }
    }

    // Add connection for Collaborates on Requirements items
    if (collaborateCustomer && collaborateDelivery) {
      const startRect = collaborateCustomer.getBoundingClientRect();
      const endRect = collaborateDelivery.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const startColumn = collaborateCustomer.closest(".kanban-column");
      const endColumn = collaborateDelivery.closest(".kanban-column");

      if (
        startColumn?.classList.contains("active") &&
        endColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: startRect.right - boardRect.left,
          startY: startRect.top - boardRect.top + startRect.height / 2,
          endX: endRect.left - boardRect.left,
          endY: endRect.top - boardRect.top + endRect.height / 2,
          connectionType: "bidirectional",
        });
      }
    }

    // Add vertical connection between Requirement Study and Collaborates on Requirements
    const reqStudyItem = boardRef.current.querySelector('[data-item-id="dd1"]');
    const collabReqItem = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );

    if (reqStudyItem && collabReqItem) {
      const reqRect = reqStudyItem.getBoundingClientRect();
      const collabRect = collabReqItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const reqColumn = reqStudyItem.closest(".kanban-column");

      if (reqColumn?.classList.contains("active")) {
        const startX = reqRect.left - boardRect.left + reqRect.width * 0.5;
        const startY = reqRect.bottom - boardRect.top;
        const endY = collabRect.top - boardRect.top - 3;

        newConnections.push({
          startX,
          startY,
          endX: startX,
          endY,
          isVertical: true,
          connectionType: "top-down",
        });
      }
    }

    // Add connection from Write Specification to Collaborates on Requirements
    const writeSpecItem = boardRef.current.querySelector(
      '[data-item-id="do2"]'
    );
    const collabReqItem2 = boardRef.current.querySelector(
      '[data-item-id="dd2"]'
    );

    if (writeSpecItem && collabReqItem2) {
      const writeSpecRect = writeSpecItem.getBoundingClientRect();
      const collabRect = collabReqItem2.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const writeSpecColumn = writeSpecItem.closest(".kanban-column");
      const collabColumn = collabReqItem2.closest(".kanban-column");

      if (
        writeSpecColumn?.classList.contains("active") &&
        collabColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: writeSpecRect.left - boardRect.left - 2,
          startY: writeSpecRect.top - boardRect.top + writeSpecRect.height / 2,
          endX: collabRect.right - boardRect.left + 2,
          endY: collabRect.top - boardRect.top + collabRect.height / 2,
          isVertical: false,
          connectionType: "right-to-left",
        });
      }
    }

    // Vertical connection from Team Allocation to Requirement Study
    if (endItem && requirementItem) {
      const endRect = endItem.getBoundingClientRect();
      const reqRect = requirementItem.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();

      const endColumn = endItem.closest(".kanban-column");
      const reqColumn = requirementItem.closest(".kanban-column");

      if (
        endColumn?.classList.contains("active") &&
        reqColumn?.classList.contains("active")
      ) {
        newConnections.push({
          startX: endRect.left - boardRect.left + endRect.width / 2,
          startY: endRect.bottom - boardRect.top,
          endX: reqRect.right - boardRect.left,
          endY: reqRect.top - boardRect.top + reqRect.height / 2,
          isVertical: true,
          direction: "left",
          connectionType: "bottom-center",
        });
      }
    }

    setConnections(newConnections);
  };

  useEffect(() => {
    updateConnections();
    const observer = new ResizeObserver(updateConnections);
    if (boardRef.current) {
      observer.observe(boardRef.current);
    }

    // Add scroll event listener
    const handleScroll = () => {
      requestAnimationFrame(updateConnections);
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
