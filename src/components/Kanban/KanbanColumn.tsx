import React from "react";
import {
  KanbanColumn as IKanbanColumn,
  ColumnType,
  KanbanItem,
} from "../../types/KanbanTypes";
import "./KanbanColumn.scss";

interface KanbanColumnProps {
  column: IKanbanColumn;
  isActive: boolean;
  showItems: boolean;
  onHeaderClick: (columnId: ColumnType) => void;
  columnIndex: number;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  isActive,
  showItems,
  onHeaderClick,
  columnIndex,
}) => {
  const sortedItems = React.useMemo(() => {
    return [...column.items].sort((a, b) => {
      const posA = a.verticalPosition ?? 0;
      const posB = b.verticalPosition ?? 0;
      return posA - posB;
    });
  }, [column.items]);

  const getBackgroundColor = (index: number, isActive: boolean) => {
    if (isActive) {
      return "#00797A";
    }
    return "#E9ECEF";
  };

  const getConnectionClass = (item: KanbanItem) => {
    if (item.position === "start") return "connected-start";
    if (item.position === "end") return "connected-end";
    return "";
  };

  return (
    <div
      className={`kanban-column ${isActive ? "active" : ""}`}
      data-column-id={column.id}
    >
      <div
        className="kanban-column__header"
        onClick={() => onHeaderClick(column.id)}
        style={{
          background: isActive ? "#00797A" : "#e9ecef",
        }}
      >
        <img
          src={column.icon}
          alt={`${column.title} icon`}
          className="kanban-column__header-icon"
        />
        <span className="kanban-column__header-text">{column.title}</span>
      </div>
      <div className="kanban-column__content">
        {showItems &&
          sortedItems.map((item) => (
            <div
              key={item.id}
              className="kanban-column__item"
              data-item-id={item.id}
              title={item.tooltip}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={`${item.title} icon`}
                  className="kanban-column__item-icon"
                />
              )}
              <div className="kanban-column__item-content">
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
