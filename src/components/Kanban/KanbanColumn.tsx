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
    <div className={`kanban-column ${isActive ? "active" : ""}`}>
      <div
        className="kanban-column__header"
        onClick={() => onHeaderClick(column.id)}
        style={{ backgroundColor: getBackgroundColor(columnIndex, isActive) }}
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
          column.items.map((item) => (
            <div
              key={item.id}
              data-item-id={item.id}
              className={`kanban-column__item ${getConnectionClass(item)}`}
              title={item.tooltip}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt=""
                  className="kanban-column__item-icon"
                />
              )}
              <div className="kanban-column__item-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
